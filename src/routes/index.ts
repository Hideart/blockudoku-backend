import { Plugin } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import userRoutes from './admin';
import channelPartnerRoutes from './channel-partner';

const router: Plugin<Server, IncomingMessage, ServerResponse, object> = (app, options, next) => {
  app.register(userRoutes, { prefix: '/admin' });
  app.register(channelPartnerRoutes, { prefix: '/channel-partners' });
  next();
};

export default router;
