import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';

import { HttpError } from '../core/models/classes/http-error';

export const serverErrorHandler = (
  error: FastifyError & HttpError,
  req: FastifyRequest,
  res: FastifyReply<ServerResponse>,
) => {
  if (error.validation) {
    return res
      .code(422)
      .send({
        errorName: error.name,
        message: error.message,
      });
  }

  return res
    .code(error.status || 500)
    .send({
      details: error.details,
      errorName: error.name,
      message: error.message || 'Internal Server Error',
    });
};
