// Zod Request Validation Middleware (Rule #2: No function > 20 lines, Rule #9).

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, ZodInvalidTypeIssue } from 'zod';
import { errorResponse } from '../utils/response';
import { HTTP_STATUS } from '../../config/constants';

const INVALID_TYPE_CODE = 'invalid_type';

const extractTypeDetails = (issue: ZodInvalidTypeIssue) => ({
  expected: issue.expected,
  received: issue.received,
});

const formatZodIssue = (issue: any) => {
  const base = {
    field: issue.path.slice(1).join('.') || issue.path[0],
    message: issue.message,
    code: issue.code,
  };

  if (issue.code === INVALID_TYPE_CODE) {
    return { ...base, ...extractTypeDetails(issue as ZodInvalidTypeIssue) };
  }
  return base;
};

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      if (schema.shape.body) req.body = parsed.body;
      if (schema.shape.query) req.query = parsed.query;
      if (schema.shape.params) req.params = parsed.params;
      
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.issues.map(formatZodIssue);
        return errorResponse(
          res,
          'Validation failed: Please check your input data',
          HTTP_STATUS.BAD_REQUEST,
          validationErrors
        );
      }
      return next(error);
    }
  };
