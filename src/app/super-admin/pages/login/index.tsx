import React, { Component } from 'react';
import styledComponents from 'styled-components';

import logoFullIcon from '@/assets/img/logoFullIcon.svg';

import { LoginFormComponent } from './login-form';
import { ForgetFormComponent } from './forget-password-form';

import { default as styles } from './styles';

import {
  IOwnProps,
  IReduxActionProps,
  IReduxProps,
  IOwnState,
} from './types';

type Props = IReduxProps & IReduxActionProps & IOwnProps & IOwnState;
class SALoginPageComponent extends Component<Props> {

  readonly state: IOwnState = {
    forgetPassword: false,
  };

  forgetClickHandler = () => {
    this.setState({
      forgetPassword: true,
    });
  }

  formRender = (): JSX.Element => {
    const {forgetPassword} = this.state;
    if (forgetPassword) return <ForgetFormComponent />;
    return <LoginFormComponent onForgetClick={this.forgetClickHandler} />;
  }

  render() {
    const {
      className,
    } = this.props;

    return (
      <section className={`${className} login`}>
        <header className='login__header'>
          <a className='logo' href='/'>
            <img src={logoFullIcon} alt='company'/>
          </a>
        </header>
        <div className='login__content'>
          <div className='login__form-wrapper'>
            {this.formRender()}
          </div>
        </div>
      </section>
    );
  }
}

export const SALoginPage = styledComponents(SALoginPageComponent)`${styles}`;
