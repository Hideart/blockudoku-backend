import { Model } from 'sequelize';

export interface IChannelPartner extends Model {
  id: string;
  name?: string;
  avatar?: string;
  company?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  order_price?: number;
  sms_price?: number;
  margin?: number;
  payment?: number;
  subscription_due_date?: Date;
  payment_method_id?: string;
  status_id?: string;
  verified?: boolean;
  stripe_customer_id?: string;
  token?: string;
  instance_backend_address?: string;
  instance_frontend_address?: string;
}

export interface IChannelPartnerModel extends Model, IChannelPartner {
  readonly createdAt: Date;
  readonly updatedAt: Date;

  serialize(): IChannelPartner;
  isCorrectPassword(password: string): boolean;
}

export interface IChannelPartnerUpdate {
  name?: string;
  avatar?: string;
  company?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  order_price?: number;
  sms_price?: number;
  margin?: number;
  payment?: number;
  subscription_due_date?: Date;
  payment_method_id?: string;
  status_id?: string;
  verified?: boolean;
  stripe_customer_id?: string;
  instance_backend_address?: string;
  instance_frontend_address?: string;
}

export interface IChannelPartnerReportModel extends Model, IChannelPartner {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  payment_method: {
    id: string,
    name: string,
    createdAt: Date;
    updatedAt: Date;
  };

  serialize(): IChannelPartner;
}