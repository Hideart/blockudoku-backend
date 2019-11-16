import { Model, DataTypes, BuildOptions } from 'sequelize';

import { sequelizeConnection } from '../index';
import {
  IChannelPartnerStatus,
  IChannelPartnerStatusModel,
} from '../../core/models/interfaces/channel-partner-status';
import { ChannelPartnerModel } from './ChannelPartner';

type ChannelPartnerStatusModelStatic =
  typeof Model & (new (values?: IChannelPartnerStatus, options?: BuildOptions) => IChannelPartnerStatusModel);

export const ChannelPartnerStatusModel =
  <ChannelPartnerStatusModelStatic>sequelizeConnection.define('ChannelPartnerStatusModel',
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
    tableName: 'channel_partner_statuses',
    paranoid: false,
  },
);
