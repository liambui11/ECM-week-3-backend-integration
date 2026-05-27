// Express app setup — assembles middlewares, routes, and error handling

import express, { Application } from 'express';
import { API_BASE_PATH } from './constants/app.constants';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { productRouter } from './routes/product.routes';

export const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);

  app.use(`${API_BASE_PATH}/products`, productRouter);

  app.use(errorHandler);

  return app;
};
