import { ChannelPartnerStatus } from '@admin/models/enums/channel-partner';
import { IChannelPartnerCard } from '@/core/models/interfaces/payment-card';

export interface IChannelPartner {
  id: string;
  name: string;
  avatar: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  order_price: number;
  sms_price: number;
  margin: number;
  payment: number;
  verified: boolean;
  payment_method: {
    id: string;
    name: string;
  };
  status: {
    id: string;
    name: ChannelPartnerStatus;
  };
  stripeToken: {
    id: string,
    card: {
      id: string,
      [key: string]: any,
    };
  };
  createdAt: string;
  cards: IChannelPartnerCard[];
  [key: string]: string | number | object | undefined | boolean;
}

export interface IChannelPartnerUpdate {
  id: string;
  updateData: {
    name?: string;
    avatar?: File;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
    order_price?: number;
    sms_price?: number;
    margin?: number;
    payment?: number;
    verified?: boolean;
    status_name?: string;
    stripeToken?: {
      id: string,
      card: {
        id: string,
        [key: string]: any,
      },
      [key: string]: any,
    };
    createdAt?: string;
    [key: string]: string | number | object | undefined | boolean;
  };
}

export interface IChannelPartnerInvite {
  email: string;
}