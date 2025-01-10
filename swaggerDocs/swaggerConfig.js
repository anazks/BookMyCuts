const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi =  require('swagger-ui-express');
// const logger =  require('../config/logger');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E_Learn API',
      version: '1.0.0',
      description: 'backend API for platform',
    },
  },
  apis: ['./swaggerdocs/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
//   logger.info('Docs available at /api/docs');
  console.log('Docs available at /api/docs');
}

module.exports = setupSwagger;