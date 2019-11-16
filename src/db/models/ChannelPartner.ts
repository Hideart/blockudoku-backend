import { Model, DataTypes, BuildOptions } from 'sequelize';
import uuidv4 from 'uuid/v4';

import { sequelizeConnection } from '../index';
import {
  IChannelPartner,
  IChannelPartnerModel,
} from '../../core/models/interfaces/channel-partner';
import { ChannelPartnerPaymentMethodModel } from './ChannelPartnerPaymentMethod';
import { ChannelPartnerStatusModel } from './ChannelPartnerStatus';
import { ChannelPartnerCardModel } from './ChannelPartnerCard';
import { config } from '../../../config';
import { jwtSign } from '../../core/services/jwt.service';
import { TokenType } from '../../core/models/enums/jwt';
import { sha256 } from '../../core/services/hash';

type IChannelPartnerModelStatic =
  typeof Model & (new (values?: IChannelPartner, options?: BuildOptions) => IChannelPartnerModel);

export const ChannelPartnerModel =
  <IChannelPartnerModelStatic>sequelizeConnection.define('ChannelPartnerModel',
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
  avatar: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  company: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  order_price: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  sms_price: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  margin: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  payment: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  subscription_due_date: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  payment_method_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'channel_partner_payment_methods',
      key: 'id',
    },
    allowNull: true,
  },
  status_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'channel_partner_statuses',
      key: 'id',
    },
    allowNull: true,
  },
  verified: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  stripe_customer_id: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  token: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  instance_backend_address: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  instance_frontend_address: {
    allowNull: false,
    type: DataTypes.STRING(100),
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
    tableName: 'channel_partners',
    paranoid: true,
  },
);

ChannelPartnerModel.prototype.isCorrectPassword = function(password: string): boolean {
  const hashedPassword = sha256(password, config.get('salt4channelPass'));
  return this.password === hashedPassword;
};

ChannelPartnerModel.prototype.serialize = function(): IChannelPartner {
  const user = this.toJSON();
  if (user.avatar) user.avatar = config.get('currentHost') + 'storage/common/channel-partners/' + user.avatar;

  return user;
};

ChannelPartnerModel.beforeCreate((model, options): void => {
  if (model.id === null) {
    model.id = uuidv4();
  }
  if (!model.token.length) {
    model.token = jwtSign({id: model.id, type: TokenType.CHANNEL_PARTNER}, '100y');
  }
});

ChannelPartnerModel.hasOne(
  ChannelPartnerPaymentMethodModel,
  {as: 'payment_method', foreignKey: 'id', sourceKey: 'payment_method_id'},
);

ChannelPartnerModel.hasOne(ChannelPartnerStatusModel, {as: 'status', foreignKey: 'id', sourceKey: 'status_id'});

ChannelPartnerModel.hasMany(ChannelPartnerCardModel, {
  foreignKey: 'channel_partner_id',
  sourceKey: 'id',
  as: 'cards',
});