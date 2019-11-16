import { LocalStorageService } from '@/core/services/local-storage.service';
import { IEffect } from '@/core/models/types/effect';

import { AdminLocalStorage } from '@admin/models/enums/admin-local-storage';
import { history } from '@admin/router/history';
import { IAdmin } from '@admin/models/interfaces/admin';
import { SAPage } from '@admin/router/routes-path';

const localStorageService = new LocalStorageService();
import { IAdminStore } from '@admin/models/interfaces/admin-store';

export const adminEffectLoginSuccess:
  IEffect<{result: {token: string, user: IAdmin }}, IAdminStore> = ({ result, dispatch, getState }) => {
    localStorageService.setItem(AdminLocalStorage.TOKEN, result.token);
    localStorageService.setItem(AdminLocalStorage.USER, btoa(JSON.stringify(result.user)));
    history.push(SAPage.DASHBORD_PAGE);
};

export const adminEffectUpdateInfoSuccess: IEffect<{result: IAdmin}> = ({ result }) => {
    localStorageService.setItem(AdminLocalStorage.USER, btoa(JSON.stringify(result)));
};

export const adminEffectUpdatePasswordSuccess: IEffect<{}> = () => {
    history.push(SAPage.DASHBORD_PAGE);
};
