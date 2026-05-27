import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { errorHandler } from './core/middlewares/errorHandler';
import { corsMiddleware } from './core/middlewares/cors.middleware';

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Product CRUD API is running with Validation and Error Handling!');
});

app.use(errorHandler);

export default app;
