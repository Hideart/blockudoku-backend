import { Model, DataTypes, BuildOptions } from 'sequelize';
import uuidv4 from 'uuid/v4';

import { sequelizeConnection } from '../index';
import { IChannelPartnerCardModel, IChannelPartnerCard } from '../../core/models/interfaces/channel-partner-card';

type ChannelPartnerCardStatic =
  typeof Model & (new (values?: IChannelPartnerCard, options?: BuildOptions) => IChannelPartnerCardModel);

export const ChannelPartnerCardModel = <ChannelPartnerCardStatic>sequelizeConnection.define('ChannelPartnerCardModel', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  channel_partner_id: {
    allowNull: true,
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'channel_partners',
      key: 'id',
    },
    onDelete: 'set null',
  },
  stripe_card_id: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  brand: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  exp_month: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  exp_year: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  last4: {
    allowNull: false,
    type: DataTypes.STRING(4),
  },
  default: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
},
  {
    tableName: 'channel_partner_cards',
    paranoid: true,
  },
);

ChannelPartnerCardModel.beforeCreate((model, options): void => {
  if (model.id === null) model.id = uuidv4();
});