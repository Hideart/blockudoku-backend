import { Model } from 'sequelize';

export interface IChannelPartnerStatus extends Model {
  id: string;
  name?: string;
}

export interface IChannelPartnerStatusModel extends Model, IChannelPartnerStatus {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
