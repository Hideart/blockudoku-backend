import { SuperAdmin } from './super-admin/app';
import { EmptyPage } from './empty-page';

import { AppName } from '@/core/models/enums/app-name';

import { globalConfig } from '@/client-config';

let AppComponent = EmptyPage;

if (globalConfig.appLaunch === AppName.SuperAdmin) {
    AppComponent = SuperAdmin;
}

export default AppComponent;