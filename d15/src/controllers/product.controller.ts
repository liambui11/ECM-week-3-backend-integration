// Product controller — handles HTTP request/response, delegates logic to service

import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/app.constants';
import * as productService from '../services/product.service';
import { ApiResponse } from '../types/product.types';
import { Product } from '../types/product.types';

export const handleGetAllProducts = (
  _req: Request,
  res: Response<ApiResponse<Product[]>>,
  next: NextFunction
): void => {
  try {
    const products = productService.getAllProducts();
    res.status(HTTP_STATUS.OK).json({
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetProductById = (
  req: Request,
  res: Response<ApiResponse<Product>>,
  next: NextFunction
): void => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = productService.getProductById(id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      statusCode: HTTP_STATUS.OK,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
