import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';
import classNames from 'classnames';

import {
    IOwnProps,
    IOwnState,
    IAccordion,
} from './types';

class AccordionLayout extends Component<IOwnProps, IOwnState> implements IAccordion {
    readonly state: IOwnState = {
        isOpened: false,
    };

    handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        this.setState(prevState => ({
            isOpened: !prevState.isOpened,
        }));
    }

    render() {
        const {
            className,
            children,
            name,
            onClick,
            ...others
        } = this.props;

        const accordionOpenedClass = classNames({accordion: true, accordion_opened: this.state.isOpened});

        return (
            <section
                className={`${className} ${accordionOpenedClass}`}
                {...others}
            >
                <div
                    className='accordion__heading'
                    onClick={this.handleClick}
                >
                    <p>{name}</p>
                </div>
                {this.state.isOpened && <form className='accordion__content'>{children}</form>}
            </section>
        );
    }
  }

export const Accordion = styledComponents(AccordionLayout)`${styles}`;