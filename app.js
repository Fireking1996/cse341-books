
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './src/router.js';
import swaggerSpec from './src/config/swagger.js';

const app = express();

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use(router);

// Root route
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is running' });
});

export default app;
