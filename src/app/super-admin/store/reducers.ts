import { combineReducers, Reducer } from 'redux';

import { adminReducer } from './admin/admin.reducer';
import { notificationReducer } from '@/core/store/notification/notification.reducer';
import { IAdminStore } from '@admin/models/interfaces/admin-store';
import { channelPartnerReducer } from './channel-partner/channel-partner.reducer';

const reducers: Reducer<IAdminStore> = combineReducers({
    admin: adminReducer,
    notification: notificationReducer,
    cp: channelPartnerReducer,
});

export default reducers;