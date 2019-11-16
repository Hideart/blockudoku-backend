import { AppName } from '../enums/app-name';
import { NodeEnv } from '../enums/node-env';

export interface IClientConfig {
    appLaunch: AppName;
    nodeEnv: NodeEnv;
}
