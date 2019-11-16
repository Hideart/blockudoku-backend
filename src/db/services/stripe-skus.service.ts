import { IStripeSkuCustom, IStripeSkuModel } from 'src/core/models/interfaces/stripe-sku';
import { StripeSkuModel } from '../models/StripeSku';

export async function createStripeSkuService(sku: IStripeSkuCustom):
  Promise<IStripeSkuModel | null> {
    return await StripeSkuModel.create(sku);
}

export async function findStripeSkuByIdService(id: string):
  Promise<IStripeSkuModel | null> {
    return await StripeSkuModel.findOne({where: {id}});
}

export async function findStripeSkuBySkuIdService(skuId: string):
  Promise<IStripeSkuModel[] | null> {
    return await StripeSkuModel.findAll({where: {sku_id: skuId}});
}

export async function findStripeSkuByProductIdService(productId: string):
  Promise<IStripeSkuModel[] | null> {
    return await StripeSkuModel.findAll({where: {product_id: productId}});
}

export async function deleteStripeSkuBySkuIdService(skuId: string):
  Promise<void> {
    await StripeSkuModel.destroy({where: {sku_id: skuId}});
}