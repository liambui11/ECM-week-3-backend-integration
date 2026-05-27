// In-memory product data store with seed data for development.

import { Product } from '../types';

const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 59.99,
    category: 'electronics',
    stock: 25,
  },
  {
    id: 2,
    name: 'Cotton T-Shirt',
    price: 19.99,
    category: 'clothing',
    stock: 100,
  },
  {
    id: 3,
    name: 'Organic Coffee Beans',
    price: 12.5,
    category: 'food',
    stock: 50,
  },
  {
    id: 4,
    name: 'JavaScript: The Good Parts',
    price: 29.99,
    category: 'books',
    stock: 15,
  },
  {
    id: 5,
    name: 'Building Blocks Set',
    price: 34.99,
    category: 'toys',
    stock: 40,
  },
];

let products: Product[] = [...SEED_PRODUCTS.map((p) => ({ ...p }))];

export const getProducts = (): Product[] => products;

export const setProducts = (newProducts: Product[]): void => {
  products = newProducts;
};

export const resetProducts = (): void => {
  products = [...SEED_PRODUCTS.map((p) => ({ ...p }))];
};
