import { AxiosError } from 'axios';
import { Misc } from '../misc';

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

describe('Mock', () => {
  test('Get start page', async () => {
    const response = await axios.get('/api-docs').catch((e: AxiosError) => e.response);

    expect(response.status).toBe(200);
  });
});
