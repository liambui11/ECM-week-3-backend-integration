// Global Express Error Handler Middleware (Rule #6: Error boundaries / handlers).

import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';
import { HTTP_STATUS } from '../../config/constants';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error(`[Error]: ${err.message}`);

  return errorResponse(
    res,
    err.message || 'Internal Server Error',
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  );
};
