// Global error handler middleware — catches unhandled errors and returns 500.

import { Request, Response, NextFunction } from 'express';
import { HTTP_INTERNAL_SERVER_ERROR } from '../constants/httpStatus';
import { ApiErrorResponse } from '../types';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Unhandled error:', err.message);
  console.error(err.stack);

  const response: ApiErrorResponse = {
    status: HTTP_INTERNAL_SERVER_ERROR,
    message: 'Internal server error. Please try again later.',
  };

  res.status(HTTP_INTERNAL_SERVER_ERROR).json(response);
};
