export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const DEFAULT_PORT = 3000;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const SORTING = {
  DEFAULT_FIELD: 'id',
  DEFAULT_ORDER: 'asc',
  ALLOWED_FIELDS: ['id', 'name', 'price', 'createdAt'],
} as const;
