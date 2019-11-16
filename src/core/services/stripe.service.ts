import stripeModule, { products, skus, charges, cards, orders, tokens, ICard } from 'stripe';
import { config } from '../../../config';
import {
    createStripeSkuService,
    findStripeSkuByProductIdService,
    deleteStripeSkuBySkuIdService,
} from '../../db/services/stripe-skus.service';
import { StripeChargeStatus } from '../models/enums/stripe';
import { IAddCardResult } from '../models/interfaces/stripe';

export const stripe = new stripeModule(config.get('stripeSecret'));
let verifyCardProduct: products.IProduct;
let verifyCardSku: skus.ISku;

export const addCard =
    async (email: string, fullToken: tokens.IToken, customerId: string): Promise<IAddCardResult> => {

        const tokenId = fullToken.id;

        if (!verifyCardProduct) {
            await createVerifyProduct();
        }

        if (!verifyCardSku) {
            await createVerifySKU();
        }

        let customer = await stripe.customers.retrieve(customerId);

        try {
            const { fingerprint } = fullToken.card;
            const equalCards = customer.sources.data.filter((card: ICard) => card.fingerprint === fingerprint);
            if (equalCards.length) {
                return {error: 'Card already exists'};
            }

            await stripe.customers.createSource(customerId, {
                source: tokenId,
            });
        } catch (error) {
            return { error: error.message };
        }

        let verifyOrder: orders.IOrder;

        try {
            verifyOrder = await stripe.orders.create({
                currency: 'usd',
                customer: customerId,
                items: [
                    {
                    type: 'sku',
                    parent: verifyCardSku.id,
                    },
                ],
                email,
            });
        } catch (error) {
            return { error: error.message };
        }

        let payOrder: orders.IOrder;

        try {
            payOrder = await stripe.orders.pay(
                verifyOrder.id,
                {
                    customer: customerId,
                    email,
                },
            );
        } catch (error) {
            return { error: error.message };
        }

        let verifyCardCharge: charges.ICharge;

        try {
            verifyCardCharge = await stripe.charges.retrieve(payOrder.charge as string);
        } catch (error) {
            return { error: error.message };
        }

        if (verifyCardCharge.status === StripeChargeStatus.SUCCESS) {
            await stripe.refunds.create({charge: verifyCardCharge.id});
            customer = await stripe.customers.retrieve(customerId);
            const source = customer.sources.data.filter((card: ICard) => card.id === fullToken.card.id)[0] as ICard;
            const isDefault = customer.sources.data.length === 1;
            return {
                source: {
                    id: source.id,
                    brand: (source).brand,
                    last4: (source).last4,
                    exp_month: (source).exp_month,
                    exp_year: (source).exp_year,
                    default: isDefault,
                },
            };
        } else {
            await stripe.customers.deleteSource(customer.id, customer.sources.data[0].id);
            return { error: 'Not valid card' };
        }
    };

const createVerifyProduct = async (): Promise<void> => {
    const allProducts = await stripe.products.list();
    const testProducts = allProducts.data.filter(el => el.name === 'VerifyCard');

    if (!testProducts.length) {
        verifyCardProduct = await stripe.products.create({
            name: 'VerifyCard',
            type: 'good',
            shippable: false,
        });
    } else {
        verifyCardProduct = testProducts[0];
    }
};

const createVerifySKU = async (): Promise<void> => {

    if (!verifyCardProduct) {
        await createVerifyProduct();
    }

    const allSkus = await stripe.skus.list();
    if (allSkus.data.length) {
        const verifySkus = allSkus.data.filter(el => el.product === verifyCardProduct.id);
        if (verifySkus.length) {
            verifyCardSku = verifySkus[0];
            await createStripeSkuService({sku_id: verifyCardSku.id, product_id: verifyCardProduct.id});
            return;
        }
    }

    const dbSku = await findStripeSkuByProductIdService(verifyCardProduct.id);

    if (!dbSku.length) {
        verifyCardSku = await stripe.skus.create({
            product: verifyCardProduct.id,
            price: 100,
            currency: 'usd',
            inventory: {type: 'infinite'},
            active: true,
        });

        await createStripeSkuService({sku_id: verifyCardSku.id, product_id: verifyCardProduct.id});
    } else {
        verifyCardSku = await stripe.skus.retrieve(dbSku[0].sku_id);
        if (!verifyCardSku) {
            await deleteStripeSkuBySkuIdService(dbSku[0].sku_id);
            await createVerifySKU();
        }
    }
};