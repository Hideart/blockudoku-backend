export const ErrorSchema = {
  properties: {
    details: { type: 'object' },
    errorName: { type: 'string' },
    message: { type: 'string' },
    status: { type: 'integer' },
  },
  type: 'object',
};
