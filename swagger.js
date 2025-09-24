const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger set up

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API documentation for managing contacts'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ]
  },
  apis: ['./routes/contacts.js'] // Adjust path to match your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { 
    swaggerUi,
    swaggerSpec
};