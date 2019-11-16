import React, { Component } from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

import logoIcon from '@/assets/img/logo.svg';

import { Input } from '@/core/components/input';
import { Button } from '@/core/components/button';

import { default as styles } from './styles';

import {
  IOwnProps,
  IReduxActionProps,
  IReduxProps,
} from './types';
import { IUpdatePassword } from '@/core/models/interfaces/user';
import { updatePasswordWorker } from '../../store/admin/admin.action';
import { RouteComponentProps } from 'react-router';

interface IFormValues {
  repeatPassword: string;
  password: string;
}

interface IRouterProps {
  token: string;
}

type Props = IReduxProps & IReduxActionProps & IOwnProps & FormikProps<IFormValues> & RouteComponentProps<IRouterProps>;
class SAChangePassPage extends Component<Props> {

  render() {
    const {
      className,
      touched,
      errors,
      values,
      handleChange,
      handleBlur,
    } = this.props;

    return (
      <section className={`${className} change-pass`}>
        <header className='change-pass__header'>
          <a className='logo' href='/'>
            <img src={logoIcon} alt='company'/>
            Lean Logic
          </a>
        </header>
        <div className='change-pass__content'>
          <div className='change-pass__form-wrapper'>
          <Form>
              <p className='change-pass__title'>New password</p>
              {touched.password && errors.password && <p className='change-pass__error'>{errors.password}</p>}
              <Input
                  type='password'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder='Password'
              />
              {/* tslint:disable-next-line: max-line-length */}
              {touched.repeatPassword && errors.repeatPassword && <p className='change-pass__error'>{errors.repeatPassword}</p>}
              <Input
                  type='password'
                  name='repeatPassword'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatPassword}
                  placeholder='Repeat password'
              />
              <Button type='submit'>Change password</Button>
            </Form>
          </div>
        </div>
      </section>
    );
  }
}

const SAChangePassComponent = styledComponents(SAChangePassPage)`${styles}`;

const formikEnhancer = withFormik<Props, IFormValues>({
  handleSubmit: (values, { props }) => {
    props.actions.updatePassword({resetPasswordToken: props.match.params.token, password: values.password});
  },
  mapPropsToValues: props => {
    return {
      repeatPassword: '',
      password: '',
    };
  },
  validate: (values: IFormValues) => {
    const errors: FormikErrors<IFormValues> = {};
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.repeatPassword) {
      errors.repeatPassword = 'Required';
    }
    if (values.repeatPassword.length !== 0 && values.repeatPassword !== values.password) {
      errors.repeatPassword = 'Passwords do not match';
    }
    return errors;
  },
})(SAChangePassComponent);

export const SAChangePasswordPage = connect(null,
  (dispatch: ICustomDispatch): IReduxActionProps => ({
    actions: {
      updatePassword: ({resetPasswordToken, password}: IUpdatePassword) =>
        dispatch(updatePasswordWorker({resetPasswordToken, password})),
    },
  }),
)(formikEnhancer);
