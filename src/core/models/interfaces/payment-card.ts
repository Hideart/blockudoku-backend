export interface IChannelPartnerCard {
  id: string;
  last4: string;
  exp_month: number | string;
  exp_year: number | string;
  default: boolean;
  [key: string]: string | number | boolean;
}