import { ITestConfig } from '../../src/core/models/interfaces/config';
import { configGlobal } from './config_global';

let configLocal;

try {
  // tslint:disable-next-line:no-var-requires
  configLocal = require('./config_local');
} catch (e) {
  configLocal = {};

  console.warn('create src/config/config_local.json file to override global config');
}

export const config: ITestConfig = { ...configGlobal, ...configLocal };
