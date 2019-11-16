import { NotificationType } from '../enums/store';

export interface INotification {
    type: NotificationType;
    message: string;
    urlRequest?: string;
    id: string;
}
export interface INotificationState {
    notificationStack: INotification[];
}