import { ChannelPartnerModel } from '../../db/models/ChannelPartner';
import {
  IChannelPartnerModel,
  IChannelPartner,
  IChannelPartnerUpdate,
} from '../../core/models/interfaces/channel-partner';

import { ChannelPartnerStatusModel } from '../../db/models/ChannelPartnerStatus';
import { ChannelPartnerPaymentMethodModel } from '../../db/models/ChannelPartnerPaymentMethod';
import { ICardData, ICardDataUpdate } from '../../core/models/interfaces/stripe';
import { ChannelPartnerCardModel } from '../../db/models/ChannelPartnerCard';
import { IChannelPartnerCardModel } from '../../core/models/interfaces/channel-partner-card';
import { IChannelPartnerStatusModel } from '../../core/models/interfaces/channel-partner-status';

export async function getChannelPartnersService(sort: any, filterParams: any, offset: number, limit: number):
  Promise<{
    rows: IChannelPartnerModel[];
    count: number;
}> {

  const channelPartners = await ChannelPartnerModel.findAndCountAll({
    order: [sort],
    where: {
      ...filterParams,
    },
    include: [
      { model: ChannelPartnerStatusModel, as: 'status', duplicating: false},
      { model: ChannelPartnerPaymentMethodModel, as: 'payment_method', duplicating: false},
      { model: ChannelPartnerCardModel, as: 'cards', duplicating: false},
    ],
    limit,
    offset,
  });

  return channelPartners;
}

export async function findChannelPartnerByIdService(id: string): Promise<IChannelPartnerModel | null> {
  const channelPartner = await ChannelPartnerModel.findOne({
    where: { id },
    include: [
      { model: ChannelPartnerStatusModel, as: 'status', duplicating: false},
      { model: ChannelPartnerPaymentMethodModel, as: 'payment_method', duplicating: false},
      { model: ChannelPartnerCardModel, as: 'cards', duplicating: false},
    ],
  });
  return channelPartner;
}

export async function findChannelPartnerByEmailService(email: string): Promise<IChannelPartnerModel | null> {
  const channelPartner = await ChannelPartnerModel.findOne({
    where: { email },
    include: [
      { model: ChannelPartnerStatusModel, as: 'status', duplicating: false},
      { model: ChannelPartnerPaymentMethodModel, as: 'payment_method', duplicating: false},
      { model: ChannelPartnerCardModel, as: 'cards', duplicating: false},
    ],
  });
  return channelPartner ? await findChannelPartnerByIdService(channelPartner.id) : null;
}

export async function addChannelPartnerService(cpInfo: IChannelPartner): Promise<IChannelPartnerModel | null> {

  const newPartner = await ChannelPartnerModel.create(cpInfo);

  const channelPartner = await ChannelPartnerModel.findOne({
    where: { id: newPartner.id },
    include: [
      { model: ChannelPartnerStatusModel, as: 'status', duplicating: false},
      { model: ChannelPartnerPaymentMethodModel, as: 'payment_method', duplicating: false},
      { model: ChannelPartnerCardModel, as: 'cards', duplicating: false},
    ],
  });

  return channelPartner;
}

export async function deleteChannelPartnerByIdService(id: string | string[]): Promise<number | null> {
  const deletedChannelPartner = await ChannelPartnerModel.destroy({where: { id }});
  return deletedChannelPartner;
}

export async function updateChannelPartnerByIdService(id: string, cpInfo: IChannelPartnerUpdate):
  Promise<IChannelPartnerModel | null> {
    await ChannelPartnerModel.update(cpInfo, {where: {id}});
    const updatedPartner = await findChannelPartnerByIdService(id);
    return updatedPartner;
}

export async function addChannelPartnerCardService(channelPartnerId: string, cardData: ICardData):
  Promise<IChannelPartnerCardModel> {
    return await ChannelPartnerCardModel.create({
      channel_partner_id: channelPartnerId,
      stripe_card_id: cardData.id,
      brand: cardData.brand,
      exp_year: cardData.exp_year,
      exp_month: cardData.exp_month,
      last4: cardData.last4,
      default: cardData.default,
    });
}

export async function updateChannelPartnerCardService(
  channelPartnerId: string,
  sourceId: string,
  cardData: ICardDataUpdate,
): Promise<void> {
  await ChannelPartnerCardModel.update({
    channel_partner_id: channelPartnerId,
    stripe_card_id: cardData.id && cardData.id,
    brand: cardData.brand && cardData.brand,
    exp_year: cardData.exp_year && cardData.exp_year,
    exp_month: cardData.exp_month && cardData.exp_month,
    last4: cardData.last4 && cardData.last4,
    default: cardData.default && cardData.default,
  }, {
    where: {channel_partner_id: channelPartnerId, stripe_card_id: sourceId},
  });
}

export async function dropDefaultChannelPartnerCardsService(channelPartnerId: string): Promise<void> {
  await ChannelPartnerCardModel.update({
    default: false,
  }, { where: {channel_partner_id: channelPartnerId} });
}

export async function getChannelPartnerCardsService(channelPartnerId: string):
  Promise<IChannelPartnerCardModel[]> {
    return await ChannelPartnerCardModel.findAll({where: {channel_partner_id: channelPartnerId}});
}

export async function deleteChannelPartnerCardService(cardId: string):
  Promise<void> {
    await ChannelPartnerCardModel.destroy({where: {stripe_card_id: cardId}});
}

export async function findChannelPartnersByIdsService(ids: string[]): Promise<IChannelPartnerModel[] | null> {
  const channelPartners = await ChannelPartnerModel.findAll({
    where: { id: ids },
    include: [
      { model: ChannelPartnerStatusModel, as: 'status', duplicating: false},
      { model: ChannelPartnerPaymentMethodModel, as: 'payment_method', duplicating: false},
      { model: ChannelPartnerCardModel, as: 'cards', duplicating: false},
    ],
  });
  return channelPartners;
}

export async function getChannelPartnerStatusByNameService(name: string[]): Promise<IChannelPartnerStatusModel | null> {
  return await ChannelPartnerStatusModel.findOne({ where: { name } });
}

// tslint:disable-next-line: max-line-length
export async function getChannelPartnerPaymentMethodByNameService(name: string[]): Promise<IChannelPartnerStatusModel | null> {
  return await ChannelPartnerPaymentMethodModel.findOne({ where: { name } });
}

export async function getChannelPartnerByTokenService(token: string): Promise<IChannelPartnerStatusModel | null> {
  return await ChannelPartnerModel.findOne({
    where: { token },
    include: [
      { model: ChannelPartnerStatusModel, as: 'status', duplicating: false},
      { model: ChannelPartnerPaymentMethodModel, as: 'payment_method', duplicating: false},
      { model: ChannelPartnerCardModel, as: 'cards', duplicating: false},
    ],
  });
}
