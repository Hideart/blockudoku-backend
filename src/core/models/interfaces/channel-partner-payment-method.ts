import { Model } from 'sequelize';

export interface IChannelPartnerPaymentMethod extends Model {
  id: string;
  name?: string;
}

export interface IChannelPartnerPaymentMethodModel extends Model, IChannelPartnerPaymentMethod {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
