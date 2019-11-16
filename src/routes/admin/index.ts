import { Plugin } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  adminSignInHandler,
  updateAdminInfoHandler,
  resetAdminPasswordHandler,
  updateAdminPasswordHandler,
} from './admin.handlers';

import { adminSignInSchema, updateMeSchema, resetPasswordSchema, updatePasswordSchema } from './admin.schemas';
import { authenticateAdmin } from '../../core/services/auth.service';

const router: Plugin<Server, IncomingMessage, ServerResponse, object> = (app, options, next) => {

  app.post('/auth', { schema: adminSignInSchema }, adminSignInHandler);

  app.post('/update-password', { schema: updatePasswordSchema }, updateAdminPasswordHandler);

  app.post('/reset-password', { schema: resetPasswordSchema }, resetAdminPasswordHandler);

  app.put('/me', {
    preValidation: app.authenticate([
      authenticateAdmin,
    ]),
    schema: updateMeSchema,
  }, updateAdminInfoHandler);

  next();
};

export default router;
