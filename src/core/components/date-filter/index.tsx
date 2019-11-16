import React, { Component } from 'react';
import styledComponents from 'styled-components';
import { DatefilterItem } from '@/core/components/date-filter-item';
import { default as styles } from './styles';

import {
    IOwnProps,
    IDateFilter,
} from './types';

import { IDateRange } from '@/core/components/date-filter-item/types';

class DateFilterLayout extends Component<IOwnProps> implements IDateFilter {

    onChangeHandler = (value: IDateRange) => {
        if (!this.props.isLoading) {
            this.props.onChange(value);
        }
    }

    render() {
        const {className, data, defaultChecked, onChange, isLoading,  ...others} = this.props;
        return (
            <div
                className={`${className}`}
                {...others}
            >
                {/* tslint:disable: jsx-no-multiline-js*/}
                { data.map((el, i) => (
                    <DatefilterItem
                        key={`item-${i}`}
                        value={el.value}
                        onChange={this.onChangeHandler}
                        defaultChecked={defaultChecked === i ? defaultChecked : undefined}
                    >
                        {el.label}
                    </DatefilterItem>
                ))}
                {/* tslint:enable: jsx-no-multiline-js*/}
            </div>
        );
    }
  }

export const DateFilter = styledComponents(DateFilterLayout)`${styles}`;
