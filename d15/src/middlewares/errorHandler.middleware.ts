// Error handling middleware — catches all errors and returns safe JSON responses

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error.types';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants/app.constants';
import { ApiErrorResponse } from '../types/product.types';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    handleOperationalError(err, res);
    return;
  }
  handleUnexpectedError(err, res);
};

const handleOperationalError = (
  err: AppError,
  res: Response<ApiErrorResponse>
): void => {
  res.status(err.statusCode).json({
    success: false,
    statusCode: err.statusCode,
    error: err.message,
    message: err.message,
  });
};

const handleUnexpectedError = (
  err: Error,
  res: Response<ApiErrorResponse>
): void => {
  console.error('[UNEXPECTED ERROR]', err.message);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    error: ERROR_MESSAGES.INTERNAL_ERROR,
    message: ERROR_MESSAGES.INTERNAL_ERROR,
  });
};
