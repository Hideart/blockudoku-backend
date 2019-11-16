import React, { Component } from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';

import { Input } from '@/core/components/input';
import { Button, ButtonTypeView } from '@/core/components/button';

import { inviteChannelPartnerWorker } from '@admin/store/channel-partner/channel-partner.action';
import { history } from '@admin/router/history';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

import { default as styles } from './styles';

import {
  IOwnProps,
  IReduxActionProps,
  IReduxProps,
} from './types';

import { ExportIcon, CancelIcon } from '@/core/components/icon';
import { IChannelPartnerInvite } from '@admin/models/interfaces/channel-partner';
import { AppColor } from '@/core/models/enums/app-color';
import { SAPage } from '../../router/routes-path';

interface IFormValues {
  email: string;
}

type Props = IReduxProps & IReduxActionProps & IOwnProps & FormikProps<IFormValues>;
class AddPartner extends Component<Props> {

  handleCancelClick = () => {
    history.push(`${SAPage.CHANNEL_PARTNERS_PAGE}`);
  }

  render() {
    const {
      className,
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
      isSubmitting,
    } = this.props;

    return (
      <section className={`${className} add-partner`}>
        <Form className='add-partner__content'>
          <fieldset>
            {touched.email && errors.email && <p className='add-partner__error'>{errors.email}</p>}
            <Input
              type='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email || ''}
              placeholder='Email'
            />
          </fieldset>
          <Button
            icon={ExportIcon({ color: AppColor.blue })}
            view={ButtonTypeView.SECOND}
            disabled={isSubmitting}
            type='submit'
          >Send invitation
          </Button>
          <Button
            icon={CancelIcon()}
            onClick={() => this.handleCancelClick()}
            type='button'
          >Cancel
          </Button>
        </Form>
      </section>
    );
  }
}

const AddPartnerWithStyles = styledComponents(AddPartner)`${styles}`;

const formikEnhancer = withFormik<Props, IFormValues>({
  handleSubmit: async (values, form) => {
    await form.props.actions.sendInvite(values);
    form.resetForm();
  },
  validate: (values: IFormValues) => {
    const errors: FormikErrors<IFormValues> = {};
    const { email } = values;
    if (!email) {
      errors.email = 'One of fields required';
    }
    return errors;
  },
})(AddPartnerWithStyles);

export const SAAddPartnerPage = connect(null,
  (dispatch: ICustomDispatch): IReduxActionProps => ({
    actions: {
      sendInvite: ({ email }: IChannelPartnerInvite) => dispatch(inviteChannelPartnerWorker({ email })),
    },
  }),
)(formikEnhancer);
