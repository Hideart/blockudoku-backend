import Fastify from 'fastify';
import FastifyJWT from 'fastify-jwt';
import FastifySwagger from 'fastify-swagger';
import FastifyMultipart from 'fastify-multipart';
import FastifyStatic from 'fastify-static';
import cors from 'cors';
import path from 'path';

import { config } from '../config';
import { dbConnect } from './db';
import { applyDecorators } from './decorators';
import { serverErrorHandler } from './exceptions/server-error-handler';
import Routes from './routes';
import SwaggerSpec from './core/utils/swagger-spec';

const jwtSecret = config.get('jwtSecret');

export const prepareApp = async (): Promise<Fastify.FastifyInstance> => {
  await dbConnect();

  const app: Fastify.FastifyInstance = Fastify();

  applyDecorators(app);

  app.use(cors());

  app.register(FastifyMultipart, {
    addToBody: true,
    sharedSchemaId: 'MultipartFileType',
  });

  app.register(FastifyStatic, {
    root: path.join(__dirname, 'storage'),
    prefix: '/storage/',
  });

  app.register(FastifyJWT, { secret: jwtSecret });
  app.register(FastifySwagger, SwaggerSpec);
  app.register(Routes, { prefix: '/api' });

  app.setErrorHandler(serverErrorHandler);

  return app;
};
