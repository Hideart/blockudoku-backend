import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
    IOwnProps,
} from './types';

class SpinnerLayout extends Component<IOwnProps> {
    render() {
        const {className, ...others} = this.props;
        return (
            <div className={`${className} spinner`} {...others}>
                <span />
                <span />
                <span />
                <span />
            </div>
        );
    }
}

export const Spinner = styledComponents(SpinnerLayout)`${styles}`;
