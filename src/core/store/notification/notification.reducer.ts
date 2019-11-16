import { Action } from 'redux';
import { isType } from 'typescript-fsa';

import { notificationSuccess, notificationClose } from './notification.action';
import { INotificationState } from '@/core/models/interfaces/store';

const initialState: INotificationState = {
    notificationStack: [],
};

export const notificationReducer = (state: INotificationState = initialState, action: Action): INotificationState => {
    if (isType(action, notificationSuccess)) {
        if (action.payload.urlRequest) {
            return {
                notificationStack: [
                    ...state.notificationStack.filter(notification =>
                        notification.urlRequest !== action.payload.urlRequest,
                    ),
                    action.payload,
                ],
            };
        }
        return {
            notificationStack: [
                ...state.notificationStack,
                action.payload,
            ],
        };
    }
    if (isType(action, notificationClose)) {
        return {
            notificationStack: [
                ...state.notificationStack.filter(notification => notification.id !== action.payload.id),
            ],
        };
    }
    return state;
};