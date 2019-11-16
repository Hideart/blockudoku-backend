import { IGuard } from '@/core/models/interfaces/custom-route';
import { LocalStorageService } from '@/core/services/local-storage.service';
import { AdminLocalStorage } from '@admin/models/enums/admin-local-storage';
import jwtDecode from 'jwt-decode';

const localStorageService = new LocalStorageService();

export class AdminLoginGuard implements IGuard {
    CanActivate(): boolean {
        const userToken = localStorageService.getItem(AdminLocalStorage.TOKEN);
        if (!userToken) {
            return false;
        }

        const userRaw = localStorageService.getItem(AdminLocalStorage.USER);
        if (!userRaw) {
            return false;
        }
        const user = atob(userRaw);

        try {
            jwtDecode(userToken);
            JSON.parse(user);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
