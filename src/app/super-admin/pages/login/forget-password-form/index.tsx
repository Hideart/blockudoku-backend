import React, { Component } from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';
import { FormikProps, FormikErrors, Form, Formik } from 'formik';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

import { Input } from '@/core/components/input';
import { Button } from '@/core/components/button';

import { default as styles } from './styles';

import {
  IOwnProps,
  IReduxActionProps,
  IReduxProps,
  IForgetForm,
} from './types';
import { IResetPassword } from '@/core/models/interfaces/user';
import { resetPasswordWorker } from '@admin/store/admin/admin.action';
interface IFormValues {
  email: string;
}

type Props = IReduxProps & IReduxActionProps & IOwnProps;
class ForgetFormLayout extends Component<Props> implements IForgetForm {

  handleChange = (values: any) => {
    this.props.actions.resetPassword({email: values.email});
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
        }}
        validate={(values: IFormValues) => {
          const errors: FormikErrors<IFormValues> = {};
          if (!values.email) {
            errors.email = 'Required';
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
            <Form className='login__forget'>
                <p className='login__title'>Enter email</p>
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
                <Button type='submit'>Reset password</Button>
            </Form>
          );
        }}
      />
    );
  }
}

const ForgetFormWithStyles = styledComponents(ForgetFormLayout)`${styles}`;

export const ForgetFormComponent = connect(null,
  (dispatch: ICustomDispatch): IReduxActionProps => ({
    actions: {
      resetPassword: ({email}: IResetPassword) => dispatch(resetPasswordWorker({ email })),
    },
  }),
)(ForgetFormWithStyles);
