// Product Request Validation Zod Schemas.

import { z } from 'zod';
import { PAGINATION, SORTING } from '../../config/constants';

export const productIdParamSchema = z.object({
  params: z.object({
    id: z.coerce
      .number({
        invalid_type_error: 'Product ID must be a valid number',
      })
      .int('Product ID must be an integer')
      .positive('Product ID must be a positive number'),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Product name is required',
        invalid_type_error: 'Product name must be a string',
      })
      .min(1, 'Product name cannot be empty'),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .max(500, 'Description is too long (max 500 chars)')
      .optional(),
    image: z
      .string({
        invalid_type_error: 'Image must be a string',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be greater than zero'),
    categoryId: z
      .number({
        required_error: 'Category ID is required',
        invalid_type_error: 'Category ID must be a number',
      })
      .int()
      .positive('Category ID must be a positive integer'),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Product name must be a string',
      })
      .min(1, 'Product name cannot be empty')
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .max(500, 'Description is too long (max 500 chars)')
      .optional(),
    image: z
      .string({
        invalid_type_error: 'Image must be a string',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be greater than zero')
      .optional(),
    categoryId: z
      .number({
        invalid_type_error: 'Category ID must be a number',
      })
      .int()
      .positive()
      .optional(),
  }),
});

export const getProductsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(PAGINATION.DEFAULT_PAGE),
    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(PAGINATION.MAX_LIMIT, `Limit cannot exceed ${PAGINATION.MAX_LIMIT}`)
      .default(PAGINATION.DEFAULT_LIMIT),
    search: z.string().optional(),
    categoryId: z.coerce.number().int().positive().optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    sort: z.enum(SORTING.ALLOWED_FIELDS).default(SORTING.DEFAULT_FIELD),
    order: z.enum(['asc', 'desc']).default(SORTING.DEFAULT_ORDER),
  }),
});
