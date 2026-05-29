// Global Express Error Handler Middleware (Rule #6: Error boundaries / handlers).

import { Request, Response, NextFunction } from 'express';
import { errorResponse, AppError } from '../utils/response';
import { HTTP_STATUS } from '../../config/constants';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error(`[Error]: ${err.message}`);

  const statusCode = err instanceof AppError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;

  return errorResponse(
    res,
    err.message || 'Internal Server Error',
    statusCode,
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  );
};
