import Convict from 'convict';
import { NodeEnv } from '../src/core/models/enums/env';

const config = Convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  currentHost: {
    doc: 'Current host',
    default: 'http://localhost:3001/',
    env: 'CURRENT_HOST',
  },
  postgres: {
    host: {
      doc: 'postgres host',
      default: 'localhost',
      env: 'POSTGRES_HOST',
    },
    dbName: {
      doc: 'postgres db name',
      default: 'll_sa',
      env: 'POSTGRES_DB_NAME',
    },
    dbUser: {
      doc: 'postgres db user',
      default: 'psg-user',
      env: 'POSTGRES_USER',
    },
    dbPassword: {
      doc: 'postgres db password',
      default: 'example',
      env: 'POSTGRES_PASSWORD',
    },
    dbPort: {
      doc: 'postgres db port',
      default: 5432,
      env: 'POSTGRES_PORT',
    }
  },
  jwtSecret: {
    doc: 'Sectet jwt key',
    default: 'D8yKG88Cmrpfzx7kPJ91wB2ScI0qcD1I0B7JrTJP',
  },
  salt4pass: {
    doc: 'Salt for user password',
    default: 'SRMTjhxc8Q',
  },
  salt4channelPass: {
    doc: 'Salt for channel partner password',
    default: 'y}RXrfK56e',
  },
  salt4adminResetPassToken: {
    doc: 'Salt for super admin reset password confirmation token',
    default: 'BjAzcZJiTM',
  },
  salt4channelResetPassToken: {
    doc: 'Salt for channel partner reset password confirmation token',
    default: 'QFu6b2ahKa',
  },
  mail: {
    mailerTransport: {
      service: 'gmail',
      auth: {
        user: 'sa.leanlogic@gmail.com',
        pass: 'testPass123',
      },
    },
  },
  webClientHost: {
    doc: 'Link to front-end application',
    default: 'http://localhost:3000/',
    env: 'WEB_CLIENT_HOST',
  },
  channelPartnerInviteLink: {
    doc: 'Link to channel partner registration page',
    default: 'http://localhost:3000/cp-reg',
    env: 'CP_INVITE_LINK',
  },
  stripeSecret: {
    doc: 'Stripe secret key for authentification',
    default: 'sk_test_NLNjeHWPESg8lHto0DQCh1fG001idAn9mb',
    env: 'STRIPE_SECRET',
  },
});

if (config.get('env') === NodeEnv.DEV) {
  config.loadFile('./config/development.json');
}
export default config;
