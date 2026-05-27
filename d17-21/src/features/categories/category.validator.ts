// Category Request Validation Zod Schemas.

import { z } from 'zod';

export const categoryIdParamSchema = z.object({
  params: z.object({
    id: z.coerce
      .number({
        invalid_type_error: 'Category ID must be a valid number',
      })
      .int('Category ID must be an integer')
      .positive('Category ID must be a positive number'),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Category name is required',
        invalid_type_error: 'Category name must be a string',
      })
      .min(1, 'Category name cannot be empty')
      .max(50, 'Category name is too long (max 50 chars)'),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .max(200, 'Description is too long (max 200 chars)')
      .optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Category name must be a string',
      })
      .min(1, 'Category name cannot be empty')
      .max(50, 'Category name is too long (max 50 chars)')
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .max(200, 'Description is too long (max 200 chars)')
      .optional(),
  }),
});
