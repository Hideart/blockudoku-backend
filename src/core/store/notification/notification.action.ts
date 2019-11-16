import actionCreatorFactory from 'typescript-fsa';
import { INotification } from '@/core/models/interfaces/store';

const actionCreator = actionCreatorFactory();

export const notificationSuccess = actionCreator<INotification>('NOTIFICATION_SUCCESS');

export const notificationClose = actionCreator<{id: string}>('NOTIFICATION_CLOSE');