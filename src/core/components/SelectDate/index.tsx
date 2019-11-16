import React, { Component } from 'react';
import styledComponents from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
} from './types';

class DateLayout extends Component<IOwnProps> {

    readonly state: IOwnState = {
        startDate: new Date(),
        endDate: new Date(),
    };

    handleChange = (startDate?: Date | null, endDate?: Date) => {
        startDate = startDate || this.state.startDate;
        endDate = endDate || this.state.endDate;
        if (startDate > endDate) endDate = startDate;
        this.setState({ startDate, endDate });
    }

    handleChangeStart = (startDate: Date) => this.handleChange( startDate );

    handleChangeEnd = (endDate: Date) => this.handleChange(null, endDate);

    render() {
        const {className, onClick, onBlur, onFocus, placeholder, ...others} = this.props;
        return (
            <div className={`${className} select-date`} {...others}>
                <div className='select-date__wrap'>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeStart}
                    />
                    <p>{placeholder}</p>
                </div>
            </div>
        );
    }
  }

export const SelectDate = styledComponents(DateLayout)`${styles}`;
