import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
    IOwnProps,
} from './types';

class CardLayout extends Component<IOwnProps> {
    render() {
        const {className, title, value, ...others} = this.props;
        return (
            <div
                className={`${className} card`}
                {...others}
            >
                <p className={`${className} card__title`}>{title}</p>
                <p className={`${className} card__value`}>{value}</p>
            </div>
        );
    }
  }

export const Card = styledComponents(CardLayout)`${styles}`;
