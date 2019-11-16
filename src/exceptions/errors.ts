import { HttpError } from '../core/models/classes/http-error';

export class BadRequestError extends HttpError {
  name: string = 'BadRequest';
  status: number = 400;

  constructor(message = 'Bad Request') {
    super();

    this.message = message;
  }
}

export class UnauthorizedError extends HttpError {
  name: string = 'UnauthorizedError';
  status: number = 401;

  constructor(message = 'Unauthorized') {
    super();

    this.message = message;
  }
}

export class ForbiddenError extends HttpError {
  name: string = 'You don\'t have permission to access on this server.';
  status: number = 403;

  constructor(message = 'Forbidden') {
    super();

    this.message = message;
  }
}

export class NotFoundError extends HttpError {
  name: string = 'NotFound';
  status: number = 404;

  constructor(message = 'Not Found') {
    super();

    this.message = message;
  }
}

export class ConflictError extends HttpError {
  name: string = 'Conflict';
  status: number = 409;

  constructor(message = 'Conflict') {
    super();

    this.message = message;
  }
}

export class UnprocessableEntityError extends HttpError {
  name: string = 'UnprocessableEntity';
  status: number = 422;

  constructor(message = 'Unprocessable Entity') {
    super();

    this.message = message;
  }
}

export class InternalServerError extends HttpError {
  name: string = 'InternalServerError';
  status: number = 500;

  constructor(message = 'Internal Server Error') {
    super();

    this.message = message;
  }
}

export class NotImplementedError extends HttpError {
  name: string = 'NotImplemented';
  status: number = 501;

  constructor(message = 'Not implemented') {
    super();

    this.message = message;
  }
}
