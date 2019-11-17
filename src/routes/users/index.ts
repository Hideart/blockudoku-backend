import { Plugin } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  userSignInHandler,
  userSignUpHandler,
  updateUserInfoHandler,
  changeBalanceHandler,
} from './users.handlers';

import {
  userSignInSchema,
  userSignUpSchema,
  userUpdateSchema,
  changeBalanceSchema,
} from './users.schemas';

import { authenticateUser } from '../../core/services/auth.service';

const router: Plugin<Server, IncomingMessage, ServerResponse, object> = (app, options, next) => {

  app.post('/auth', { schema: userSignInSchema }, userSignInHandler);

  app.post('/signup', { schema: userSignUpSchema }, userSignUpHandler);

  app.put('/me', {
    preValidation: app.authenticate([
      authenticateUser,
    ]),
    schema: userUpdateSchema,
  }, updateUserInfoHandler);

  app.put('/balance', {
    preValidation: app.authenticate([
      authenticateUser,
    ]),
    schema: changeBalanceSchema,
  }, changeBalanceHandler);

  next();
};

export default router;
