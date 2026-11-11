
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE 341 Books API',
      version: '1.0.0',
      description: 'API for managing books and authors.'
    },
    servers: [
      {
        url: 'https://cse341-books-uflx.onrender.com',
        description: 'Local development server'
      }
    ]
  },
  apis: ['./src/router.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
