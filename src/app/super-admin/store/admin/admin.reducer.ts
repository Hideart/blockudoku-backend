import { Action } from 'redux';
import { isType } from 'typescript-fsa';

import { adminLogin, adminLoginInitial, updateUserInfo } from './admin.action';
import { IAdminState } from '@admin/models/interfaces/admin-store';

const initialState: IAdminState = {
  user: {
      email: null,
      first_name: null,
      last_name: null,
      avatar: null,
  },
  isLoading: false,
};

export const adminReducer = (state: IAdminState = initialState, action: Action): IAdminState => {
    if (isType(action, adminLogin.started)) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (isType(action, adminLogin.done)) {
      return {
          ...state,
          user: action.payload.result.user,
          isLoading: false,
      };
    }
    if (isType(action, adminLogin.failed)) {
        return {
            ...state,
            isLoading: false,
        };
    }
    if (isType(action, adminLoginInitial)) {
        return {
            ...state,
            user: action.payload,
            isLoading: false,
        };
    }
    if (isType(action, updateUserInfo.started)) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (isType(action, updateUserInfo.done)) {
        return {
            ...state,
            user: {
                first_name: action.payload.result.first_name,
                last_name: action.payload.result.last_name,
                avatar: action.payload.result.avatar,
                email: action.payload.result.email,
            },
            isLoading: false,
        };
    }
    if (isType(action, updateUserInfo.failed)) {
        return {
            ...state,
            isLoading: false,
        };
    }
    return state;
};
