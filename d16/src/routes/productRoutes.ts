import { Router } from 'express';
import {
  handleGetAll,
  handleGetById,
  handleCreate,
  handleUpdate,
  handleDelete,
} from '../controllers/productController';

const productRouter: Router = Router();

productRouter.get('/', handleGetAll);
productRouter.get('/:id', handleGetById);
productRouter.post('/', handleCreate);
productRouter.put('/:id', handleUpdate);
productRouter.delete('/:id', handleDelete);

export { productRouter };
