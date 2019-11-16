import { IObject } from '@/core/models/interfaces/object';
import { IChannelPartnerCard } from '@/core/models/interfaces/payment-card';

export const checkFormChange = (newValues: IObject, oldValues: IObject, fields: Array<string>): boolean => {
    for (let i = 0; i < fields.length; i++) {
        if (newValues[fields[i]].toString() !== oldValues[fields[i]].toString()) {
            return true;
        }
    }
    return false;
};

export const cardDataFormat = (card: IChannelPartnerCard): string => {
    return `**** **** ****  ${card.last4} (exp. ${('0' + card.exp_month).slice(-2)}/${card.exp_year})`;
};