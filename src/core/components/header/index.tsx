import React, { Component } from 'react';
import styledComponents from 'styled-components';
import { Link } from 'react-router-dom';

import { default as styles } from './styles';

import bellIcon from '@/assets/img/bell.svg';
import gearIcon from '@/assets/img/gear.svg';

import {
    IOwnProps,
} from './types';

class HeaderLayout extends Component<IOwnProps, {}> {
  render() {
    const { className, userInfo, title } = this.props;

    return (
        <div id='header' className={`${className}`}>
            <p className='text-primary header-title'>{title || ''}</p>
            <div className='header-menu'>
                    <div className='header-menu-item'>
                        {/* tslint:disable-next-line:jsx-no-lambda */}
                        <button onClick={() => {console.log('TODO: Notifications click'); }}>
                            <img src={bellIcon} alt='Notifications'/>
                        </button>
                    </div>
                    <div className='header-menu-item'>
                        <Link to={userInfo.link}>
                            {
                                typeof userInfo.avatar === 'string' ?
                                    <img src={userInfo.avatar} alt='' className='header-menu-user-avatar'/> :
                                    userInfo.avatar
                            }
                            <span className='header-menu-item-user'>{userInfo.fullName}</span>
                        </Link>
                    </div>
            </div>
            <div className='settings-button header-menu-item'>
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <button onClick={() => {console.log('TODO: Settings click'); }}>
                    <img src={gearIcon} alt='Settings' />
                </button>
            </div>
        </div>
    );
  }
}

export const Header = styledComponents(HeaderLayout)`${styles}`;
