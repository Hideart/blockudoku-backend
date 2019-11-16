import Fastify from 'fastify';
import { userAuth } from './auth';

export const applyDecorators = (app: Fastify.FastifyInstance): void => {
  userAuth(app);
};
