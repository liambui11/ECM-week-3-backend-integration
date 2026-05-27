import { Product } from '../types/product.types';
import { AppError } from '../types/error.types';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants/app.constants';
import { findAllProducts, findProductById } from '../models/product.model';

export const getAllProducts = (): Product[] => {
  return findAllProducts();
};

export const getProductById = (id: number): Product => {
  validateProductId(id);
  const product = findProductById(id);
  if (!product) {
    throw new AppError(
      ERROR_MESSAGES.PRODUCT_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }
  return product;
};

const validateProductId = (id: number): void => {
  if (isNaN(id) || id <= 0) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_PRODUCT_ID,
      HTTP_STATUS.NOT_FOUND
    );
  }
};
