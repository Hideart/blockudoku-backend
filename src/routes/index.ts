import { Plugin } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import userRoutes from './users';

const router: Plugin<Server, IncomingMessage, ServerResponse, object> = (app, options, next) => {
  app.register(userRoutes, { prefix: '/user' });
  next();
};

export default router;
