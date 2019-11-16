import actionCreatorFactory from 'typescript-fsa';

import { apiCallWrapper } from '@admin/app';
import { default as HttpStatusCode } from '@/core/models/enums/http-status-code';
import { HttpMethod } from '@/core/models/enums/http-method';

import {
    IChannelPartner,
    IChannelPartnerUpdate,
    IChannelPartnerInvite,
} from '@admin/models/interfaces/channel-partner';
import { saConfig } from '@/client-config/super-admin.config';

import { IAdminStore } from '@admin/models/interfaces/admin-store';
import { LocalStorageService } from '@/core/services/local-storage.service';
import { AdminLocalStorage } from '@admin/models/enums/admin-local-storage';
import { IPaginationResponse } from '@/core/models/interfaces/pagination-response';
import {
    getChannelPartnersEffect,
    saveReportFileEffect,
} from './channel-partner.effects';

import { IAsyncActionWorker, IAsyncWorkerEffects } from '@/core/models/interfaces/custom-redux-middleware';

const actionCreator = actionCreatorFactory();

const localStorageService = new LocalStorageService();

export const getChannelPartners =
    actionCreator.async<{}, IPaginationResponse<IChannelPartner>, {}>('GET_CHANNEL_PARTNERS');

export const getChannelPartnerById =
    actionCreator.async<string, IChannelPartner, {}>('GET_CHANNEL_PARTNER_BY_ID');

export const updateChannelPartner =
    actionCreator.async<IChannelPartnerUpdate, IChannelPartner, {}>('UPDATE_CHANNEL_PARTNER');

export const inviteChannelPartner =
    actionCreator.async<IChannelPartnerInvite, { email: string }, {}>('MULTIPLE_DELETE_CHANNEL_PARTNERS');

export const multipleDeleteChannelPartners =
    actionCreator.async<{ids: string[]}, {}, {}>('INVITE_CHANNEL_PARTNER');

export const verifyChannelPartners =
    actionCreator.async<{ ids: string[] }, { notVerifiedIds: string[] }, {}>('VERIFY_CHANNEL_PARTNERS');
export const reportAboutChannelPartners =
    actionCreator.async<{ ids: string[] }, {}, {}>('REPORT_ABOUT_CHANNEL_PARTNERS');

export const getChannelPartnersWorker  =
  ({ searchOption, effects }: {searchOption: any} & IAsyncWorkerEffects): IAsyncActionWorker => {
    let url = `${saConfig.apiUrl}/channel-partners`;
    if (searchOption) {
        url = `${saConfig.apiUrl}/channel-partners?${searchOption}`;
    }

    return {
      params: { searchOption },
      types: getChannelPartners,
      worker: () => apiCallWrapper.wrap<IChannelPartner[]>({
        method: HttpMethod.GET,
        url: url,
        headers: {
            Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
        },
        notification: {
            messageBeforeStart: 'Please wait, channel partners are loading!',
            statusHandler: [
                {
                    statusCode: HttpStatusCode.OK,
                    message: 'Channel partners have been loaded!',
                },
                {
                    statusCode: HttpStatusCode.NOT_FOUND,
                    message: 'Channel partners not found!',
                },
            ],
        },
      }),
      effects: {
        ...effects,
      },
  };
};

export const getChannelPartnerByIdWorker  =
  ({ id, effects }: {id: string} & IAsyncWorkerEffects): IAsyncActionWorker => {
    const url = `${saConfig.apiUrl}/channel-partners/${id}`;

    return {
      params: { id },
      types: getChannelPartnerById,
      worker: () => apiCallWrapper.wrap<IChannelPartner>({
        method: HttpMethod.GET,
        url: url,
        headers: {
            Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
        },
        notification: {
            messageBeforeStart: 'Loading info!',
            statusHandler: [
                {
                    statusCode: HttpStatusCode.OK,
                    message: 'Channel partner info loaded!',
                },
                {
                    statusCode: HttpStatusCode.NOT_FOUND,
                    message: 'Channel partner not found!',
                },
            ],
        },
      }),
      effects: {
        ...effects,
      },
  };
};

export const updateChannelPartnerWorker  =
    ({ cpData, effects }: {cpData: IChannelPartnerUpdate } & IAsyncWorkerEffects): IAsyncActionWorker => {
    let formData: any = new FormData();
    Object.keys(cpData.updateData).forEach((key) => (formData.append(key, cpData.updateData[key] as string)));

    // For test stripe
    if (cpData.updateData.stripeToken) {
      formData = {stripeToken: cpData.updateData.stripeToken};
    }

    return {
      params: { cpData },
      types: updateChannelPartner,
      worker: () => apiCallWrapper.wrap<IChannelPartner>({
        method: HttpMethod.PUT,
        url: `${saConfig.apiUrl}/channel-partners/${cpData.id}`,
        data: formData,
        headers: {
            Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
        },
        notification: {
            messageBeforeStart: 'Please wait, channel partners are loading!',
            statusHandler: [
                {
                    statusCode: HttpStatusCode.OK,
                    message: 'Successfully updated',
                },
                {
                    statusCode: HttpStatusCode.NOT_FOUND,
                    message: 'Wrong channel partner\'s data',
                },
                {
                    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: 'Something went wrong',
                },
                {
                  statusCode: HttpStatusCode.BAD_REQUEST,
                  message: 'Something went wrong',
                },
            ],
        },
      }),
      effects: {
        ...effects,
      },
    };
  };

export const inviteChannelPartnerWorker  =
  ({ email, effects }: IChannelPartnerInvite & IAsyncWorkerEffects): IAsyncActionWorker => {

  return {
    params: { email },
    types: inviteChannelPartner,
    worker: () => apiCallWrapper.wrap<IChannelPartner>({
      method: HttpMethod.POST,
      url: `${saConfig.apiUrl}/channel-partners/invite`,
      data: { email },
      headers: {
          Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
      },
      notification: {
          messageBeforeStart: 'Please wait, partner invite are sending..',
          statusHandler: [
              {
                  statusCode: HttpStatusCode.NO_CONTENT,
                  message: 'Partner invite successfully sent!',
              },
              {
                  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                  message: 'Something went wrong',
              },
          ],
      },
    }),
    effects: {
      ...effects,
    },
  };
};

export const verifyChannelPartnersWorker  =
    ({ ids, searchOption, effects }:
    {ids: string[], searchOption: string} & IAsyncWorkerEffects): IAsyncActionWorker => {

    return {
      params: { searchOption },
      types: verifyChannelPartners,
      worker: () => apiCallWrapper.wrap<IChannelPartner>({
        method: HttpMethod.POST,
        url: `${saConfig.apiUrl}/channel-partners/verify`,
        data: { ids },
        headers: {
            Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
        },
        notification: {
            messageBeforeStart: 'Please wait, channel partners are verified',
            statusHandler: [
                {
                    statusCode: HttpStatusCode.OK,
                    message: 'Verification completed',
                },
                {
                    statusCode: HttpStatusCode.BAD_REQUEST,
                    message: 'IDs are wrong',
                },
            ],
        },
      }),
      effects: {
        done: getChannelPartnersEffect,
        ...effects,
      },
    };
  };

export const reportAboutChannelPartnersWorker  =
    ({ ids, effects }: {ids: string[]} & IAsyncWorkerEffects): IAsyncActionWorker => {

    return {
      params: { ids },
      types: reportAboutChannelPartners,
      worker: () => apiCallWrapper.wrap<IChannelPartner>({
        method: HttpMethod.POST,
        url: `${saConfig.apiUrl}/channel-partners/report-xlsx`,
        headers: {
            Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
        },
        data: { ids },
        notification: {
            messageBeforeStart: 'Please wait, report is generating',
            statusHandler: [
                {
                    statusCode: HttpStatusCode.OK,
                    message: 'Report have generated',
                },
                {
                    statusCode: HttpStatusCode.BAD_REQUEST,
                    message: 'IDs are wrong',
                },
            ],
        },
      }),
      effects: {
        done: saveReportFileEffect,
        ...effects,
      },
    };
  };

export const multipleDeleteChannelPartnersWorker  =
    ({ ids, searchOption, effects }:
    {ids: string[], searchOption: string} & IAsyncWorkerEffects): IAsyncActionWorker => {

    return {
      params: { searchOption },
      types: multipleDeleteChannelPartners,
      worker: () => apiCallWrapper.wrap<IChannelPartner>({
        method: HttpMethod.DELETE,
        url: `${saConfig.apiUrl}/channel-partners/`,
        data: { ids },
        headers: {
            Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
        },
        notification: {
            messageBeforeStart: 'Please wait, channel partners are deleted',
            statusHandler: [
                {
                    statusCode: HttpStatusCode.NO_CONTENT,
                    message: 'Channel partners deleting success!',
                },
            ],
        },
      }),
      effects: {
        done: getChannelPartnersEffect,
        ...effects,
      },
    };
  };

export const updateChannelPartnerStatusWorker =
  ({
    cpData,
    searchOption,
    effects,
  }: {
    cpData: IChannelPartnerUpdate,
    searchOption: string,
  } & IAsyncWorkerEffects): IAsyncActionWorker => {

    return {
      params: { cpData, searchOption },
      types: multipleDeleteChannelPartners,
      worker: () => apiCallWrapper.wrap<IChannelPartner>({
        method: HttpMethod.PUT,
        url: `${saConfig.apiUrl}/channel-partners/${cpData.id}`,
        data: cpData.updateData,
        headers: {
            Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
        },
        notification: {
            messageBeforeStart: 'Please wait, channel partners are loading!',
            statusHandler: [
                {
                    statusCode: HttpStatusCode.OK,
                    message: 'Successfully updated',
                },
                {
                    statusCode: HttpStatusCode.NOT_FOUND,
                    message: 'Wrong channel partner\'s data',
                },
                {
                    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: 'Something went wrong',
                },
            ],
        },
      }),
      effects: {
        done: getChannelPartnersEffect,
        ...effects,
      },
    };
  };

export const getChannelPartnerState = (store: IAdminStore) => store.cp;
