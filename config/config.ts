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
    default: 3001,
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
      default: 'blockudoku',
      env: 'POSTGRES_DB_NAME',
    },
    dbUser: {
      doc: 'postgres db user',
      default: 'db-admin',
      env: 'POSTGRES_USER',
    },
    dbPassword: {
      doc: 'postgres db password',
      default: 'Bl0ckuD0kuAdm1n',
      env: 'POSTGRES_PASSWORD',
    },
    dbPort: {
      doc: 'postgres db port',
      default: 6543,
      env: 'POSTGRES_PORT',
    }
  },
  jwtSecret: {
    doc: 'Sectet jwt key',
    default: 'jq9DUreVjTZ5rJtfkr8zKHVZMgNedxRVfTdaMDnC',
  },
  salt4pass: {
    doc: 'Salt for user password',
    default: 'ZBEC2mLtZa',
  },
  webClientHost: {
    doc: 'Link to front-end application',
    default: 'http://localhost:3000/',
    env: 'WEB_CLIENT_HOST',
  },
});

export default config;
