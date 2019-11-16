import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
    IOwnProps,
} from './types';

class PopupLayout extends Component<IOwnProps> {

    handleClose = (e: React.MouseEvent) => {
        this.props.onClose();
    }

    render() {
        const {className, title, children, ...others} = this.props;
        return (
            <section className={className}>
                <div className='shade' />
                <section className='popup' {...others}>
                    <p className='popup__title'>{title}</p>
                    {children}
                    <button className='popup__close' onClick={this.handleClose}>close</button>
                </section>
            </section>
        );
    }
}

export const Popup = styledComponents(PopupLayout)`${styles}`;