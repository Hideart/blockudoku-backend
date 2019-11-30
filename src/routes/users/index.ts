import { Plugin } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  userSignInHandler,
  userSignUpHandler,
  updateUserInfoHandler,
  changeBalanceHandler,
  changeRatingHandler,
} from './users.handlers';

import {
  userSignInSchema,
  userSignUpSchema,
  userUpdateSchema,
  changeBalanceSchema,
  changeRatingSchema,
} from './users.schemas';

import { authenticateUser } from '../../core/services/auth.service';

const router: Plugin<Server, IncomingMessage, ServerResponse, object> = (app, options, next) => {

  app.put('/auth', { schema: userSignInSchema }, userSignInHandler);

  app.put('/signup', { schema: userSignUpSchema }, userSignUpHandler);

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

  app.put('/rating', {
    preValidation: app.authenticate([
      authenticateUser,
    ]),
    schema: changeRatingSchema,
  }, changeRatingHandler);

  next();
};

export default router;
