import React from 'react';
import { Provider } from 'react-redux';

import GlobalStyles from './styles';

import { default as Router } from '@admin/router';
import { store } from '@admin/store';
import { ApiCallWrapper } from '@/core/store/api-call-wrapper';
import { NotificationComponent } from '@/core/components/notification';
import { globalConfig } from '@/client-config';

import { NotificationService } from '@/core/services/notification.service';
import { SAPage } from '@admin/router/routes-path';
import { history } from '@admin/router/history';
import { DateService } from '@/core/services/date.service';

export const notificationService = new NotificationService(store);

export const apiCallWrapper = new ApiCallWrapper({
  notification: notificationService,
  clientGlobalConfig: globalConfig,
  redirectUrl: SAPage.LOGIN_PAGE,
  router: history,
});
export const dateService = new DateService();

export class SuperAdmin extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyles />
        <Router />
        <NotificationComponent />
      </Provider>
    );
  }
}
