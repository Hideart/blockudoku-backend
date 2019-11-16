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

describe('ChannelPartners', () => {
  test('Get channel partners list', async () => {

    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());
    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const response = await axios({
      method: 'GET',
      url: '/api/channel-partners',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.rows)).toBe(true);

    expect(response.data.rows.length).toBeGreaterThan(0);

    const searchString = response.data.rows[0].name.substring(0, response.data.rows[0].name.indexOf(' '));

    const responseFilters = await axios({
      method: 'GET',
      // tslint:disable-next-line: max-line-length
      url: `/api/channel-partners?filter={"search":"${searchString}"}&limit=5&offset=0&orderColumn=createdAt&orderType=ASC`,
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(responseFilters.status).toBe(200);
    expect(Array.isArray(responseFilters.data.rows)).toBe(true);

    expect(responseFilters.data.rows.length).toBeGreaterThan(0);
    expect(responseFilters.data.rows.length).toBeLessThanOrEqual(5);
  });
});

describe('ChannelPartners', () => {
  test('Get channel partner by ID', async () => {

    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());
    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const cplist = await axios({
      method: 'GET',
      url: '/api/channel-partners',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(cplist.status).toBe(200);
    expect(Array.isArray(cplist.data.rows)).toBe(true);

    expect(cplist.data.rows.length).toBeGreaterThan(0);

    const response = await axios({
      method: 'GET',
      url: `/api/channel-partners/${cplist.data.rows[0].id}`,
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('object');

    expect(Object.keys(response.data).sort()).toEqual([
      'id',
      'name',
      'cards',
      'avatar',
      'company',
      'email',
      'phone',
      'address',
      'order_price',
      'sms_price',
      'margin',
      'payment',
      'subscription_due_date',
      'payment_method',
      'status',
      'createdAt',
      'verified',
    ].sort());

    expect(Object.keys(response.data.payment_method).sort()).toEqual([
      'id',
      'name',
    ].sort());

    expect(Object.keys(response.data.status).sort()).toEqual([
      'id',
      'name',
    ].sort());

  });
});


describe('ChannelPartners', () => {
  test('Add channel partner', async () => {

    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());
    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const cplist = await axios({
      method: 'GET',
      url: '/api/channel-partners',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(cplist.status).toBe(200);
    expect(Array.isArray(cplist.data.rows)).toBe(true);

    expect(cplist.data.rows.length).toBeGreaterThan(0);

    const statusId = cplist.data.rows[0].status.id;
    const paymentId = cplist.data.rows[0].payment_method.id;

    const targetPartner = await axios({
      method: 'GET',
      url: '/api/channel-partners?filter={"email":"cp@test.com"}',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(targetPartner.status).toBe(200);
    expect(Array.isArray(targetPartner.data.rows)).toBe(true);
    expect(targetPartner.data.rows.length).toBeLessThanOrEqual(1);

    if (targetPartner.data.rows.length === 1) {
      const deleteResponse = await axios({
        method: 'DELETE',
        url: '/api/channel-partners/' + targetPartner.data.rows[0].id,
        headers: {Authorization: `Bearer ${authResponse.data.token}`},
      }).catch((e: AxiosError) => e.response);

      expect(deleteResponse.status).toBe(204);
    }

    const response = await axios({
      method: 'POST',
      url: '/api/channel-partners/',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
      data: {
        name: 'Test Test',
        company: 'TestComp',
        email: 'cp@test.com',
        password: '123456',
        phone: '+1234567890',
        token: 'test',
        address: 'Test city, test st., 42 1',
        order_price: '0.1',
        sms_price: '0.1',
        margin: '0.1',
        payment: '0.1',
        payment_method_id: paymentId,
        status_id: statusId,
        instance_backend_address: 'http://localhost:3001/',
        instance_frontend_address: 'http://localhost:3000/',
      },
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('object');

    expect(Object.keys(response.data).sort()).toEqual([
      'id',
      'name',
      'avatar',
      'company',
      'email',
      'phone',
      'address',
      'order_price',
      'sms_price',
      'margin',
      'payment',
      'subscription_due_date',
      'payment_method',
      'status',
      'createdAt',
      'verified',
    ].sort());

    expect(Object.keys(response.data.payment_method).sort()).toEqual([
      'id',
      'name',
    ].sort());

    expect(Object.keys(response.data.status).sort()).toEqual([
      'id',
      'name',
    ].sort());

  });
});

describe('ChannelPartners', () => {
  test('Channel partner auth', async () => {

    const response = await axios({
      method: 'POST',
      url: '/api/channel-partners/auth',
      data: {
        email: 'cp@test.com',
        password: '123456',
      },
      // tslint:disable-next-line: max-line-length
      headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNDY3NzU5LTI1ZTEtNGUwOS1hNzYyLTg5Y2I3ZGI5MGU4NyIsInR5cGUiOiJDaGFubmVsUGFydG5lciIsImlhdCI6MTU2NDQ5NDg4NSwiZXhwIjo0NzIwMjU0ODg1LCJpc3MiOiJTQWRtaW4ifQ.J7H9R8W3dyJNIHjn0YJ7O6RqVhmkYuyN39NKT8fjtdQ`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
    expect(Object.keys(response.data).sort()).toEqual(['user'].sort());
  });
});

describe('ChannelPartners', () => {
  test('Channel partner reset password', async () => {

    const response = await axios({
      method: 'POST',
      url: '/api/channel-partners/reset-password',
      data: {
        email: 'cp@test.com',
      },
      // tslint:disable-next-line: max-line-length
      headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNDY3NzU5LTI1ZTEtNGUwOS1hNzYyLTg5Y2I3ZGI5MGU4NyIsInR5cGUiOiJDaGFubmVsUGFydG5lciIsImlhdCI6MTU2NDQ5NDg4NSwiZXhwIjo0NzIwMjU0ODg1LCJpc3MiOiJTQWRtaW4ifQ.J7H9R8W3dyJNIHjn0YJ7O6RqVhmkYuyN39NKT8fjtdQ`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(204);
  });
});

describe('ChannelPartners', () => {
  test('Channel partner update password', async () => {

    const response = await axios({
      method: 'POST',
      url: '/api/channel-partners/update-password',
      data: {
        resetPasswordToken: resetPassToken,
        password: '123456',
      },
      // tslint:disable-next-line: max-line-length
      headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNDY3NzU5LTI1ZTEtNGUwOS1hNzYyLTg5Y2I3ZGI5MGU4NyIsInR5cGUiOiJDaGFubmVsUGFydG5lciIsImlhdCI6MTU2NDQ5NDg4NSwiZXhwIjo0NzIwMjU0ODg1LCJpc3MiOiJTQWRtaW4ifQ.J7H9R8W3dyJNIHjn0YJ7O6RqVhmkYuyN39NKT8fjtdQ`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(204);
  });
});

describe('ChannelPartners', () => {
  test('Delete channel partner', async () => {

    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());
    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const cplist = await axios({
      method: 'GET',
      url: '/api/channel-partners?filter={"email":"cp@test.com"}',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(cplist.status).toBe(200);
    expect(Array.isArray(cplist.data.rows)).toBe(true);

    expect(cplist.data.rows.length).toBe(1);

    const id = cplist.data.rows[0].id;

    const response = await axios({
      method: 'DELETE',
      url: '/api/channel-partners/' + id,
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(204);
  });
});


describe('ChannelPartners', () => {
  test('Update channel partner', async () => {

    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());
    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const cplist = await axios({
      method: 'GET',
      url: '/api/channel-partners',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(cplist.status).toBe(200);
    expect(Array.isArray(cplist.data.rows)).toBe(true);

    expect(cplist.data.rows.length).toBeGreaterThan(0);

    const id = cplist.data.rows[0].id;

    const response = await axios({
      method: 'PUT',
      url: '/api/channel-partners/' + id,
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
      data: {
        name: 'New Test Name From Update',
      },
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('object');

    expect(Object.keys(response.data).sort()).toEqual([
      'id',
      'name',
      'cards',
      'avatar',
      'company',
      'email',
      'phone',
      'address',
      'order_price',
      'sms_price',
      'margin',
      'payment',
      'subscription_due_date',
      'payment_method',
      'status',
      'createdAt',
      'verified',
    ].sort());

    expect(Object.keys(response.data.payment_method).sort()).toEqual([
      'id',
      'name',
    ].sort());

    expect(Object.keys(response.data.status).sort()).toEqual([
      'id',
      'name',
    ].sort());
  });
});

describe('ChannelPartners', () => {
  test('Send invate to registration page', async () => {

    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());
    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const email = 'admin@test.com';

    const response = await axios({
      method: 'POST',
      url: '/api/channel-partners/invite',
      data: {email},
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(204);
  });
});

describe('ChannelPartners', () => {
  test('Multiple verify channel partners', async () => {

    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());
    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const cplist = await axios({
      method: 'GET',
      url: '/api/channel-partners',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(cplist.status).toBe(200);
    expect(Array.isArray(cplist.data.rows)).toBe(true);
    expect(cplist.data.rows.length).toBeGreaterThan(0);

    const ids: string[] = [];
    for (let i = 0; i < cplist.data.rows.length; i++) {
      ids.push(cplist.data.rows[i].id);
    }

    const response = await axios({
      method: 'POST',
      url: '/api/channel-partners/verify',
      data: {ids},
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
    expect(Object.keys(response.data).length).toBe(1);
    expect(Object.keys(response.data).sort()).toEqual(['notVerifiedUsers'].sort());
  });
});

describe('ChannelPartners', () => {
  test('Multiple delete channel partners', async () => {

    const authResponse = await axios.post('/api/admin/auth', {
      email: testConfig.adminCredentials.email, password: testConfig.adminCredentials.password,
    }).catch((e: AxiosError) => e.response);

    expect(authResponse.status).toBe(200);
    expect(Object.keys(authResponse.data).sort()).toEqual(['token', 'user'].sort());
    expect(authResponse.data.token.length).toBeGreaterThan(10);

    const cplist = await axios({
      method: 'GET',
      url: '/api/channel-partners',
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(cplist.status).toBe(200);
    expect(Array.isArray(cplist.data.rows)).toBe(true);
    expect(cplist.data.rows.length).toBeGreaterThan(0);

    const ids: string[] = [];
    for (let i = 0; i < cplist.data.rows.length; i++) {
      ids.push(cplist.data.rows[i].id);
    }

    const response = await axios({
      method: 'DELETE',
      url: '/api/channel-partners/',
      data: {ids},
      headers: {Authorization: `Bearer ${authResponse.data.token}`},
    }).catch((e: AxiosError) => e.response);

    expect(response.status).toBe(204);
  });
});
