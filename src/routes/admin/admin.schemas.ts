import { RouteSchema } from 'fastify';
import { ErrorSchema } from '../../core/models/schemas/error';

export const adminSignInSchema: RouteSchema = {
  description: 'Super admin auth',
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            email: {type: 'string'},
            first_name: {type: 'string'},
            last_name: {type: 'string'},
            avatar: {type: 'string'},
          },
        },
      },
    },
    400: {
      ...ErrorSchema,
      description: 'Email or password is wrong',
    },
  },
  summary: 'Admin auth',
  tags: ['SAdmin'],
};

export const updateMeSchema: RouteSchema = {
  description: 'Use for update information about user',
  body: {
    type: 'object',
    properties: {
      first_name: {type: 'string'},
      last_name: {type: 'string'},
      avatar: { type: 'array' },
      password: { type: 'string' },
      newPassword: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      properties: {
        avatar: { type: 'string' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
      },
      type: 'object',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Updating user information',
  tags: ['SAdmin'],
};

export const resetPasswordSchema: RouteSchema = {
  description: 'Use for reset user password',
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
    },
    required: ['email'],
  },
  response: {
    204: {
      description: 'Successful response',
      type: 'object',
    },
  },
  summary: 'Reset user password',
  tags: ['SAdmin'],
};

export const updatePasswordSchema: RouteSchema = {
  description: 'Use for update user password after reset',
  body: {
    type: 'object',
    properties: {
      resetPasswordToken: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['resetPasswordToken', 'password'],
  },
  response: {
    204: {
      description: 'Successful response',
      type: 'object',
    },
  },
  summary: 'Update user password after reset',
  tags: ['SAdmin'],
};