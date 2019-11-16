import React, { Component } from 'react';
import styledComponents from 'styled-components';
import { default as styles } from './styles';

import {
  IOwnProps,
} from '@/core/components/layout/types';

import { Header } from '../header';
import { Sidebar } from '../sidebar';

import userPhoto from '@/assets/img/photo.png';
import logo from '@/assets/img/logo.svg';

class Layout extends Component<IOwnProps> {

  render() {
    const { children, className, sidebarMenuItems, userInfo, headerTitle, companyInfo, mainLink } = this.props;
    return (
      <section className={className}>
        <Header
          userInfo={userInfo || {fullName: 'User Name', avatar: userPhoto, link: '/'}}
          title={headerTitle || 'Main'}
        />
        <Sidebar
            mainLink={mainLink}
            company={companyInfo || {logo: logo, title: 'Lean Logic'}}
            menuItems={sidebarMenuItems || []}
        />
        <section id='content'>
          {children}
        </section>
      </section>
    );
  }
}

export const LayoutComponent = styledComponents(Layout)`${styles}`;
