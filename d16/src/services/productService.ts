// Business logic layer for product CRUD operations.
// Operates on the in-memory data store with full type safety.

import { Product, CreateProductInput } from '../types';
import { getProducts } from '../data/mockProducts';
import { generateId } from '../utils/idGenerator';

export const getAllProducts = (): Product[] => {
  return getProducts();
};

export const getProductById = (id: number): Product | null => {
  const products = getProducts();
  return products.find((product) => product.id === id) || null;
};

export const createProduct = (productData: CreateProductInput): Product => {
  const products = getProducts();
  const newProduct: Product = {
    id: generateId(),
    ...productData,
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: number, productData: CreateProductInput): Product | null => {
  const products = getProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  const updatedProduct: Product = { id, ...productData };
  products[index] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = (id: number): Product | null => {
  const products = getProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedProduct] = products.splice(index, 1);
  return deletedProduct;
};
