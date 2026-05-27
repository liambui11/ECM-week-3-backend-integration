// Express app setup — configures middleware, routes, and error handling.

import express, { Request, Response } from 'express';
import { productRouter } from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';
import { ApiHealthResponse } from './types';

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);

app.get('/api/health', (_req: Request, res: Response) => {
  const response: ApiHealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

app.use(errorHandler);

export { app };
