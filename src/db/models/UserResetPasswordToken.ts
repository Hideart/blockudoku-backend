import { Model, DataTypes, BuildOptions } from 'sequelize';
import uuidv4 from 'uuid/v4';

import { sha256 } from '../../core/services/hash';
import { sequelizeConnection } from '../index';
import {
  IUserPasswordResetToken,
  IUserPasswordResetTokenModel,
} from '../../core/models/interfaces/user-reset-password-token';
import { config } from '../../../config';
import { AdminModel } from './Admin';
import { ChannelPartnerModel } from './ChannelPartner';

type UserPasswordResetTokenModelStatic =
  typeof Model & (new (values?: IUserPasswordResetToken, options?: BuildOptions) => IUserPasswordResetTokenModel);

export const UserPasswordResetTokenModel =
  <UserPasswordResetTokenModelStatic>sequelizeConnection.define('UserPasswordResetTokenModel',
{
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  admin_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'admins',
      key: 'id',
    },
    allowNull: true,
  },
  channel_partner_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'channel_partners',
      key: 'id',
    },
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valid_until: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: 'Date',
  },
  updatedAt: {
    allowNull: false,
    type: 'Date',
  },
},
  {
    tableName: 'user_reset_password_token',
    paranoid: true,
  },
);

UserPasswordResetTokenModel.beforeCreate((model): void => {
    if (model.id === null) {
      model.id = uuidv4();
    }
});

UserPasswordResetTokenModel.hasOne(AdminModel, {as: 'admin', foreignKey: 'id', sourceKey: 'admin_id'});
UserPasswordResetTokenModel.hasOne(ChannelPartnerModel, {
  as: 'channel_partners',
  foreignKey: 'id',
  sourceKey: 'channel_partner_id',
});
