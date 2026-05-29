import { Router } from 'express';
import { productRouter } from '../features/products';
import { categoryRouter } from '../features/categories';
import { authRouter } from '../features/auth';

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);

export default router;
