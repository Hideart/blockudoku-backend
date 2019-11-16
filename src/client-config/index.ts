import { IClientConfig } from '@/core/models/interfaces/client-config';
import { AppName } from '@/core/models/enums/app-name';
import { NodeEnv } from '@/core/models/enums/node-env';

export const globalConfig: IClientConfig = {
    appLaunch: process.env.REACT_APP_LAUNCH_APP as AppName,
    nodeEnv: process.env.NODE_ENV as NodeEnv,
};
