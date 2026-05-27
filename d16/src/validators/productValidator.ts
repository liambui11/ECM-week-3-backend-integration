import { ValidationError, CreateProductInput, ProductCategory } from '../types';
import { ALLOWED_CATEGORIES } from '../constants/productConstants';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;

const validateName = (name: unknown): ValidationError | null => {
  if (name === undefined || name === null) {
    return { field: 'name', message: 'Name is required.' };
  }
  if (typeof name !== 'string') {
    return { field: 'name', message: 'Name must be a string.' };
  }
  if (name.trim().length < NAME_MIN_LENGTH) {
    return { field: 'name', message: `Name must be at least ${NAME_MIN_LENGTH} characters.` };
  }
  if (name.trim().length > NAME_MAX_LENGTH) {
    return { field: 'name', message: `Name must be at most ${NAME_MAX_LENGTH} characters.` };
  }
  return null;
};

const validatePrice = (price: unknown): ValidationError | null => {
  if (price === undefined || price === null) {
    return { field: 'price', message: 'Price is required.' };
  }
  if (typeof price !== 'number' || Number.isNaN(price)) {
    return { field: 'price', message: 'Price must be a valid number.' };
  }
  if (price <= 0) {
    return { field: 'price', message: 'Price must be greater than 0.' };
  }
  return null;
};

const validateCategory = (category: unknown): ValidationError | null => {
  if (category === undefined || category === null) {
    return { field: 'category', message: 'Category is required.' };
  }
  if (!ALLOWED_CATEGORIES.includes(category as ProductCategory)) {
    return {
      field: 'category',
      message: `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}.`,
    };
  }
  return null;
};

const validateStock = (stock: unknown): ValidationError | null => {
  if (stock === undefined || stock === null) {
    return { field: 'stock', message: 'Stock is required.' };
  }
  if (typeof stock !== 'number' || !Number.isInteger(stock)) {
    return { field: 'stock', message: 'Stock must be an integer.' };
  }
  if (stock < 0) {
    return { field: 'stock', message: 'Stock must be 0 or greater.' };
  }
  return null;
};

interface RequestBody {
  name?: unknown;
  price?: unknown;
  category?: unknown;
  stock?: unknown;
}

export const validateProduct = (body: RequestBody): ValidationError[] => {
  const validators = [
    validateName(body.name),
    validatePrice(body.price),
    validateCategory(body.category),
    validateStock(body.stock),
  ];

  return validators.filter((error): error is ValidationError => error !== null);
};

export const sanitizeProduct = (body: RequestBody): CreateProductInput => ({
  name: body.name as string,
  price: body.price as number,
  category: body.category as ProductCategory,
  stock: body.stock as number,
});
