import { Router } from 'express';
import { productRouter } from '../features/products';
import { categoryRouter } from '../features/categories';

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);

export default router;
