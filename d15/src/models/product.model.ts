import { Product } from '../types/product.types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 79.99,
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 2,
    name: 'Organic Green Tea',
    description: 'Pack of 50 individually wrapped organic green tea bags',
    price: 12.49,
    category: 'Food & Beverages',
    inStock: true,
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    description: 'Adjustable lumbar support chair with breathable mesh back',
    price: 249.99,
    category: 'Furniture',
    inStock: false,
  },
  {
    id: 4,
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall insulated 750ml bottle, keeps drinks cold for 24 hours',
    price: 24.99,
    category: 'Kitchen',
    inStock: true,
  },
  {
    id: 5,
    name: 'TypeScript Design Patterns Book',
    description: 'Comprehensive guide to design patterns with TypeScript examples',
    price: 39.99,
    category: 'Books',
    inStock: true,
  },
];

export const findAllProducts = (): Product[] => {
  return [...MOCK_PRODUCTS];
};

export const findProductById = (id: number): Product | undefined => {
  return MOCK_PRODUCTS.find((product) => product.id === id);
};
