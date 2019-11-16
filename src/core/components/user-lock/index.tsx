import React, { Component, ChangeEvent } from 'react';
import styledComponents from 'styled-components';
import { UnlockIcon, LockIcon } from '@/core/components/icon/index.tsx';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
} from './types';

class UserLockLayout extends Component<IOwnProps, IOwnState> {

    readonly state: IOwnState = {
        checked: false,
    };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(e.target.checked);
        }
    }

    render() {
        const {
            className,
            checked,
            ...others
        } = this.props;

        return (
            <label className={`${className} user-lock`}>
                <input
                    {...others}
                    type='checkbox'
                    checked={checked}
                    onChange={this.handleChange}
                />
                {checked ? LockIcon() : UnlockIcon()}
            </label>
        );
    }
  }

export const UserLock = styledComponents(UserLockLayout)`${styles}`;
