import React, { Component } from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';

import { ImagePicker } from '@/core/components/image-picker';
import { Input } from '@/core/components/input';
import { Button } from '@/core/components/button';

import { updateUserInfoWorker } from '@admin/store/admin/admin.action';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

import { default as styles } from './styles';

import {
  IOwnProps,
  IReduxActionProps,
  IReduxProps,
  IChangeInfoPage,
} from './types';

import { CheckIcon } from '@/core/components/icon';
import { IAdminStore } from '@admin/models/interfaces/admin-store';

interface IFormValues {
  password: string;
  newPassword: string;
  [key: string]: string | File;
}

type Props = IReduxProps & IReduxActionProps & IOwnProps & FormikProps<IFormValues>;
class ChangeInfo extends Component<Props> implements IChangeInfoPage  {

  handleChange = (avatar: File) => {
    const { setFieldValue } = this.props;
    setFieldValue('avatar', avatar);
  }

  render() {
    const {
      className,
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
      userInfo,
    } = this.props;

    return (
          <section className={`${className} change-info`}>
            <Form className='change-info__content'>
              <ImagePicker
                isLoading={false}
                onDrop={this.handleChange}
                currentImage={userInfo.avatar && userInfo.avatar !== null ? userInfo.avatar : ''}
              />
              <div className='change-info__wrap'>
                <fieldset>
                {touched.password && errors.password && <p className='change-info__error'>{errors.password}</p>}
                  <Input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password || ''}
                    placeholder='Password'
                  />
                </fieldset>
                <fieldset>
                  {/* tslint:disable-next-line: max-line-length */}
                  {touched.newPassword && errors.newPassword && <p className='change-info__error'>{errors.newPassword}</p>}
                  <Input
                    type='password'
                    name='newPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword || ''}
                    placeholder='New password'
                  />
                </fieldset>
                <Button icon={CheckIcon()} type='submit'>Save</Button>
              </div>
            </Form>
          </section>
    );
  }
}

const ChangeInfoComponentWithStyles = styledComponents(ChangeInfo)`${styles}`;

const formikEnhancer = withFormik<Props, IFormValues>({
  handleSubmit: (values, { props }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    props.actions.updateUser(formData);
  },
  mapPropsToValues: (props) => {
    return {
      password: '',
      newPassword: '',
    };
  },
  validate: (values: IFormValues) => {
    const errors: FormikErrors<IFormValues> = {};
    const {password, newPassword, avatar} = values;
    if (!password && !avatar && !newPassword) {
      errors.password = errors.newPassword = errors.avatar = 'One of fields required';
    }
    return errors;
  },
})(ChangeInfoComponentWithStyles);

export const SAProfilePage = connect((state: IAdminStore) => ({userInfo: state.admin.user}),
  (dispatch: ICustomDispatch): IReduxActionProps => ({
    actions: {
      updateUser: (data: FormData) => dispatch(updateUserInfoWorker({data})),
    }}),
)(formikEnhancer);
