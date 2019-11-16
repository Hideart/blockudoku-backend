import { config } from '../../../config';

const hostRaw = config.get('currentHost');
const protocolReg = /^http(s?):\/\//gm;

const host = hostRaw.replace(protocolReg, () => '');

export default {
  exposeRoute: true,
  routePrefix: '/api-docs',
  swagger: {
    host,
    info: {
      title: 'Super admin back-end',
      description: 'Super admin back-end',
      version: '1.0',
    },
    securityDefinitions: {
      jwt: {
        in: 'header',
        name: 'Authorization',
        type: 'apiKey',
      },
    },
    schemes: ['http', 'https'],
  },
};
