import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import { IUserModel } from '../core/models/interfaces/user';

declare module 'fastify' {

  // tslint:disable-next-line:interface-name
  export interface FastifyInstance<HttpServer = Server, HttpRequest = IncomingMessage, HttpResponse = ServerResponse> {
    authenticate: (validators: Array<(request: FastifyRequest) => Promise<string>>) => any;
  }

  // tslint:disable-next-line:interface-name
  export interface FastifyRequest {
    user: IUserModel;
  }
}

export const userAuth = (app: FastifyInstance) => {

  // tslint:disable-next-line: max-line-length
  app.decorate('authenticate', (validators: ((request: FastifyRequest) => Promise<string>)[]) => async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
    const errorsPromises: Promise<string | null>[] = validators.map(async (validator) => validator(request));
    let errors: (string | null)[] = await Promise.all(errorsPromises);
    errors = errors.filter(el => el);
    if (errors.length === validators.length) {
      reply.status(401).send({error: {status: 401, message: 'Authorization failed'}});
    }
  });
};
