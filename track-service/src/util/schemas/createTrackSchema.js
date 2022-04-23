const schema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        order_number: {
          type: 'string',
        },
      },
      required: ['order_number'],
    },
  },
  required: ['body'],
};

export default schema;