import { IResolver } from '@/core/models/interfaces/custom-route';
import { LocalStorageService } from '@/core/services/local-storage.service';
import { AdminLocalStorage } from '@admin/models/enums/admin-local-storage';
import { store } from '@admin/store';
import { adminLoginInitial } from '@admin/store/admin/admin.action';
const localStorageService = new LocalStorageService();

export class AdminLoginResolver implements IResolver {
    Resolve(): void {
        const { user } = store.getState().admin;
        if (user.first_name !== null) {
          return;
        }
        const userRaw = localStorageService.getItem(AdminLocalStorage.USER);
        if (userRaw) {
          const decoded = JSON.parse(atob(userRaw));
          store.dispatch(adminLoginInitial(decoded));
        }
        // const dispatch = store.dispatch as ICustomDispatch;
        // dispatch(newLoginWorker({email: 'eugene@wellyes.ru', password: '123456'}));
    }
}
