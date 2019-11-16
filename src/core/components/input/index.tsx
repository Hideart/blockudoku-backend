import React, { Component, FocusEvent, MouseEvent } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
    IInput,
} from './types';

class InputLayout extends Component<IOwnProps, IOwnState> implements IInput {

    readonly state: IOwnState = {
        placeholderShown: true,
    };

    handleFocus = (e: FocusEvent): void => {
        const { onFocus }: IOwnProps = this.props;
        this.setState({
            placeholderShown: false,
        });
        onFocus && onFocus(e);
    }

    handleClick = (e: MouseEvent): void => {
        const { onClick }: IOwnProps = this.props;
        this.setState({
            placeholderShown: false,
        });
        onClick && onClick(e);
    }

    handleBlur = (e: FocusEvent): void => {
        const { onBlur }: IOwnProps = this.props;
        this.setState({
            placeholderShown: true,
        });
        onBlur && onBlur(e);
    }

    render() {
        const { placeholderShown } = this.state;
        const {
            className,
            name,
            type,
            disabled,
            placeholder,
            value,
            onClick,
            onFocus,
            onBlur,
            ...others
        } = this.props;
        return (
            <div className={`${className} input`}>
                <input
                    name={name || 'input'}
                    className={value === '' && placeholderShown ? 'placeholder-shown' : ''}
                    type={type}
                    onClick={this.handleClick}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    value={this.props.value}
                    {...others}
                    disabled={disabled}
                />
                <p>{placeholder}</p>
            </div>
        );
    }
  }

export const Input = styledComponents(InputLayout)`${styles}`;
