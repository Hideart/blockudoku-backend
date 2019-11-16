import { RouteSchema } from 'fastify';
import { ErrorSchema } from '../../core/models/schemas/error';

export const channelPartnerSignInSchema: RouteSchema = {
  description: 'Channel partner auth',
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
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            avatar: { type: 'string' },
            company: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            address: { type: 'string' },
            order_price: { type: 'number' },
            sms_price: { type: 'number' },
            margin: { type: 'number' },
            payment: { type: 'number' },
            subscription_due_date: {type: 'string'},
            payment_method: {
              type: 'object',
              properties: {
                id: {type: 'string'},
                name: {type: 'string'},
              },
            },
            status: {
              type: 'object',
              properties: {
                id: {type: 'string'},
                name: {type: 'string'},
              },
            },
            verified: { type: 'boolean' },
            createdAt: {type: 'string'},
            cards: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  brand: { type: 'string' },
                  last4: { type: 'string' },
                  exp_month: { type: 'number' },
                  exp_year: { type: 'number' },
                  default: { type: 'boolean' },
                },
              },
            },
          },
        },
      },
    },
    400: {
      ...ErrorSchema,
      description: 'Email or password is wrong',
    },
  },
  summary: 'Channel partner auth',
  tags: ['SAdmin-ChannelPartner'],
};

export const getChannelPartnersSchema: RouteSchema = {
  description: 'Get channel partners list',
  querystring: {
    orderType: {
      type: 'string',
      enum: ['ASC', 'DESC']
    },
    orderColumn: { type: 'string'},
    limit: {type: 'number'},
    offset: {type: 'number'},
    filter: {type: 'string'},
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        count: { type: 'number' },
        rows: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              avatar: { type: 'string' },
              company: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              address: { type: 'string' },
              order_price: { type: 'number' },
              sms_price: { type: 'number' },
              margin: { type: 'number' },
              payment: { type: 'number' },
              subscription_due_date: {type: 'string'},
              payment_method: {
                type: 'object',
                properties: {
                  id: {type: 'string'},
                  name: {type: 'string'},
                },
              },
              status: {
                type: 'object',
                properties: {
                  id: {type: 'string'},
                  name: {type: 'string'},
                },
              },
              verified: { type: 'boolean' },
              createdAt: {type: 'string'},
              cards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    brand: { type: 'string' },
                    last4: { type: 'string' },
                    exp_month: { type: 'number' },
                    exp_year: { type: 'number' },
                    default: { type: 'boolean' },
                  },
                },
              },
            },
          },
        },
      },

    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Get channel partners list',
  tags: ['SAdmin-ChannelPartner'],
};

export const getChannelPartnerByIdSchema: RouteSchema = {
  description: 'Get channel partner by ID',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
        company: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        order_price: { type: 'number' },
        sms_price: { type: 'number' },
        margin: { type: 'number' },
        payment: { type: 'number' },
        subscription_due_date: {type: 'string'},
        payment_method: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
          },
        },
        status: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
          },
        },
        createdAt: {type: 'string'},
        verified: { type: 'boolean' },
        cards: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              brand: { type: 'string' },
              last4: { type: 'string' },
              exp_month: { type: 'number' },
              exp_year: { type: 'number' },
              default: { type: 'boolean' },
            },
          },
        },
      },
    },
    404: {
      ...ErrorSchema,
      description: 'Channel partner not found',
    },
    500: {
      ...ErrorSchema,
      description: 'Channel partner ID is wrong',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Get channel partner by ID',
  tags: ['SAdmin-ChannelPartner'],
};

export const updateChannelPartnerSchema: RouteSchema = {
  description: 'Update channel partner by ID',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      avatar: {
        type: 'array',
        items: {
          data: {type: 'string'},
          filename: {type: 'string'},
        },
      },
      company: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      address: { type: 'string' },
      order_price: { type: 'number' },
      sms_price: { type: 'number' },
      margin: { type: 'number' },
      payment: { type: 'number' },
      stripeToken: { type: 'object' },
      subscription_due_date: {type: 'string'},
      payment_method_id: {type: 'string'},
      status_id: {type: 'string'},
      instance_backend_address: {type: 'string'},
      instance_frontend_address: {type: 'string'},
      status_name: {
        type: 'string',
        enum: ['Active', 'Blocked', 'Inactive'],
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
        company: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        order_price: { type: 'number' },
        sms_price: { type: 'number' },
        margin: { type: 'number' },
        payment: { type: 'number' },
        subscription_due_date: {type: 'string'},
        payment_method: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
          },
        },
        status: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
          },
        },
        createdAt: {type: 'string'},
        verified: {type: 'boolean'},
        cards: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              brand: { type: 'string' },
              last4: { type: 'string' },
              exp_month: { type: 'number' },
              exp_year: { type: 'number' },
              default: { type: 'boolean' },
            },
          },
        },
      },
    },
    404: {
      ...ErrorSchema,
      description: 'Channel partner not found',
      type: 'object',
    },
    500: {
      ...ErrorSchema,
      description: 'Channel partner ID is wrong',
      type: 'object',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Update channel partner by ID',
  tags: ['SAdmin-ChannelPartner'],
};

export const addChannelPartnerSchema: RouteSchema = {
  description: 'Add channel partner',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      avatar: {
        type: 'array',
        items: {
          data: {type: 'string'},
          filename: {type: 'string'},
        },
      },
      company: { type: 'string' },
      email: { type: 'string' },
      password: {type: 'string'},
      phone: { type: 'string' },
      address: { type: 'string' },
      order_price: { type: 'number' },
      sms_price: { type: 'number' },
      margin: { type: 'number' },
      payment: { type: 'number' },
      subscription_due_date: {type: 'string'},
      payment_method_id: {type: 'string'},
      status_id: {type: 'string'},
      payment_method_name: {
        type: 'string',
        enum: ['Stripe'],
      },
      status_name: {
        type: 'string',
        enum: ['Active', 'Inactive', 'Blocked'],
      },
      instance_backend_address: {type: 'string'},
      instance_frontend_address: {type: 'string'},
    },
    required: [
      'instance_backend_address',
      'instance_frontend_address',
      'email',
      'password',
    ],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: {type: 'string'},
        company: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        order_price: { type: 'number' },
        sms_price: { type: 'number' },
        margin: { type: 'number' },
        payment: { type: 'number' },
        subscription_due_date: {type: 'string'},
        verified: { type: 'boolean' },
        cards: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              brand: { type: 'string' },
              last4: { type: 'string' },
              exp_month: { type: 'number' },
              exp_year: { type: 'number' },
              default: { type: 'boolean' },
            },
          },
        },
        payment_method: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
          },
        },
        status: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
          },
        },
        createdAt: {type: 'string'},
      },
    },
    500: {
      ...ErrorSchema,
      description: 'Something went wrong',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Add channel partner',
  tags: ['SAdmin-ChannelPartner'],
};

export const deleteChannelPartnerByIdSchema: RouteSchema = {
  description: 'Delete channel partner by ID',
  response: {
    204: {
      description: 'Successful response',
      type: 'object',
    },
    404: {
      ...ErrorSchema,
      description: 'Channel partner not found',
    },
    500: {
      ...ErrorSchema,
      description: 'Channel partner ID is wrong',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Delete channel partner by ID',
  tags: ['SAdmin-ChannelPartner'],
};

export const channelPartnerInviteSchema: RouteSchema = {
  description: 'Invite channel partner to registration page',
  body: {
    type: 'object',
    properties: {
      email: {type: 'string'},
    },
    required: ['email'],
  },
  response: {
    204: {
      description: 'Successful response',
      type: 'object',
    },
    404: {
      ...ErrorSchema,
      description: 'Channel partner not found',
    },
    500: {
      ...ErrorSchema,
      description: 'Channel partner ID is wrong',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Delete channel partner by ID',
  tags: ['SAdmin-ChannelPartner'],
};

export const deleteStripeSourceFromCustomerSchema: RouteSchema = {
  description: 'Delete source (payment method) from customer (stripe)',
  querystring: {
    id: {type: 'string'},
  },
  body: {
    type: 'object',
    properties: {
      sourceId: {type: 'string'},
    },
    required: ['sourceId'],
  },
  response: {
    204: {
      description: 'Successful response',
      type: 'object',
    },
    404: {
      ...ErrorSchema,
      description: 'Channel partner or card not found',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Delete source (payment method) from customer (stripe)',
  tags: ['SAdmin-ChannelPartner'],
};

export const verifyChannelPartnersSchema: RouteSchema = {
  description: 'Verify channel partners',
  body: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    required: ['ids'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        notVerifiedUsers: {
          type: 'array',
          items: { type: 'string' },
        },
        notDeletedUsers: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    400: {
      ...ErrorSchema,
      description: 'IDs are wrong',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Verify channel partners',
  tags: ['SAdmin-ChannelPartner'],
};

export const multipleDeleteChannelPartnersSchema: RouteSchema = {
  description: 'Multiple delete channel partners',
  body: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    required: ['ids'],
  },
  response: {
    204: {
      description: 'Successful response',
      type: 'object',
    },
    400: {
      ...ErrorSchema,
      description: 'IDs are wrong',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Multiple delete channel partners',
  tags: ['SAdmin-ChannelPartner'],
};

export const channelPartnerReportXlsxSchema: RouteSchema = {
  description: 'Generate .xlsx report file',
  body: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    required: ['ids'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
    },
    404: {
      ...ErrorSchema,
      description: 'Channel partner id not found',
    },
    500: {
      ...ErrorSchema,
      description: 'Channel partner ID is wrong',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Generate .xlsx report file',
  tags: ['SAdmin-ChannelPartner'],
};

export const resetChannelPasswordSchema: RouteSchema = {
  description: 'Use for reset channel partner\'s password',
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
  summary: 'Reset channel partner\'s password',
  tags: ['SAdmin-ChannelPartne'],
};

export const updateChannelPasswordSchema: RouteSchema = {
  description: 'Use for update channel partner\'s password after reset',
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
  summary: 'Update channel partner\'s password after reset',
  tags: ['SAdmin-ChannelPartne'],
};

export const setDefaultSourceSchema: RouteSchema = {
  description: 'Set default card for channel partner',
  body: {
    type: 'object',
    properties: {
      source: { type: 'string' },
    },
    required: ['source'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
        company: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        order_price: { type: 'number' },
        sms_price: { type: 'number' },
        margin: { type: 'number' },
        payment: { type: 'number' },
        subscription_due_date: {type: 'string'},
        payment_method: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
          },
        },
        status: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
          },
        },
        createdAt: {type: 'string'},
        verified: {type: 'boolean'},
        cards: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              brand: { type: 'string' },
              last4: { type: 'string' },
              exp_month: { type: 'number' },
              exp_year: { type: 'number' },
              default: { type: 'boolean' },
            },
          },
        },
      },
    },
    404: {
      ...ErrorSchema,
      description: 'Channel partner not found',
      type: 'object',
    },
    500: {
      ...ErrorSchema,
      description: 'Channel partner not updated',
      type: 'object',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Set default card for channel partner',
  tags: ['SAdmin-ChannelPartner'],
};