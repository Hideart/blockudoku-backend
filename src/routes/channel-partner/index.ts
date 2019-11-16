import { Plugin } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import {
  getChannelPartnersHandler,
  getChannelPartnerByIdHandler,
  addChannelPartnerHandler,
  deleteChannelPartnerByIdHandler,
  updateChannelPartnerHandler,
  channelPartnerInviteHandler,
  deleteStripeSourceFromCustomerHandler,
  verifyChannelPartnersHandler,
  multipleDeleteChannelPartnersHandler,
  channelPartnerReportXlsxHandler,
  channelPartnerSignInHandler,
  resetChannelPasswordHandler,
  updateChannelPasswordHandler,
  setDefaultSourceHandler,
} from './channel.handlers';

import {
  getChannelPartnersSchema,
  getChannelPartnerByIdSchema,
  addChannelPartnerSchema,
  deleteChannelPartnerByIdSchema,
  updateChannelPartnerSchema,
  channelPartnerInviteSchema,
  deleteStripeSourceFromCustomerSchema,
  verifyChannelPartnersSchema,
  multipleDeleteChannelPartnersSchema,
  channelPartnerReportXlsxSchema,
  channelPartnerSignInSchema,
  resetChannelPasswordSchema,
  updateChannelPasswordSchema,
  setDefaultSourceSchema,
} from './channel.schemas';

import {
  authenticateAdmin,
  authenticateLanding,
  authenticateChannel,
} from '../../core/services/auth.service';

const router: Plugin<Server, IncomingMessage, ServerResponse, object> = (app, options, next) => {

  app.post(
    '/auth',
    { preValidation: app.authenticate([authenticateChannel]), schema: channelPartnerSignInSchema },
    channelPartnerSignInHandler,
  );

  app.post(
    '/reset-password',
    { preValidation: app.authenticate([authenticateChannel]), schema: resetChannelPasswordSchema },
    resetChannelPasswordHandler,
  );

  app.post(
    '/update-password',
    { preValidation: app.authenticate([authenticateChannel]), schema: updateChannelPasswordSchema },
    updateChannelPasswordHandler,
  );

  app.get(
    '/',
    { preValidation: app.authenticate([authenticateAdmin]), schema: getChannelPartnersSchema },
    getChannelPartnersHandler,
  );

  app.get(
    '/:id',
    {
      preValidation: app.authenticate([ authenticateAdmin, authenticateChannel ]),
      schema: getChannelPartnerByIdSchema,
    },
    getChannelPartnerByIdHandler,
  );

  app.put(
    '/:id',
    { preValidation: app.authenticate([authenticateAdmin, authenticateLanding, authenticateChannel]),
      schema: updateChannelPartnerSchema },
    updateChannelPartnerHandler,
  );

  app.post(
    '/set-default-source/:id',
    { preValidation: app.authenticate([authenticateAdmin, authenticateChannel]),
      schema: setDefaultSourceSchema },
    setDefaultSourceHandler,
  );

  app.post(
    '/',
    { preValidation: app.authenticate([ authenticateAdmin, authenticateLanding ]), schema: addChannelPartnerSchema },
    addChannelPartnerHandler,
  );

  app.delete (
    '/:id',
    { preValidation: app.authenticate([ authenticateAdmin ]), schema: deleteChannelPartnerByIdSchema },
    deleteChannelPartnerByIdHandler,
  );

  app.post(
    '/invite',
    { preValidation: app.authenticate([ authenticateAdmin ]), schema: channelPartnerInviteSchema },
    channelPartnerInviteHandler,
  );

  app.post(
    '/remove-card/:id',
    {
      preValidation: app.authenticate([ authenticateAdmin, authenticateChannel ]),
      schema: deleteStripeSourceFromCustomerSchema,
    },
    deleteStripeSourceFromCustomerHandler,
  );

  app.post(
    '/verify',
    { preValidation: app.authenticate([ authenticateAdmin ]), schema: verifyChannelPartnersSchema },
    verifyChannelPartnersHandler,
  );

  app.delete(
    '/',
    { preValidation: app.authenticate([ authenticateAdmin ]), schema: multipleDeleteChannelPartnersSchema },
    multipleDeleteChannelPartnersHandler,
  );

  app.post(
    '/report-xlsx',
     { preValidation: app.authenticate([ authenticateAdmin ]), schema: channelPartnerReportXlsxSchema },
    channelPartnerReportXlsxHandler,
  );

  next();
};

export default router;
