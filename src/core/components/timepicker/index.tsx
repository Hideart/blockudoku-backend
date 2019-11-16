import React, { Component } from 'react';
import styledComponents from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
} from './types';

class TimepickerLayout extends Component<IOwnProps> {

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
            <div className={`${className} CustomTimepicker`} {...others}>
                <div className={`${className} CustomTimepicker__wrap`}>
                    <DatePicker
                        showTimeSelect={true}
                        showTimeSelectOnly={true}
                        selected={this.state.startDate}
                        selectsStart={true}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart}
                        dateFormat='h:mm aa'
                        timeCaption='Time'
                    />
                    <p>From</p>
                </div>
                <div className={`${className} CustomTimepicker__wrap`}>
                    <DatePicker
                        showTimeSelect={true}
                        showTimeSelectOnly={true}
                        selected={this.state.endDate}
                        selectsEnd={true}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                        minDate={this.state.startDate}
                        dateFormat='h:mm aa'
                        timeCaption='Time'
                    />
                    <p>To</p>
                </div>
            </div>
        );
    }
  }

export const CustomTimepicker = styledComponents(TimepickerLayout)`${styles}`;
