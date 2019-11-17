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
      title: 'BlockuDoku Tetris back-end',
      description: 'BlockuDoku Tetris back-end',
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
