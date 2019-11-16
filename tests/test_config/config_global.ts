import { ITestConfig } from '../../src/core/models/interfaces/config';

export const configGlobal: ITestConfig = {
  adminCredentials: {
    email: 'admin@test.com',
    password: '123456',
  },
  env: 'test',
  host: 'localhost',
  port: 3001,
  protocol: 'http',
};
