import React, { Component } from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';

import { ImagePicker } from '@/core/components/image-picker';
import { Input } from '@/core/components/input';
import { Button } from '@/core/components/button';

import { default as styles } from './styles';

import { CheckIcon } from '@/core/components/icon';
import { RouteComponentProps } from 'react-router';
import {
  getChannelPartnerByIdWorker,
  updateChannelPartnerWorker,
} from '@admin/store/channel-partner/channel-partner.action';
import { IAdminStore } from '@admin/models/interfaces/admin-store';
import { IChannelPartnerUpdate } from '@admin/models/interfaces/channel-partner';
import { checkFormChange, cardDataFormat } from '@/core/helpers/forms.helper';

import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

import {
  IOwnProps,
  IReduxActionProps,
  IReduxProps,
  IEditChannelPartnerPage,
  IOwnState,
} from './types';

interface IFormValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  order_price: number;
  margin: number;
  sms_price: number;
  [key: string]: string | File | number | boolean;
}

type Props =
  IReduxProps &
  IReduxActionProps &
  IOwnProps &
  FormikProps<IFormValues> &
  RouteComponentProps<{id: string}>;

class EditChannelPartner extends Component<Props, IOwnState> implements IEditChannelPartnerPage {

  readonly state: IOwnState = {
    isFormChanged: false,
  };

  handleChange = (avatar: File) => {
    const { setFieldValue } = this.props;
    setFieldValue('avatar', avatar);
    this.setState({ isFormChanged: true });
  }

  handleInputChange = (field: string) => (e: React.ChangeEvent<Element>) => {
    const value = (e.currentTarget as HTMLInputElement).value;

    const { userInfo, values } = this.props;
    const newValues = {...values, [field]: value};

    const checkFields: string[] = [
      'name',
      'email',
      'company',
      'phone',
      'address',
      'order_price',
      'sms_price',
      'margin',
    ];

    if (checkFormChange(newValues, userInfo, checkFields)) {
      this.setState({ isFormChanged: true });
    } else {
      this.setState({ isFormChanged: false });
    }

    this.props.setFieldValue(field, value);
  }

  render() {
    const { isFormChanged } = this.state;
    const {
      className,
      values,
      handleBlur,
      touched,
      errors,
      userInfo,
    } = this.props;

    return (
      <section className={`${className} edit-channel-part`}>
        <Form className='edit-channel-part__content'>
          <ImagePicker
            isLoading={false}
            onDrop={this.handleChange}
            currentImage={userInfo.avatar ? userInfo.avatar : ''}
          />
          <div className='edit-channel-part__wrap'>
            <fieldset>
              {touched.name && errors.name && <p className='edit-channel-part__error'>{errors.name}</p>}
              <Input
                type='text'
                name='name'
                onChange={this.handleInputChange('name')}
                onBlur={handleBlur}
                value={values.name || ''}
                placeholder='Name'
              />
            </fieldset>
            <fieldset>
              {touched.email && errors.email && <p className='edit-channel-part__error'>{errors.email}</p>}
              <Input
                type='email'
                name='email'
                onChange={this.handleInputChange('email')}
                onBlur={handleBlur}
                value={values.email || ''}
                placeholder='Email'
              />
            </fieldset>
            <fieldset>
              {touched.company && errors.company && <p className='edit-channel-part__error'>{errors.company}</p>}
              <Input
                type='text'
                name='company'
                onChange={this.handleInputChange('company')}
                onBlur={handleBlur}
                value={values.company || ''}
                placeholder='Company name'
              />
            </fieldset>
            <fieldset>
              {touched.phone && errors.phone && <p className='change-info__error'>{errors.phone}</p>}
              <Input
                type='text'
                name='phone'
                onChange={this.handleInputChange('phone')}
                onBlur={handleBlur}
                value={values.phone || ''}
                placeholder='Phone number'
              />
            </fieldset>
            <fieldset>
              {touched.address && errors.address && <p className='change-info__error'>{errors.address}</p>}
              <Input
                type='text'
                name='address'
                onChange={this.handleInputChange('address')}
                onBlur={handleBlur}
                value={values.address || ''}
                placeholder='Address'
              />
            </fieldset>
              <p className='edit-channel-part__subtitle'>Subscription Rate Setup</p>
            <fieldset>
              {touched.order_price && errors.order_price && <p className='change-info__error'>
                {errors.order_price}
              </p>}
              <Input
                type='number'
                name='order_price'
                onChange={this.handleInputChange('order_price')}
                onBlur={handleBlur}
                value={values.order_price || ''}
                placeholder='Order price'
              />
            </fieldset>
            <fieldset>
              {touched.margin && errors.margin && <p className='change-info__error'>{errors.margin}</p>}
              <Input
                type='number'
                name='margin'
                onChange={this.handleInputChange('margin')}
                onBlur={handleBlur}
                value={values.margin || ''}
                placeholder='SMS Margin %'
              />
            </fieldset>
            <fieldset>
              {touched.sms_price && errors.sms_price && <p className='change-info__error'>{errors.sms_price}</p>}
              <Input
                type='number'
                name='sms_price'
                onChange={this.handleInputChange('sms_price')}
                onBlur={handleBlur}
                value={values.sms_price || ''}
                placeholder='SMS Price'
              />
            </fieldset>
            <Button disabled={!isFormChanged} icon={CheckIcon()} type='submit'>Save</Button>
          </div>
        </Form>
        <section className='edit-channel-part__payment-list'>
          {userInfo.cards.map(card => (
            <section key={card.id} className='edit-channel-part__payment'>
              <p className='edit-channel-part__payment-title'>Payment Method</p>
              <fieldset>
                <Input
                      type='text'
                      name='paymentMethod'
                      onChange={this.handleInputChange('name')}
                      onBlur={handleBlur}
                      value={`${card.brand} | ${cardDataFormat(card)}`}
                      disabled={true}
                      placeholder='Card'
                />
              </fieldset>
            </section>
          ))}
        </section>
      </section>
    );
  }
}

const EditChannelPartnerWithStyles = styledComponents(EditChannelPartner)`${styles}`;

const formikEnhancer = withFormik<Props, IFormValues>({
  handleSubmit: (values, { props }) => {
    props.actions.updateUser({id: props.match.params.id, updateData: {...values}} as IChannelPartnerUpdate);
  },
  mapPropsToValues: (props) => {
    return {
      name: props.userInfo.name,
      email: props.userInfo.email,
      company: props.userInfo.company,
      phone: props.userInfo.phone,
      address: props.userInfo.address,
      order_price: props.userInfo.order_price,
      margin: props.userInfo.margin,
      sms_price: props.userInfo.sms_price,
    };
  },
  validate: (values: IFormValues, props: Props) => {
    const errors: FormikErrors<IFormValues> = {};
    return errors;
  },
})(EditChannelPartnerWithStyles);

export const SAeditChannelPartnerPage = connect(
  (state: IAdminStore) => ({userInfo: state.cp.channelPartner}),
  (dispatch: ICustomDispatch): IReduxActionProps => ({
    actions: {
      getUserInfo: (id: string) => dispatch(getChannelPartnerByIdWorker({id})),
      updateUser: (data: IChannelPartnerUpdate) => dispatch(updateChannelPartnerWorker({cpData: data})),
    }}),
)(formikEnhancer);
