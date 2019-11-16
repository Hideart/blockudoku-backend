import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';
import { ButtonTypeView } from './types';

import {
    IOwnProps,
} from './types';
export { ButtonTypeView };

class ButtonLayout extends Component<IOwnProps> {
    render() {
        const {
            className,
            icon,
            children,
            ...others
        } = this.props;

        return (
            <button
                className={`${className} button`}
                {...others}
            >
                {icon && <span className='icon'>
                    {icon}
                </span>}
                {children}
            </button>
        );
    }
  }

export const Button = styledComponents(ButtonLayout)`${styles}`;
