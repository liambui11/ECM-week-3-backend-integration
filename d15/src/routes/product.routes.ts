import { Router } from 'express';
import {
  handleGetAllProducts,
  handleGetProductById,
} from '../controllers/product.controller';

export const productRouter = Router();

productRouter.get('/', handleGetAllProducts);
productRouter.get('/:id', handleGetProductById);

// TODO: Remove before production — test route to simulate unexpected 500 error
productRouter.get('/test/server-error', (_req, _res) => {
  throw new Error('Simulated database connection failure');
});
