import { Request, Response } from 'express';
import * as productService from '../services/productService';
import { validateProduct, sanitizeProduct } from '../validators/productValidator';
import {
  HTTP_OK,
  HTTP_CREATED,
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
} from '../constants/httpStatus';
import { ApiSuccessResponse, ApiErrorResponse, Product } from '../types';

const RADIX_DECIMAL = 10;

const parseProductId = (rawId: string | string[] | undefined): number => {
  if (!rawId || Array.isArray(rawId)) {
    return NaN;
  }
  return parseInt(rawId, RADIX_DECIMAL);
};

export const handleGetAll = (_req: Request, res: Response): void => {
  const products = productService.getAllProducts();
  const response: ApiSuccessResponse<Product[]> = {
    status: HTTP_OK,
    data: products,
    total: products.length,
  };
  res.status(HTTP_OK).json(response);
};

export const handleGetById = (req: Request, res: Response): void => {
  const id = parseProductId(req.params.id);

  if (Number.isNaN(id)) {
    const response: ApiErrorResponse = {
      status: HTTP_BAD_REQUEST,
      message: 'Product ID must be a valid number.',
    };
    res.status(HTTP_BAD_REQUEST).json(response);
    return;
  }

  const product = productService.getProductById(id);

  if (!product) {
    const response: ApiErrorResponse = {
      status: HTTP_NOT_FOUND,
      message: `Product with ID ${id} not found.`,
    };
    res.status(HTTP_NOT_FOUND).json(response);
    return;
  }

  const response: ApiSuccessResponse<Product> = {
    status: HTTP_OK,
    data: product,
  };
  res.status(HTTP_OK).json(response);
};

export const handleCreate = (req: Request, res: Response): void => {
  const errors = validateProduct(req.body);

  if (errors.length > 0) {
    const response: ApiErrorResponse = {
      status: HTTP_BAD_REQUEST,
      message: 'Validation failed.',
      errors,
    };
    res.status(HTTP_BAD_REQUEST).json(response);
    return;
  }

  const sanitizedData = sanitizeProduct(req.body);
  const newProduct = productService.createProduct(sanitizedData);

  const response: ApiSuccessResponse<Product> = {
    status: HTTP_CREATED,
    message: 'Product created successfully.',
    data: newProduct,
  };
  res.status(HTTP_CREATED).json(response);
};

export const handleUpdate = (req: Request, res: Response): void => {
  const id = parseProductId(req.params.id);

  if (Number.isNaN(id)) {
    const response: ApiErrorResponse = {
      status: HTTP_BAD_REQUEST,
      message: 'Product ID must be a valid number.',
    };
    res.status(HTTP_BAD_REQUEST).json(response);
    return;
  }

  const errors = validateProduct(req.body);

  if (errors.length > 0) {
    const response: ApiErrorResponse = {
      status: HTTP_BAD_REQUEST,
      message: 'Validation failed.',
      errors,
    };
    res.status(HTTP_BAD_REQUEST).json(response);
    return;
  }

  const sanitizedData = sanitizeProduct(req.body);
  const updatedProduct = productService.updateProduct(id, sanitizedData);

  if (!updatedProduct) {
    const response: ApiErrorResponse = {
      status: HTTP_NOT_FOUND,
      message: `Product with ID ${id} not found.`,
    };
    res.status(HTTP_NOT_FOUND).json(response);
    return;
  }

  const response: ApiSuccessResponse<Product> = {
    status: HTTP_OK,
    message: 'Product updated successfully.',
    data: updatedProduct,
  };
  res.status(HTTP_OK).json(response);
};

export const handleDelete = (req: Request, res: Response): void => {
  const id = parseProductId(req.params.id);

  if (Number.isNaN(id)) {
    const response: ApiErrorResponse = {
      status: HTTP_BAD_REQUEST,
      message: 'Product ID must be a valid number.',
    };
    res.status(HTTP_BAD_REQUEST).json(response);
    return;
  }

  const deletedProduct = productService.deleteProduct(id);

  if (!deletedProduct) {
    const response: ApiErrorResponse = {
      status: HTTP_NOT_FOUND,
      message: `Product with ID ${id} not found.`,
    };
    res.status(HTTP_NOT_FOUND).json(response);
    return;
  }

  const response: ApiSuccessResponse<Product> = {
    status: HTTP_OK,
    message: `Product '${deletedProduct.name}' deleted successfully.`,
    data: deletedProduct,
  };
  res.status(HTTP_OK).json(response);
};
