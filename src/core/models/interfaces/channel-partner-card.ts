import { Model } from 'sequelize';

export interface IChannelPartnerCard extends Model {
  id: string;
  channel_partner_id: string;
  stripe_card_id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
  default: boolean;
}

export interface IChannelPartnerCardModel extends Model, IChannelPartnerCard {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
