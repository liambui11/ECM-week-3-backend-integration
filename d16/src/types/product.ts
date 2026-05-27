// Product entity and related types used across the application.

export type ProductCategory = 'electronics' | 'clothing' | 'food' | 'books' | 'toys';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  stock: number;
}

export type CreateProductInput = Omit<Product, 'id'>;
