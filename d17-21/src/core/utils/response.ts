// Response formatting helpers to ensure uniform API payload shape (Rule #2).

import { Response } from 'express';
import { HTTP_STATUS } from '../../config/constants';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: unknown;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  status: 'success' | 'error',
  message: string,
  data?: T,
  error?: unknown
): Response => {
  const response: ApiResponse<T> = {
    status,
    message,
    data,
    error,
  };
  return res.status(statusCode).json(response);
};

export const successResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = HTTP_STATUS.OK
): Response => {
  return sendResponse(res, statusCode, 'success', message, data);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  error?: unknown
): Response => {
  return sendResponse(res, statusCode, 'error', message, undefined, error);
};
