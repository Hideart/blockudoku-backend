import { AxiosError } from 'axios';
import { Misc } from '../misc';
import { testConfig } from '../test_config';

let axios: any;

beforeAll(async (done: any) => {
  await Misc.startServer();

  axios = Misc.getAxios();

  done();
});

afterAll(async (done: any) => {
  await Misc.closeServer();

  done();
});

let resetPassToken = '';

jest.mock('../../src/core/services/mail.service', () => {
  const original = require.requireActual('../../src/core/services/mail.service');
  return {
    ...original,
    sendResetPasswordMail: (a, token) => new Promise((res, rej) => {
      resetPassToken = token;
      res();
    }),
  };
});

describe('Admin', () => {
  test('Log in as admin', async () => {
    const response = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
    expect(Object.keys(response.data).sort()).toEqual(['token', 'user'].sort());

    expect(response.data.token.length).toBeGreaterThan(10);

    expect(Object.keys(response.data.user).sort()).toEqual(['email', 'first_name', 'last_name', 'avatar'].sort());
  });
});

describe('Admin', () => {
  test('Update admin info (without email)', async () => {
    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());

    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const response = await axios({
      method: 'put',
      url: '/api/admin/me',
      data: {first_name: 'Robin'},
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
    expect(Object.keys(response.data).sort()).toEqual(['email', 'avatar', 'first_name', 'last_name'].sort());
  });
});

describe('Admin', () => {
  test('Reset user password', async () => {
    const resetPassResponse = await axios.post('/api/admin/reset-password', {
      email: testConfig.adminCredentials.email,
    }).catch((e: AxiosError) => e.response);

    expect(resetPassResponse.status).toBe(204);
  });
});

describe('Admin', () => {
  test('Update user password after reset', async () => {
    const updatePassResponse = await axios.post('/api/admin/update-password', {
      password: testConfig.adminCredentials.password,
      resetPasswordToken: resetPassToken,
    }).catch((e: AxiosError) => e.response);

    expect(updatePassResponse.status).toBe(204);
  });
});
