// Product Domain Entity Interface definition (Rule #9: No any types).

import { Category } from '../categories/category.entity';
import { Prisma } from '@prisma/client';

export interface Product {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  price: Prisma.Decimal;
  categoryId: number;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}
