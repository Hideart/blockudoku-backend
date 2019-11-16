import React, { Component, FocusEvent, ChangeEvent, MouseEvent } from 'react';
import styledComponents from 'styled-components';
import debounceWrapper from 'lodash.debounce';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
    IInput,
} from './types';

const send = (fn: any, ...options: any) => {
    fn(...options);
  };
const sendEmit = debounceWrapper(send, 500);

class SearchLayout extends Component<IOwnProps, IOwnState> implements IInput {

    readonly state: IOwnState = {
        placeholderShown: true,
    };

    handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        const { onChange } = this.props;
        sendEmit(onChange, e.target.value);
    }
    onOwnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.currentTarget;
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    }

    handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
        const { onFocus }: IOwnProps = this.props;
        this.setState({
            placeholderShown: false,
        });
        onFocus && onFocus(e);
    }

    handleClick = (e: MouseEvent<HTMLInputElement>): void => {
        const { onClick }: IOwnProps = this.props;
        this.setState({
            placeholderShown: false,
        });
        onClick && onClick(e);
    }

    handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
        const { onBlur }: IOwnProps = this.props;
        this.setState({
            placeholderShown: true,
        });
        onBlur && onBlur(e);
    }

    render() {
        const { handleFocus, handleBlur, handleClick } = this;
        const { placeholderShown } = this.state;
        const { className, placeholder = 'Search', value, onChange, ...others } = this.props;

        return (
            <div {...others} className={`${className} search`}>
                <input
                    className={value === '' && placeholderShown ? 'placeholder-shown' : ''}
                    onChange={this.handleSearch}
                    type='text'
                    onClick={handleClick}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    value={value}
                />
                <p>{placeholder}</p>
                <button name='submit' type='submit' />
            </div>
        );
    }
  }

export const Search = styledComponents(SearchLayout)`${styles}`;
