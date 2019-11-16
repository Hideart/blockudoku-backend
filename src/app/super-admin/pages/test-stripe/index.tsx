import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
  IReduxActionProps,
  IChangeInfoPage,
} from './types';

import { IAdminStore } from '@admin/models/interfaces/admin-store';
import { StripeProvider, Elements, CardElement, ReactStripeElements, injectStripe } from 'react-stripe-elements';
import { updateChannelPartnerWorker } from '../../store/channel-partner/channel-partner.action';
import { RouteComponentProps } from 'react-router';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

type Props =
  {apiKey?: string, stripe?: stripe.Stripe | null} &
  ReactStripeElements.InjectedStripeProps &
  IReduxActionProps & RouteComponentProps<{cpId: string}>;

class CardFormLayout extends React.Component<Props> {

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(
          (payload) => {
            if (!payload.error) {
              this.props.actions!.updateChannelPartner(
                { id: this.props.match.params.cpId, updateData: {stripeToken: payload.token} },
              );
            }
          },
        );
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <br /><br />
        <CardElement />
        <br /><br />
        <button type='submit'>Confirm</button>
      </form>
    );
  }
}
const CardFormStripe = injectStripe(CardFormLayout);

export const CardForm = connect((state: IAdminStore) => ({userInfo: state.admin.user}),
  (dispatch: ICustomDispatch): IReduxActionProps => ({
    actions: {
      updateChannelPartner: (data: any) => dispatch(updateChannelPartnerWorker({cpData: data})),
    }}),
)(CardFormStripe);

type HOCProps = {className?: string} & RouteComponentProps<{cpId: string}>;

class StripeTestLayout extends Component<HOCProps> implements IChangeInfoPage  {

  render() {
    return (
      <section className={`${this.props.className} change-info`} style={{maxWidth: '400px'}}>
        <StripeProvider apiKey='pk_test_jgE7EyfsQ6mJOo3MVDz4dLaD0078lEN2Ik'>
          <Elements>
            <CardForm {...this.props} />
          </Elements>
        </StripeProvider>
      </section>
    );
  }
}

export const StripeTestPage = styledComponents(StripeTestLayout)`${styles}`;
