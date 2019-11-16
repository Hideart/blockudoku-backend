import React, { Component, Fragment } from 'react';
import styledComponents from 'styled-components';
import { connect } from 'react-redux';

import { default as styles } from './styles';

import { Search } from '@/core/components/search';
import { Select, ISelectOption } from '@/core/components/select';
import { Button, ButtonTypeView } from '@/core/components/button';
import { PlusIcon, CrossIcon } from '@/core/components/icon';
import { Table, ITableSortParams } from '@/core/components/table';
import { Tabs } from '@/core/components/tabs';
import { UserLock } from '@/core/components/user-lock';

import { IAdminStore } from '@admin/models/interfaces/admin-store';
import { IChannelPartner, IChannelPartnerUpdate } from '@admin/models/interfaces/channel-partner';
import {
    getChannelPartnersWorker,
    multipleDeleteChannelPartnersWorker,
    verifyChannelPartnersWorker,
    updateChannelPartnerStatusWorker,
} from '@admin/store/channel-partner/channel-partner.action';
import { ChannelPartnerStatus } from '@admin/models/enums/channel-partner';
import { ICustomDispatch } from '@/core/models/interfaces/custom-redux-middleware';

import { IOwnProps } from '@/core/components/layout/types';
import { IReduxProps, IReduxActionProps, IOwnState } from './types';
import { dateService } from '@admin/app';
import { ChannelPartnerVerifyStatus } from '@admin/models/enums/channel-partner';

import { history } from '@admin/router/history';

import { SAPage } from '@admin/router/routes-path';
import { AppColor } from '@/core/models/enums/app-color';
import { Popup } from '@/core/components/popup';

const statusOptions = [
    { key: '', value: 'Clear filter' },
    { key: ChannelPartnerStatus.ACTIVE, value: ChannelPartnerStatus.ACTIVE },
    {
        key: ChannelPartnerStatus.INACTIVE,
        value: ChannelPartnerStatus.INACTIVE,
    },
    { key: ChannelPartnerStatus.BLOCKED, value: ChannelPartnerStatus.BLOCKED },
];
type Props = IOwnProps & IReduxProps & IReduxActionProps;
class SAHomePage extends Component<Props, IOwnState> {
    readonly state: IOwnState = {
        searchText: '',
        orderColumn: 'name',
        orderType: 'ASC',
        status: '',
        limit: 20,
        offset: 0,
        tablePaginationStep: 10,
        verifyStatus: ChannelPartnerVerifyStatus.VERIFIED,
        selectedRows: [],
        deletePopup: false,
    };

    handleSearch = () => {
        const { actions } = this.props;
        const params = this.getSearchParams();

        actions.getChannelPartners(params);
    }

    handleClick = () => {
        history.push(`${SAPage.ADD_CH_PART_PAGE}`);
    }

    handleChange = (text: string) => {
        this.setState({ searchText: text }, () => {
            this.handleSearch();
        });
    }

    getSearchParams = (): string => {
        const { searchText, limit, offset, status, orderType, orderColumn, verifyStatus } = this.state;
        const filter = {
            search: searchText,
            '$status.name$': status,
            verified: verifyStatus === ChannelPartnerVerifyStatus.VERIFIED,
        };
        let stringFilterRaw = `filter=${JSON.stringify(filter)}`;
        if (this.state.verifyStatus === ChannelPartnerVerifyStatus.NEW) {
            stringFilterRaw = 'filter={"verified":false}';
        }
        const sortString = `orderType=${orderType}&orderColumn=${orderColumn}&limit=${limit}&offset=${offset}`;

        return `${stringFilterRaw}&${sortString}`;
    }
    handleChangeStatusFilter = (data: ISelectOption) => {
        this.setState({status: data.key }, () => {
            this.handleSearch();
        });
    }
    handleSort = (data: ITableSortParams) => {
        this.setState({orderType: data.order, orderColumn: data.column }, () => {
            this.handleSearch();
        });
    }
    handleChangeStatus = (id: string, isChecked: boolean) => {
        const statusName = isChecked ? ChannelPartnerStatus.BLOCKED : ChannelPartnerStatus.ACTIVE;
        const updateData = {id, updateData: { status_name: statusName }};
        this.props.actions.updateStatus(updateData, this.getSearchParams());
    }
    handlePaymentVerifyStatusChange = (verifyStatus: any) => {
        this.setState({ verifyStatus, selectedRows: [] }, () => {
            this.handleSearch();
        });
    }
    handleVerify = () => {
        const { selectedRows } = this.state;
        this.props.actions.verifyUsers(selectedRows, this.getSearchParams());
        this.setState({selectedRows: []});
    }
    handleDelete = () => {
        const { selectedRows } = this.state;
        this.props.actions.multipleDeleteChannelPartners(selectedRows, this.getSearchParams());
        this.setState({selectedRows: [], deletePopup: false});
    }
    getTableProps = () => {
        const { orderColumn, orderType, verifyStatus, selectedRows, offset, limit } = this.state;
        const { totalChannelPartnerCount } = this.props;
        const tableSetting = {
            onRowClick: (rec: IChannelPartner) => {
                history.push(`${SAPage.EDIT_CH_PART_PAGE}/${rec.id}`);
            },
            onSort: this.handleSort,
            onPagination: (data: any) => {
                const { tablePaginationStep } = this.state;
                this.setState((state) => ({limit: state.limit + tablePaginationStep}), () => {
                    this.handleSearch();
                });

            },
            sort: {
                column: orderColumn,
                order: orderType,
                limit: {
                    start: offset,
                    end: limit,
                    step: 10,
                    total: totalChannelPartnerCount,
                },
            },
            columns: [
                {
                    label: 'Name',
                    source: 'name',
                    key: 'name',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>{rec.name}</span> :
                            <span style={{color: AppColor.black}}>{rec.name}</span>
                    ),
                },
                {
                    label: 'Profile picture',
                    onRender: (rec: IChannelPartner) => {
                        const borderColor = rec.status.name === ChannelPartnerStatus.BLOCKED ? '#E63964' : '#8ABEF8';
                        const color =
                            rec.status.name === ChannelPartnerStatus.BLOCKED ? AppColor.tableInactive : AppColor.black;
                        if (rec.avatar !== '') {
                            return (
                                <img
                                    alt='avatar'
                                    src={rec.avatar}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: `2px solid ${borderColor}`,
                                    }}
                                />
                            );
                        }
                        return <span style={{color}}>No image</span>;
                    },
                    source: 'avatar',
                    key: 'avatar',
                },
                {
                    label: 'Company',
                    source: 'company',
                    key: 'company',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>{rec.company}</span> :
                            <span style={{color: AppColor.black}}>{rec.company}</span>
                    ),
                },
                {
                    label: 'Email',
                    source: 'email',
                    key: 'email',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>{rec.email}</span> :
                            <span style={{color: AppColor.black}}>{rec.email}</span>
                    ),
                },
                {
                    label: 'Phone Number',
                    source: 'phone',
                    key: 'phone',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>{rec.phone}</span> :
                            <span style={{color: AppColor.black}}>{rec.phone}</span>
                    ),
                },
                {
                    label: 'Created',
                    onRender: (rec: IChannelPartner) => {
                        const date = dateService.defaultDateFormat(rec.createdAt);
                        if (rec.status.name === ChannelPartnerStatus.BLOCKED) {
                            return <span style={{color: AppColor.tableInactive}}>{date}</span>;
                        } else {
                            return <span style={{color: AppColor.black}}>{date}</span>;
                        }
                    },
                    key: 'createdAt',
                },
                {
                    label: 'Address',
                    key: 'address',
                    onRender: (rec: IChannelPartner) => {
                        const addressText = rec.address.length ? rec.address : 'No address was provided';
                        if (rec.status.name === ChannelPartnerStatus.BLOCKED) {
                            return <span style={{color: AppColor.tableInactive}}>{addressText}</span>;
                        } else {
                            return <span style={{color: AppColor.black}}>{addressText}</span>;
                        }
                    },
                },
                {
                    label: 'Order Price',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>{rec.order_price}</span> :
                            <span style={{color: AppColor.black}}>{rec.order_price}</span>
                    ),
                    key: 'order_price',
                },
                {
                    label: 'SMS Price',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>{rec.sms_price}</span> :
                            <span style={{color: AppColor.black}}>{rec.sms_price}</span>
                    ),
                    key: 'sms_price',
                },
                {
                    label: 'Margin %',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>{rec.margin}</span> :
                            <span style={{color: AppColor.black}}>{rec.margin}</span>
                    ),
                    key: 'margin',
                },
                {
                    label: 'Payment',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>0</span> :
                            <span style={{color: AppColor.black}}>0</span>
                    ),
                    key: 'Payment',
                },
                {
                    label: 'Next Subscription Date',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>Next Subscription Date</span> :
                            <span style={{color: AppColor.black}}>Next Subscription Date</span>
                    ),
                    key: 'next_subscription_date',
                },
                {
                    label: 'Payment method',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>Stripe</span> :
                            <span style={{color: AppColor.black}}>Stripe</span>
                    ),
                    key: 'payment_method',
                },
                {
                    label: 'Status',
                    onRender: (rec: IChannelPartner) => (
                        rec.status.name === ChannelPartnerStatus.BLOCKED ?
                            <span style={{color: AppColor.tableInactive}}>{rec.status.name}</span> :
                            <span style={{color: AppColor.black}}>{rec.status.name}</span>
                    ),
                    key: '$status.name$',
                },
                {
                    label: '',
                    onRender: (rec: IChannelPartner) => {
                        const isChecked = rec.status.name === ChannelPartnerStatus.BLOCKED;
                        return (
                            <UserLock
                                checked={isChecked}
                                onChange={value => this.handleChangeStatus(rec.id, value)}
                            />
                        );
                    },
                    key: 'custom-column',
                    isFixed: true,
                },
            ],
        };
        if (verifyStatus === ChannelPartnerVerifyStatus.NEW) {
            return {
                ...tableSetting,
                onSelect: (data: any) => {
                    this.setState({selectedRows: [...data]});
                },
                selectedRecs: selectedRows,
            };
        }

        return tableSetting;
    }
    render() {
        const { verifyStatus, selectedRows, deletePopup } = this.state;
        const { className, channelPartners } = this.props;
        return (
            <section className={className}>
                <section className='channel-partner__top-tools'>
                    {verifyStatus === ChannelPartnerVerifyStatus.VERIFIED &&
                        <Fragment>
                            <div className='channel-partner__search'>
                                <Search onChange={this.handleChange} />
                            </div>
                            <div className='channel-partner__filters'>
                                <div className='channel-partner__select'>
                                    <Select
                                        placeholder='Status'
                                        options={statusOptions}
                                        onChange={this.handleChangeStatusFilter}
                                    />
                                </div>
                                <div className='channel-partner__button'>
                                    <Button
                                        view={ButtonTypeView.MAIN}
                                        icon={PlusIcon()}
                                        onClick={() => this.handleClick()}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </Fragment>
                    }
                    {verifyStatus === ChannelPartnerVerifyStatus.NEW &&
                        <Fragment>
                            <div className='channel-partner__filters'>
                                <div className='channel-partner__button'>
                                    <Button
                                        view={ButtonTypeView.MAIN}
                                        icon={PlusIcon()}
                                        onClick={this.handleVerify}
                                        disabled={selectedRows.length === 0}
                                    >
                                        Verify
                                    </Button>
                                </div>
                                <div className='channel-partner__button'>
                                    <Button
                                        view={ButtonTypeView.SECOND}
                                        icon={CrossIcon()}
                                        disabled={selectedRows.length === 0}
                                        onClick={() => this.setState({deletePopup: true})}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Fragment>
                    }
                </section>
                <section>
                    <Tabs
                        defaultSelect={verifyStatus}
                        tabs={[
                            { key: ChannelPartnerVerifyStatus.VERIFIED, label: 'Verified' },
                            { key: ChannelPartnerVerifyStatus.NEW, label: 'New' },
                        ]}
                        onTabChange={this.handlePaymentVerifyStatusChange}
                    />
                    <Table<IChannelPartner>
                        data={channelPartners}
                        {...this.getTableProps()}
                    />
                </section>
                    <Popup
                        title='Do you really want to delete selected entries?'
                        onClose={() => this.setState({deletePopup: false})}
                        visible={deletePopup}
                    >
                        <Button style={{marginRight: 20}} onClick={this.handleDelete}>Confirm</Button>
                        <Button view={ButtonTypeView.SECOND} onClick={() => this.setState({deletePopup: false})}>
                            Cancel
                        </Button>
                    </Popup>
            </section>
        );
    }
}

export const SAChannelPartnersPageWithStyle = styledComponents(
    SAHomePage,
)`${styles}`;

export const SAChannelPartnersPage = connect(
    (state: IAdminStore) => ({
        channelPartners: state.cp.channelPartners,
        totalChannelPartnerCount: state.cp.count,
        notVerifiedUsers: state.cp.notVerifiedUsers,
    }),
    (dispatch: ICustomDispatch): IReduxActionProps => ({
        actions: {
            getChannelPartners: (option?: any) =>
                dispatch(getChannelPartnersWorker({searchOption: option })),
            multipleDeleteChannelPartners: (ids: string[], searchOption: string) =>
                dispatch(multipleDeleteChannelPartnersWorker({ ids, searchOption })),
            verifyUsers: (ids: string[], searchOption: string) =>
                dispatch(verifyChannelPartnersWorker({ ids, searchOption })),
            updateStatus: (cpData: IChannelPartnerUpdate, searchOption: string) =>
                dispatch(updateChannelPartnerStatusWorker({ cpData, searchOption })),
        },
    }),
)(SAChannelPartnersPageWithStyle);
