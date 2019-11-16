import React, { Component } from 'react';
import styledComponents from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
} from './types';

class DatepickerLayout extends Component<IOwnProps> {

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
        const {className, onClick, onBlur, onFocus, ...others} = this.props;
        return (
            <div className={`${className} CustomDatepicker`} {...others}>
                <div className={`${className} CustomDatepicker__wrap`}>
                    <DatePicker
                        selected={this.state.startDate}
                        selectsStart={true}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart}
                    />
                    <p>From</p>
                </div>
                <div className={`${className} CustomDatepicker__wrap`}>
                    <DatePicker
                        selected={this.state.endDate}
                        selectsEnd={true}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                        minDate={this.state.startDate}
                    />
                    <p>To</p>
                </div>
            </div>
        );
    }
  }

export const CustomDatepicker = styledComponents(DatepickerLayout)`${styles}`;
