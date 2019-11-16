import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
    IOwnProps,
    ICheckbox,
} from './types';

class CheckboxLayout extends Component<IOwnProps> implements ICheckbox {

  changeHandler = (): void => {
    this.props.onChange && this.props.onChange(this.props.value);
  }

  render() {

    const {
      className,
      label,
      onChange,
      ...others
    } = this.props;

    return (
        <section id='checkbox'  className={`${className} checkbox`}>
          <label>
            <input
              type='checkbox'
              className='invisible-checkbox'
              onChange={this.changeHandler}
              {...others}
            />
            <span className='ll-checkbox' />
            {label && <span className='cb-label'>{label}</span>}
          </label>
        </section>
    );
  }
}

export const Checkbox = styledComponents(CheckboxLayout)`${styles}`;