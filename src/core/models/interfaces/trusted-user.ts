import { Model } from 'sequelize';

export interface ITrustedUser extends Model {
  id: string;
  token: string;
}

export interface ITrustedUserModel extends Model, ITrustedUser {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
