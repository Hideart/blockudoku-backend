import { Action } from 'redux';
import { isType } from 'typescript-fsa';

import { IChannelPartnerState } from '@admin/models/interfaces/admin-store';
import {
    getChannelPartners,
    updateChannelPartner,
    getChannelPartnerById,
    multipleDeleteChannelPartners,
    verifyChannelPartners,
} from './channel-partner.action';
import { ChannelPartnerStatus } from '../../models/enums/channel-partner';

const initialState: IChannelPartnerState = {
  notVerifiedUsers: [],
  channelPartners: [],
  channelPartner: {
    id: '',
    name: '',
    avatar: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    cards: [],
    createdAt: '',
    margin: 0,
    order_price: 0,
    payment: 0,
    verified: false,
    payment_method: {
        id: '',
        name: '',
    },
    sms_price: 0,
    status: {
        id: '',
        name: ChannelPartnerStatus.BLOCKED,
    },
    stripeToken: {
        id: '',
        card: {
            id: '',
        },
    },
  },
  count: 0,
  isLoading: false,
};

export const channelPartnerReducer =
    (state: IChannelPartnerState = initialState, action: Action): IChannelPartnerState => {
    if (isType(action, getChannelPartners.started)) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (isType(action, getChannelPartners.done)) {
      return {
          ...state,
          channelPartners: action.payload.result.rows,
          count: action.payload.result.count,
          isLoading: false,
      };
    }
    if (isType(action, getChannelPartners.failed)) {
        return {
            ...state,
            isLoading: false,
        };
    }
    if (isType(action, updateChannelPartner.started)) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (isType(action, updateChannelPartner.done)) {
      return {
          ...state,
          channelPartner: action.payload.result,
          isLoading: false,
      };
    }
    if (isType(action, updateChannelPartner.failed)) {
        return {
            ...state,
            isLoading: false,
        };
    }
    if (isType(action, getChannelPartnerById.started)) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (isType(action, getChannelPartnerById.done)) {
        return {
            ...state,
            channelPartner: action.payload.result,
            isLoading: false,
        };
    }
    if (isType(action, getChannelPartnerById.failed)) {
        return {
            ...state,
            isLoading: false,
        };
    }

    if (isType(action, verifyChannelPartners.started)) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (isType(action, verifyChannelPartners.done)) {
        return {
            ...state,
            notVerifiedUsers: action.payload.result.notVerifiedIds,
            isLoading: false,
        };
    }
    if (isType(action, verifyChannelPartners.failed)) {
        return {
            ...state,
            isLoading: false,
        };
    }
    if (isType(action, multipleDeleteChannelPartners.started)) {
        return {
            ...state,
            isLoading: false,
        };
    }
    if (isType(action, multipleDeleteChannelPartners.done)) {
        return {
            ...state,
            isLoading: false,
        };
    }
    if (isType(action, multipleDeleteChannelPartners.failed)) {
        return {
            ...state,
            isLoading: false,
        };
    }

    if (isType(action, getChannelPartnerById.failed)) {
        return {
            ...state,
            isLoading: false,
        };
    }
    return state;
};