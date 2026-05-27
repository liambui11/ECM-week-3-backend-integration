// Product HTTP Controller (Rule #2: No function > 20 lines, Rule #9).

import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';
import { successResponse, errorResponse } from '../../core/utils/response';
import { HTTP_STATUS } from '../../config/constants';
import { Prisma } from '@prisma/client';
import { GetProductsQueryDto } from './product.dto';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const q = req.query as unknown as GetProductsQueryDto;
      const { items, total } = await this.productService.getAllProducts(q);
      const pagination = {
        totalItems: total,
        totalPages: Math.ceil(total / q.limit),
        currentPage: q.page,
        limit: q.limit,
      };
      return successResponse(res, 'Fetched all products successfully', { products: items, pagination });
    } catch (error) {
      return next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const product = await this.productService.getProductById(Number(req.params.id));
      if (!product) {
        return errorResponse(res, 'Product not found', HTTP_STATUS.NOT_FOUND);
      }
      return successResponse(res, 'Product found successfully', product);
    } catch (error) {
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const product = await this.productService.createProduct(req.body);
      return successResponse(res, 'Product created successfully', product, HTTP_STATUS.CREATED);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const product = await this.productService.updateProduct(Number(req.params.id), req.body);
      return successResponse(res, 'Product updated successfully', product);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return errorResponse(res, 'Product not found', HTTP_STATUS.NOT_FOUND);
      }
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      await this.productService.deleteProduct(Number(req.params.id));
      return successResponse(res, 'Product deleted successfully', null, HTTP_STATUS.OK);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return successResponse(res, 'Product already deleted or not found', null, HTTP_STATUS.OK);
      }
      return next(error);
    }
  };
}
