import { IAdmin } from './admin';
import { INotificationState } from '@/core/models/interfaces/store';
import { IUserInfoUpdate } from '@/core/models/interfaces/user';
import { IChannelPartner } from '@admin/models/interfaces/channel-partner';

export interface IAdminStore {
    admin: IAdminState;
    notification: INotificationState;
    cp: IChannelPartnerState;
}
export interface IAdminState {
    user: IAdmin;
    isLoading: boolean;
}

export interface IChangePasswordStore {
    status: IChangePasswordState;
}

export interface IChangePasswordState {
    isLoading: boolean;
}

export interface IUserInfoUpdateStore {
    user: IUserInfoUpdateState;
}

export interface IUserInfoUpdateState {
    isLoading: boolean;
    user: IUserInfoUpdate;
}

export interface IChannelPartnerState {
    notVerifiedUsers: string[];
    channelPartners: IChannelPartner[];
    count: number;
    channelPartner: IChannelPartner;
    isLoading: boolean;
}