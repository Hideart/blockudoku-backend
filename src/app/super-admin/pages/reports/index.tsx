import React, { Component } from 'react';
import styledComponents from 'styled-components';
import { connect } from 'react-redux';

import { default as styles } from './styles';
import { AppColor } from '@/core/models/enums/app-color';

import { CustomDatepicker } from '@/core/components/datepicker';
import { Button, ButtonTypeView } from '@/core/components/button';
import { Table } from '@/core/components/table';

import { SortIcon, ExportIcon } from '@/core/components/icon';
import { IAdminStore } from '@admin/models/interfaces/admin-store';
import { dateService } from '@admin/app';
import { reportAboutChannelPartnersWorker } from '@admin/store/channel-partner/channel-partner.action';

import {
  IOwnProps,
} from '@/core/components/layout/types';
import { IOwnState, IReduxProps, IReduxActionProps } from './types';
import { IChannelPartner } from '@admin/models/interfaces/channel-partner';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

type Props = IOwnProps & IReduxProps & IReduxActionProps;
class ReportsPage extends Component<Props, IOwnState> {
  readonly state: IOwnState = {
    selectedRows: [],
  };

  handleReport = () => {
    const { actions } = this.props;
    const { selectedRows } = this.state;
    actions.generateReport(selectedRows);
  }
  render() {
    const { className, channelPartners } = this.props;
    const { selectedRows } = this.state;

    const tableSetting = {
      onSort: (data: any) => {
        console.log('sort');
        console.log(data);
      },
      onPagination: (data: any) => {
        console.log('pagination');
        console.log(data);
      },
      onSelect: (data: string[]) => {
        this.setState({selectedRows: [...data]});
      },
      selectedRecs: selectedRows,
      sort: {
        column: 'name',
        order: 'ASC',
        limit: {
          start: 0,
          end: 100,
          step: 10,
          total: 100,
        },
      },
      columns: [{
        label: 'Channel Partner',
        source: 'name',
        key: 'channel_partner',
        // onRender: (rec: IChannelPartner) => <span>{rec.name}</span>
      },
      {
        label: 'Registered Date',
        // source: 'date_registered',
        key: 'date_registered',
        onRender: (rec: IChannelPartner) => <span>{dateService.defaultDateFormat(rec.createdAt)}</span>,
      },
      {
        label: `avr. Sub. Payment`,
        // source: 'average_sub_payment',
        key: 'average_sub_payment',
        onRender: (rec: IChannelPartner) => <span>1</span>,
      },
      {
        label: 'Subscription',
        // source: 'date_subscription',
        key: 'date_subscription',
        onRender: (rec: IChannelPartner) => <span>1</span>,
      },
      {
        label: 'Active SP',
        // source: 'sp_active',
        key: 'sp_active',
        onRender: (rec: IChannelPartner) => <span>0</span>,
      },
      {
        label: 'Inactive SP',
        // source: 'sp_inactive',
        key: 'sp_inactive',
        onRender: (rec: IChannelPartner) => <span>0</span>,
      },
      {
        label: 'Total Orders',
        // source: 'total_orders',
        key: 'total_orders',
        onRender: (rec: IChannelPartner) => <span>0</span>,
      },
      {
        label: 'Total SMS',
        // source: 'total_sms',
        key: 'total_sms',
        onRender: (rec: IChannelPartner) => <span>0</span>,
      },
      {
        label: 'Payment till date',
        // source: 'total_payment_till_date',
        key: 'total_payment_till_date',
        onRender: (rec: IChannelPartner) => <span>{dateService.defaultDateFormat((new Date()).toString())}</span>,
      },
      {
        label: 'Payment Method',
        // source: 'payment_method',
        key: 'payment_method',
        onRender: (rec: IChannelPartner) => <span>Stripe</span>,
      },
      ],
      data: channelPartners,
    };
    // console.log(selectedRows);
    return (
      <section className={`${className} reports`}>
        <section className='reports__top-tools'>
          <CustomDatepicker />
          <Button view={ButtonTypeView.SECOND} icon={SortIcon({ color: AppColor.blue })}>
            Filter
          </Button>
          <Button
            disabled={selectedRows.length === 0}
            onClick={this.handleReport}
            view={ButtonTypeView.MAIN}
            icon={ExportIcon()}
          >
            Export
          </Button>
        </section>
        <section>
          <Table {...tableSetting} />

        </section>
      </section>
    );
  }
}

export const SAReportsPageWithStyle = styledComponents(ReportsPage)`${styles}`;

export const SAReportsPage = connect(
  (state: IAdminStore) => ({
      channelPartners: state.cp.channelPartners,
      totalChannelPartnerCount: state.cp.count,
  }),
  (dispatch: ICustomDispatch): IReduxActionProps => ({
      actions: {
        generateReport: (ids: string[]) =>
            dispatch(reportAboutChannelPartnersWorker({ ids })),
      },
  }),
)(SAReportsPageWithStyle);
