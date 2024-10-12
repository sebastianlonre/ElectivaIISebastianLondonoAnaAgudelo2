const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clone X',
      version: '1.0.0',
      description: 'This is an API clone of social network X',
      contact: {
        name: 'Ana Isabel Agudelo & Sebastian Londoño',
      },
      servers: [
        {
          url: 'http://localhost:4000/',
          description: 'Local server'
        }
      ]
    },
  },
  apis: ['./shared/routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;
