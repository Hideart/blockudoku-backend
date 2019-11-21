import JWT from 'jsonwebtoken';

import { config } from '../../../config';

const jwtSecret = config.get('jwtSecret');

export const jwtSign = (payload: any, expiresIn: string = '1d'): string => {
  return JWT.sign(payload, jwtSecret, {
    expiresIn,
    issuer: 'BlockuDokuBackend',
  });
};

export const jwtVerify = (jwt: string): any => {
  let decoded;
  try {
    decoded = JWT.verify(jwt, jwtSecret); 
  } catch (e) {
    console.log(e);
    return null;
  }
  return decoded;
}