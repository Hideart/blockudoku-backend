import { Model } from 'sequelize';

export interface IStripeSku extends Model {
  id: string;
  sku_id: string;
  product_id: string;
}

export interface IStripeSkuModel extends Model, IStripeSku {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IStripeSkuCustom {
  id?: string;
  sku_id: string;
  product_id: string;
}
