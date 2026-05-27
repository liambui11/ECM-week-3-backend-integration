import { Router } from 'express';
import { validate } from '../../core/middlewares/validate';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {
  productIdParamSchema,
  createProductSchema,
  updateProductSchema,
  getProductsQuerySchema,
} from './product.validator';

const repository = new ProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

const router = Router();

router.get('/', validate(getProductsQuerySchema), controller.getAll);
router.get('/:id', validate(productIdParamSchema), controller.getById);
router.post('/', validate(createProductSchema), controller.create);
router.put(
  '/:id',
  validate(productIdParamSchema),
  validate(updateProductSchema),
  controller.update
);
router.delete('/:id', validate(productIdParamSchema), controller.delete);

export const productRouter = router;
