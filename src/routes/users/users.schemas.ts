import { RouteSchema } from 'fastify';
import { ErrorSchema } from '../../core/models/schemas/error';

const userResponseProps = {
  balance: {type: 'number'},
  rating: {type: 'number'},
  email: {type: 'string'},
  first_name: {type: 'string'},
  last_name: {type: 'string'},
  nickname: {type: 'string'},
};

export const userSignInSchema: RouteSchema = {
  description: 'User auth',
  body: {
    type: 'object',
    properties: {
      nickname: { type: 'string' },
      password: { type: 'string' },
      token: { type: 'string' },
    },
    required: ['nickname'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        token: { type: 'string' },
        user: {
          type: 'object',
          properties: {...userResponseProps}
        },
      },
    },
    400: {
      ...ErrorSchema,
      description: 'Nickname or password is wrong',
    },
    500: {
      ...ErrorSchema,
      description: 'Something went wrong',
    },
  },
  summary: 'User auth',
  tags: ['User'],
};

export const userSignUpSchema: RouteSchema = {
  description: 'User sign up',
  body: {
    type: 'object',
    properties: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      nickname: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['nickname', 'password'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {...userResponseProps},
    },
    400: {
      ...ErrorSchema,
      description: 'User already exists',
    },
    500: {
      ...ErrorSchema,
      description: 'Something went wrong',
    },
  },
  summary: 'User sign up',
  tags: ['User'],
};

export const userUpdateSchema: RouteSchema = {
  description: 'Update user profile',
  body: {
    type: 'object',
    properties: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      nickname: { type: 'string' },
      email: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {...userResponseProps},
    },
    404: {
      ...ErrorSchema,
      description: 'User not found',
    },
    500: {
      ...ErrorSchema,
      description: 'Something went wrong',
    },
  },
  summary: 'Update user profile',
  tags: ['User'],
};

export const changeBalanceSchema: RouteSchema = {
  description: 'Update user balance',
  body: {
    type: 'object',
    properties: {
      nickname: { type: 'string' },
      amount: { type: 'number' },
    },
    required: ['nickname', 'amount'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {...userResponseProps},
    },
    404: {
      ...ErrorSchema,
      description: 'User not found',
    },
    500: {
      ...ErrorSchema,
      description: 'Something went wrong',
    },
  },
  summary: 'Update user balance',
  tags: ['User'],
};

export const changeRatingSchema: RouteSchema = {
  ...changeBalanceSchema,
  description: 'Update user rating',
  summary: 'Update user rating',
};