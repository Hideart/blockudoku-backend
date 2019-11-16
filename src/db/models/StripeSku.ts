import { Model, DataTypes, BuildOptions } from 'sequelize';

import { sequelizeConnection } from '../index';
import {
  IStripeSku,
  IStripeSkuModel,
} from '../../core/models/interfaces/stripe-sku';

type StripeSkuModelStatic =
  typeof Model & (new (values?: IStripeSku, options?: BuildOptions) => IStripeSkuModel);

export const StripeSkuModel =
  <StripeSkuModelStatic>sequelizeConnection.define('StripeSkuModel',
{
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  sku_id: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  product_id: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
  },
},
  {
    tableName: 'stripe_skus',
    paranoid: true,
  },
);