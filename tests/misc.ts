import axios, { AxiosRequestConfig } from 'axios';
import Fastify from 'fastify';
import { prepareApp } from '../src/app';
import { testConfig } from './test_config';

let serverInstance: Fastify.FastifyInstance = null;

export class Misc {
  static startServer(): Promise<void> {
    return new Promise(async (resolve) => {
      if (serverInstance != null) {
        return Promise.resolve();
      }

      const app = await prepareApp();

      app.listen(testConfig.port, () => {
        console.log(`Test server is working on ${testConfig.port}`);

        serverInstance = app;

        resolve();
      });
    });
  }

  static async closeServer(): Promise<void> {
    if (serverInstance != null) {
      await serverInstance.close();
    }
  }

  static getAxios(token?: string): any {
    const options: AxiosRequestConfig = {
      baseURL: `${testConfig.protocol}://${testConfig.host}:${testConfig.port}`,
    };

    if (token != null) {
      options.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return axios.create(options);
  }
}
