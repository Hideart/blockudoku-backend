import actionCreatorFactory from 'typescript-fsa';

import { apiCallWrapper } from '@admin/app';
import { default as HttpStatusCode } from '@/core/models/enums/http-status-code';
import { HttpMethod } from '@/core/models/enums/http-method';

import { IAdmin } from '@admin/models/interfaces/admin';
import { saConfig } from '@/client-config/super-admin.config';
import { IUserLogin, IResetPassword, IUpdatePassword } from '@/core/models/interfaces/user';
import { IAsyncActionWorker, IAsyncWorkerEffects } from '@/core/models/interfaces/custom-redux-middleware';

import {
    adminEffectLoginSuccess,
    adminEffectUpdateInfoSuccess,
    adminEffectUpdatePasswordSuccess,
} from './admin.effect';
import { IAdminStore, IChangePasswordStore, IUserInfoUpdateStore } from '@admin/models/interfaces/admin-store';
import { LocalStorageService } from '@/core/services/local-storage.service';
import { AdminLocalStorage } from '@admin/models/enums/admin-local-storage';

const actionCreator = actionCreatorFactory();

export const adminLogin = actionCreator.async<IUserLogin, {token: string, user: IAdmin}, {}>('ADMIN_LOGIN');

export const adminLoginInitial = actionCreator<IAdmin>('ADMIN_LOGIN_INITIAL');

export const resetPassword = actionCreator.async<IResetPassword, {email: string}>('ADMIN_RESET_PASSWORD');

export const updatePassword =
    actionCreator.async<IUpdatePassword, {resetPasswordToken: string, password: string}>('ADMIN_UPDATE_PASSWORD');

export const updateUserInfo =
    actionCreator.async<FormData, IAdmin>('ADMIN_INFO_UPDATE');

export const newLoginWorker = ({ email, password, effects }: IUserLogin & IAsyncWorkerEffects): IAsyncActionWorker => {

    return {
        params: { email, password },
        types: adminLogin,
        worker: () =>  apiCallWrapper.wrap<IAdmin>({
            method: HttpMethod.POST,
            data: {email, password},
            url: `${saConfig.apiUrl}/admin/auth`,
            notification: {
                statusHandler: [
                    {
                        statusCode: HttpStatusCode.OK,
                        message: 'You have succesfull login!',
                    },
                    {
                        statusCode: HttpStatusCode.BAD_REQUEST,
                        message: 'Wrong email or password!',
                    },
                ],
            },
        }),
        effects: {
          done: adminEffectLoginSuccess,
          ...effects,
        },
    };
};

export const getAdminState = (store: IAdminStore) => store.admin;

export const resetPasswordWorker = ({ email, effects }: {email: string } & IAsyncWorkerEffects): IAsyncActionWorker => {
  return {
    params: { email },
    types: resetPassword,
    worker: () =>  apiCallWrapper.wrap<IAdmin>({
      method: HttpMethod.POST,
      data: { email },
      url: `${saConfig.apiUrl}/admin/reset-password`,
      notification: {
        messageBeforeStart: 'Please wait',
        statusHandler: [
            {
                statusCode: HttpStatusCode.NO_CONTENT,
                message: 'Confirmation mail sent',
            },
            {
                statusCode: HttpStatusCode.NOT_FOUND,
                message: 'Wrong user E-Mail',
            },
        ],
    },
    }),
    effects: {
      done: adminEffectLoginSuccess,
      ...effects,
    },
  };
};
export const getResetPasswordState = (store: IChangePasswordStore) => store.status;

export const updatePasswordWorker =
  ({ resetPasswordToken, password, effects }: IUpdatePassword & IAsyncWorkerEffects): IAsyncActionWorker => {
  return {
    params: { resetPasswordToken, password },
    types: updatePassword,
    worker: () => apiCallWrapper.wrap<IAdmin>({
      method: HttpMethod.POST,
      data: { resetPasswordToken, password },
      url: `${saConfig.apiUrl}/admin/update-password`,
      notification: {
          messageBeforeStart: 'Please wait',
          statusHandler: [
              {
                  statusCode: HttpStatusCode.NO_CONTENT,
                  message: 'Password change is successful',
              },
              {
                  statusCode: HttpStatusCode.BAD_REQUEST,
                  message: 'Wrong reset password token',
              },
          ],
      },
    }),
    effects: {
      done: adminEffectUpdatePasswordSuccess,
      ...effects,
    },
  };
};

export const getUpdatePasswordState = (store: IChangePasswordStore) => store.status;

const localStorageService = new LocalStorageService();

export const updateUserInfoWorker  =
  ({ data, effects }: {data: FormData} & IAsyncWorkerEffects): IAsyncActionWorker => {
    return {
      params: { data },
      types: updateUserInfo,
      worker: () => apiCallWrapper.wrap<IAdmin>({
        method: HttpMethod.PUT,
        data,
        url: `${saConfig.apiUrl}/admin/me`,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorageService.getItem(AdminLocalStorage.TOKEN)}`,
        },
        notification: {
          messageBeforeStart: 'Please wait',
          statusHandler: [
              {
                  statusCode: HttpStatusCode.OK,
                  message: 'Update user info is successful',
              },
              {
                  statusCode: HttpStatusCode.BAD_REQUEST,
                  message: 'Something went wrong',
              },
          ],
      },
    }),
    effects: {
      done: adminEffectUpdateInfoSuccess,
      ...effects,
    },
  };
};

export const getUpdateUserInfoState = (store: IUserInfoUpdateStore) => store.user;
