import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './category.service';
import { successResponse, errorResponse } from '../../core/utils/response';
import { HTTP_STATUS } from '../../config/constants';
import { Prisma } from '@prisma/client';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const categories = await this.categoryService.getAllCategories();
      return successResponse(res, 'Fetched all categories successfully', categories);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const category = await this.categoryService.getCategoryById(Number(req.params.id));
      if (!category) {
        return errorResponse(res, 'Category not found', HTTP_STATUS.NOT_FOUND);
      }
      return successResponse(res, 'Category found successfully', category);
    } catch (error) {
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const category = await this.categoryService.createCategory(req.body);
      return successResponse(res, 'Category created successfully', category, HTTP_STATUS.CREATED);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return errorResponse(res, 'Category name already exists', HTTP_STATUS.BAD_REQUEST);
      }
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const category = await this.categoryService.updateCategory(Number(req.params.id), req.body);
      return successResponse(res, 'Category updated successfully', category);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return errorResponse(res, 'Category not found', HTTP_STATUS.NOT_FOUND);
      }
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      await this.categoryService.deleteCategory(Number(req.params.id));
      return successResponse(res, 'Category deleted successfully', null, HTTP_STATUS.OK);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return successResponse(res, 'Category already deleted or not found', null, HTTP_STATUS.OK);
      }
      return next(error);
    }
  };
}
