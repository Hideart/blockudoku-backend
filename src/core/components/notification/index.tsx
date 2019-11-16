import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redux from 'redux';
import styledComponents from 'styled-components';
import { INotificationState, INotification } from '@/core/models/interfaces/store';
import { Spinner } from '@/core/components/spinner';

import { default as styles } from './styles';

import {
    IOwnProps,
    IReduxProps,
    IReduxActionProps,
} from './types';

import fail from '@/assets/img/fail.svg';
import done from '@/assets/img/done.svg';
import { NotificationType } from '@/core/models/enums/store';
import { notificationClose } from '@/core/store/notification/notification.action';

type Props = IOwnProps & IReduxProps & IReduxActionProps;
class Notification extends Component<Props> {

    getAnimationClass = (): string => {
        return 'fadein';
    }

    getTitle = (notification: INotification): string => {
        switch (notification.type) {
            case NotificationType.ERROR:
                return 'Error';
            case NotificationType.SUCCESS:
                return 'Success';
            case NotificationType.LOADING:
                return 'Loading';
        }
    }

    getimage = (notification: INotification): JSX.Element => {
        switch (notification.type) {
            case NotificationType.ERROR:
                return <img className='notification__status-img' src={fail} alt='Error'/>;
            case NotificationType.SUCCESS:
                return <img className='notification__status-img' src={done} alt='sucsess'/>;
            case NotificationType.LOADING:
                return <Spinner className='notification__status-img' />;
        }
    }
    handleCloseNotification = (id: string) => {
        const { actions } = this.props;
        actions.closeNotification(id);
    }
    renderNotificationList = (): JSX.Element[] => {
        const { notifications } = this.props;
        return notifications.map(notifiction => (
            <section
                key={notifiction.id}
                className='notification'
            >
                {this.getimage(notifiction)}
                <div className='notification__info'>
                    <p className='notification__title'>
                        {this.getTitle(notifiction)}
                    </p>
                    <p className='notification__desc'>{notifiction.message}</p>
                </div>
                <button
                    className='notification__close'
                    // tslint:disable-next-line: jsx-no-lambda
                    onClick={() => this.handleCloseNotification(notifiction.id)}
                >
                    close
                </button>
            </section>
            ));
    }

  render() {
    const { className } = this.props;
    return (
        <section className={className}>
            {this.renderNotificationList()}
        </section>
    );
  }
}
const NotificationComponentWithStyles = styledComponents(Notification)`${styles}`;

export const NotificationComponent = connect((state: { notification: INotificationState }, ownProps: IOwnProps ) => {
    return {
        notifications: state.notification.notificationStack,
    };
},
(dispatch: Redux.Dispatch): IReduxActionProps => ({
    actions: {
        closeNotification: (id: string) => dispatch(notificationClose({ id })),
    },
}))(NotificationComponentWithStyles);
