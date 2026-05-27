export const SERVER_PORT = 3000;
export const API_BASE_PATH = '/api';

export const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: 'Product not found',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_PRODUCT_ID: 'Invalid product ID format',
} as const;

export const LOG_PREFIX = '[REQUEST]';
