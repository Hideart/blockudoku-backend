import JWT from 'jsonwebtoken';

import { config } from '../../../config';

const jwtSecret = config.get('jwtSecret');

export const jwtSign = (payload: any, expiresIn: string = '3h'): string => {
  return JWT.sign(payload, jwtSecret, {
    expiresIn,
    issuer: 'SAdmin',
  });
};