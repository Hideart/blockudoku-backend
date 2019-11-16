import { Model } from 'sequelize';

export interface IUserPasswordResetToken extends Model {
  id: string;
  admin_id?: string;
  channel_partner_id?: string;
  token?: string;
  valid_until: Date;
}

export interface IUserPasswordResetTokenModel extends Model, IUserPasswordResetToken {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
