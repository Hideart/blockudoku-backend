import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';

import { LayoutComponent } from '@/core/components/layout';
import { IOwnProps, IReduxProps } from './types';
import { IUserInfo } from '@/core/components/header/types';
import { IAdminStore } from '@admin/models/interfaces/admin-store';
import { CustomRoute } from '@/core/router/custom-router';

import dashboardIcon from '@/assets/img/chart.svg';
import puzzleIcon from '@/assets/img/puzzle.svg';
import reportsIcon from '@/assets/img/doc.svg';
import customerIcon from '@/assets/img/customer.svg';

import { adminRoutes } from '@admin/router/routes-path';
import { ISidebarMenuItem } from '@/core/components/sidebar/types';
import { SAPage } from '@admin/router/routes-path';

type Props = IOwnProps & IReduxProps;

const sidebarLinks: Array<ISidebarMenuItem> = [
  { icon: dashboardIcon, label: 'Dashboard', url: SAPage.DASHBORD_PAGE },
  { icon: puzzleIcon, label: 'Channel Partners', url: SAPage.CHANNEL_PARTNERS_PAGE },
  { icon: reportsIcon, label: 'Reports', url: SAPage.REPORTS_PAGE },
  { icon: customerIcon, label: 'Profile', url: SAPage.PROFILE_PAGE },
];

class SALayoutJSX extends Component<Props> {
    readonly state = {
        path: '',
        title: '',
    };

    propsCallBack = (data: any, path: string | string[] | undefined) => {
        const { title } = data;
        const currentPath = this.state.path;
        if (currentPath !== path) {
            this.setState({ title, path });
        }
    }
  render() {
    const { companyInfo, user } = this.props;
    const { title } = this.state;

    const userInfo: IUserInfo = {fullName: '', avatar: '', link: SAPage.PROFILE_PAGE};
    if (user) {
      if (user.first_name && user.last_name) userInfo.fullName = `${user.first_name} ${user.last_name}`;
      if (user.avatar) userInfo.avatar = user.avatar;
    }

    return (
        <LayoutComponent
            mainLink={SAPage.DASHBORD_PAGE}
            headerTitle={title}
            sidebarMenuItems={sidebarLinks}
            companyInfo={companyInfo}
            {... { userInfo }}
        >
          <Switch>
            {/* tslint:disable-next-line: jsx-no-multiline-js */}
            {adminRoutes.map(route => (
                <CustomRoute
                    key={route.path as string}
                    // tslint:disable-next-line: jsx-no-lambda
                    propsCallBack={(e) => this.propsCallBack(e, route.path)}
                    {...route}
                />
            ))}
            <Redirect from='*' to={SAPage.DASHBORD_PAGE} />
        </Switch>
        </LayoutComponent>
    );
  }
}

export const SALayout = connect((state: IAdminStore) => ({user: state.admin.user}))(SALayoutJSX);
