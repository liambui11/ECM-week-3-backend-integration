import { Prisma } from '@prisma/client';
import { Category } from '../categories/category.entity';

export interface CreateProductDto {
  name: string;
  description?: string;
  image?: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  categoryId?: number;
}

export interface GetProductsQueryDto {
  page: number;
  limit: number;
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sort: 'id' | 'name' | 'price' | 'createdAt';
  order: 'asc' | 'desc';
}

export interface ProductResponseDto {
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
