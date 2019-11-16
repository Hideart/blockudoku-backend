import React, { Component } from 'react';
import styledComponents from 'styled-components';
import ReactSelect from 'react-select';

import { default as styles } from './styles';

import {
    IOwnProps,
    ISelectOption,
    ICustomSelect,
} from './types';

export type ISelectOption = ISelectOption;

class CustomSelectLayout extends Component<IOwnProps> implements ICustomSelect {

    getOptionLabel = (option: ISelectOption): string => {
        return option.value;
    }

    getOptionValue = (option: ISelectOption): string => {
        return option.key;
    }

    render() {
        const { getOptionLabel, getOptionValue } = this;
        const { className, defaultVal, options, placeholder, ...others } = this.props;
        return (
            <section className={`${className} custom-select`}>
                <ReactSelect
                    {...others}
                    defaultValue={defaultVal}
                    getOptionLabel={getOptionLabel}
                    getOptionValue={getOptionValue}
                    className='select'
                    classNamePrefix='select'
                    options={options}
                    isSearchable={false}
                />
                <p className='custom-select__placeholder'>{placeholder}</p>
            </section>
        );
    }
}

export const Select = styledComponents(CustomSelectLayout)`${styles}`;
