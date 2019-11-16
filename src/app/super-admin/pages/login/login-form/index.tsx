import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';
import { FormikProps, FormikErrors, Form, Formik } from 'formik';

import { Input } from '@/core/components/input';
import { Button } from '@/core/components/button';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

import { default as styles } from './styles';

import {
  IOwnProps,
  IReduxActionProps,
  IReduxProps,
} from './types';
import { newLoginWorker } from '@admin/store/admin/admin.action';
import { IUserLogin } from '@/core/models/interfaces/user';

interface IFormValues {
  email: string;
  password: string;
}

type Props = IReduxProps & IReduxActionProps & IOwnProps;
class LoginFormLayout extends Component<Props> {

  handleChange = (values: any) => {
   this.props.actions.adminLogin(values);
  }

  handleForget = () => {
    this.props.onForgetClick();
  }

  render() {
    // tslint:disable
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={(values: IFormValues) => {
          const errors: FormikErrors<IFormValues> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={this.handleChange}
        render={(props: FormikProps<IFormValues>) => {
          const {
            touched,
            errors,
            values,
            handleChange,
            handleBlur,
          } = props;
          return (
          <Form>
              <p className='login__title'>Login</p>
              <fieldset>
                {touched.email && errors.email && <p className='login__error'>{errors.email}</p>}
                <Input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder='Email'
                />
              </fieldset>
              <fieldset>
                {touched.password && errors.password && <p className='login__error'>{errors.password}</p>}
                <Input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder='Password'
                />
              </fieldset>
              <span className='login__forget' onClick={this.handleForget}>Forgot password</span>
              <Button type='submit'>Log in</Button>
          </Form>
        )}}
      />
    );
  }
  // tslint:enable
}

const LoginFormWithStyles = styledComponents(LoginFormLayout)`${styles}`;

export const LoginFormComponent = connect(null,
  (dispatch: ICustomDispatch): IReduxActionProps => ({
    actions: {
      adminLogin: ({email, password}: IUserLogin) => dispatch(newLoginWorker({ email, password })),
    },
  }),
)(LoginFormWithStyles);
