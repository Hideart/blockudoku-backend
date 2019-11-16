import { Model, DataTypes, BuildOptions } from 'sequelize';

import { sequelizeConnection } from '../index';
import {
  IChannelPartnerPaymentMethod,
  IChannelPartnerPaymentMethodModel,
} from '../../core/models/interfaces/channel-partner-payment-method';

type ChannelPartnerPaymentMethodModelStatic =
  typeof Model & (new (values?: IChannelPartnerPaymentMethod, options?: BuildOptions) =>
    IChannelPartnerPaymentMethodModel);

export const ChannelPartnerPaymentMethodModel =
  <ChannelPartnerPaymentMethodModelStatic>sequelizeConnection.define('ChannelPartnerPaymentMethodModel',
{
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
},
  {
    tableName: 'channel_partner_payment_methods',
    paranoid: false,
  },
);