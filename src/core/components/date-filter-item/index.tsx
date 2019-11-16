import React, { Component, ChangeEvent } from 'react';
import styledComponents from 'styled-components';
import moment from 'moment';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
    IInput,
    IDateRange,
} from './types';

class DatefilterItemLayout extends Component<IOwnProps, IOwnState> implements IInput {
    readonly state: IOwnState = {
        value: 'day',
    };

    changeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value } = this.props;

        const dateRange: IDateRange = {
            start: value.toString(),
            end: moment().toString(),
        };

        this.props.onChange(dateRange);
    }

    render() {
        const {children, className, defaultChecked, onChange, ...others} = this.props;
        const { changeInput } = this;
        return (
            <label className={`${className}`} {...others}>
                <input
                    onChange={changeInput}
                    name='date'
                    type='radio'
                    defaultChecked={defaultChecked !== undefined ? true : undefined}
                />
                <span>{children}</span>
            </label>
        );
    }
  }

export const DatefilterItem = styledComponents(DatefilterItemLayout)`${styles}`;
