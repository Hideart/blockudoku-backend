import { Store } from 'redux';
import { notificationSuccess, notificationClose } from '@/core/store/notification/notification.action';
import { NotificationType } from '@/core/models/enums/store';
import uuidv1 from 'uuid/v1';

export class NotificationService {
    store: Store;
    constructor(appStore: Store) {
        this.store = appStore;
    }
    successMessage(message: string, urlRequest?: string): void {
        const id = uuidv1();
        if (urlRequest) {
            this.store.dispatch(
                notificationSuccess({
                    type: NotificationType.SUCCESS,
                    message: message,
                    id,
                    urlRequest,
                }),
            );
        } else {
            this.store.dispatch(
                notificationSuccess({
                    type: NotificationType.SUCCESS,
                    message: message,
                    id,
                }),
            );
        }

        setTimeout(() => {
            this._closeNotification(id);
        }, 5000);
    }
    errorMessage(message: string, urlRequest?: string): void {
        const id = uuidv1();
        if (urlRequest) {
            this.store.dispatch(
                notificationSuccess({
                    type: NotificationType.ERROR,
                    message: message,
                    id,
                    urlRequest,
                }),
            );
        } else {
            this.store.dispatch(
                notificationSuccess({
                    type: NotificationType.ERROR,
                    message: message,
                    id,
                }),
            );
        }

        setTimeout(() => {
            this._closeNotification(id);
        }, 5000);
    }
    loadingMessage(message: string, urlRequest?: string): void {
        const id = uuidv1();
        if (urlRequest) {
            this.store.dispatch(
                notificationSuccess({
                    type: NotificationType.LOADING,
                    message: message,
                    id,
                    urlRequest,
                }),
            );
        } else {
            this.store.dispatch(
                notificationSuccess({
                    type: NotificationType.LOADING,
                    message: message,
                    id,
                }),
            );
        }
    }
    private _closeNotification(id: string): void {
        this.store.dispatch(notificationClose({id}));
    }
}