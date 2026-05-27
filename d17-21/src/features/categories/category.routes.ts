import { Router } from 'express';
import { validate } from '../../core/middlewares/validate';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {
  categoryIdParamSchema,
  createCategorySchema,
  updateCategorySchema,
} from './category.validator';

const repository = new CategoryRepository();
const service = new CategoryService(repository);
const controller = new CategoryController(service);

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', validate(categoryIdParamSchema), controller.getById);
router.post('/', validate(createCategorySchema), controller.create);
router.put(
  '/:id',
  validate(categoryIdParamSchema),
  validate(updateCategorySchema),
  controller.update
);
router.delete('/:id', validate(categoryIdParamSchema), controller.delete);

export const categoryRouter = router;
