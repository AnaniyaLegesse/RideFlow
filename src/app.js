import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'RideFlow API Docs',
  customCss: '.swagger-ui .topbar { background-color: #1a1a2e; }',
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

app.use('/api', router);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

app.use(errorHandler);

export default app;