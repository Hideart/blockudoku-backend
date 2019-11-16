import { RouteProps, RedirectProps } from 'react-router-dom';
import { SADashbordPage } from '@/app/super-admin/pages/dashbord';
import { SALoginPage } from '@admin/pages/login';
import { SAChangePasswordPage } from '@admin/pages/change-password';

import { IRouteProps } from '@/core/models/interfaces/protected-router';
import { AdminLoginGuard } from '@admin/guard/admin-login';
import { SAProfilePage } from '@/app/super-admin/pages/profile';
import { SAChannelPartnersPage } from '@/app/super-admin/pages/channel-partners';
import { SAReportsPage } from '@/app/super-admin/pages/reports';
import { SAeditChannelPartnerPage } from '@/app/super-admin/pages/edit-channel-partner';

import { AdminLoginResolver } from '@admin/resolver/admin-login';
import {
  ChannelPartnersResolver,
  ChannelPartnerResolver,
  ChannelPartnerReportsResolver,
} from '@admin/resolver/channel-partners';

import { StripeTestPage } from '@admin/pages/test-stripe';
import { SAAddPartnerPage } from '../pages/add-channel-partner';

export const redirect: RedirectProps[] = [];

export const SAPage = {
  LAYOUT_PREFFIX: '/app',
  get DASHBORD_PAGE () {
    return `${this.LAYOUT_PREFFIX}/dashbord`;
  },
  get PROFILE_PAGE () {
    return `${this.LAYOUT_PREFFIX}/profile`;
  },
  get CHANNEL_PARTNERS_PAGE () {
    return `${this.LAYOUT_PREFFIX}/channel-partners`;
  },
  get REPORTS_PAGE () {
    return `${this.LAYOUT_PREFFIX}/reports`;
  },
  get EDIT_CH_PART_ROUTER_PAGE () {
    return `${this.LAYOUT_PREFFIX}/channel-partner/:id`;
  },
  get STRIPE_TEST_PAGE () {
    return `${this.LAYOUT_PREFFIX}/stripe-test/:cpId`;
  },
  get EDIT_CH_PART_PAGE () {
    return `${this.LAYOUT_PREFFIX}/channel-partner`;
  },
  get ADD_CH_PART_PAGE () {
    return `${this.LAYOUT_PREFFIX}/add-partner`;
  },
  LOGIN_PAGE: '/login',
  RESET_PASSWORD_ROUTER_PAGE: '/update-password/:token',
  RESET_PASSWORD_PAGE: '/update-password/',
};

export const adminRoutes: IRouteProps[] = [
  {
    component: SADashbordPage,
    path: SAPage.DASHBORD_PAGE,
    exact: true,
    guards: [new AdminLoginGuard()],
    resolvers: [new AdminLoginResolver()],
    redirectUrl: SAPage.LOGIN_PAGE,
    props: {
      title: 'Dashboard',
    },
  },
  {
    component: SAProfilePage,
    path: SAPage.PROFILE_PAGE,
    exact: true,
    guards: [new AdminLoginGuard()],
    resolvers: [new AdminLoginResolver()],
    redirectUrl: SAPage.LOGIN_PAGE,
    props: {
      title: 'Profile',
    },
  },
  {
    component: SAChannelPartnersPage,
    path: SAPage.CHANNEL_PARTNERS_PAGE,
    exact: true,
    guards: [new AdminLoginGuard()],
    resolvers: [
      new AdminLoginResolver(),
      new ChannelPartnersResolver(),
    ],
    redirectUrl: SAPage.LOGIN_PAGE,
    props: {
      title: 'Channel partners',
    },
  },
  {
    component: SAReportsPage,
    path: SAPage.REPORTS_PAGE,
    exact: true,
    guards: [new AdminLoginGuard()],
    resolvers: [
      new AdminLoginResolver(),
      new ChannelPartnerReportsResolver(),
    ],
    redirectUrl: SAPage.LOGIN_PAGE,
    props: {
      title: 'Reports',
    },
  },
  {
    component: SAeditChannelPartnerPage,
    path: SAPage.EDIT_CH_PART_ROUTER_PAGE,
    exact: true,
    guards: [new AdminLoginGuard()],
    resolvers: [new AdminLoginResolver(), new ChannelPartnerResolver()],
    redirectUrl: SAPage.LOGIN_PAGE,
    props: {
      title: 'Edit Channel Partner',
    },
  },
  {
    component: StripeTestPage,
    path: SAPage.STRIPE_TEST_PAGE,
    exact: true,
    guards: [new AdminLoginGuard()],
    resolvers: [new AdminLoginResolver()],
    redirectUrl: SAPage.LOGIN_PAGE,
    props: {
      title: 'Test stripe card add',
    },
  },
  {
    component: SAAddPartnerPage,
    path: SAPage.ADD_CH_PART_PAGE,
    exact: true,
    guards: [new AdminLoginGuard()],
    resolvers: [new AdminLoginResolver()],
    redirectUrl: SAPage.LOGIN_PAGE,
    props: {
      title: 'Add Channel Partner',
    },
  },
];

export const userRoutes: RouteProps[] = [
  {
    component: SALoginPage,
    path: SAPage.LOGIN_PAGE,
    exact: true,
  },
  {
    component: SAChangePasswordPage,
    path: SAPage.RESET_PASSWORD_ROUTER_PAGE,
    exact: true,
  },
];
