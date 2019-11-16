import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
    IOwnProps,
} from './types';

class HeadingLayout extends Component<IOwnProps> {
    render() {
        const {className, style, children} = this.props;
        return (
            <p
                style={style && style}
                className={`${className}`}
            >
                {children}
            </p>
        );
    }
  }

export const Heading = styledComponents(HeadingLayout)`${styles}`;