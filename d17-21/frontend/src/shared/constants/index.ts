// Named constants for application settings, APIs, and default query configurations (Rule #4).

export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  TIMEOUT_MS: 8000,
} as const;

export const INVENTORY_LIMITS = {
  MIN_PRICE: 0.01,
  MAX_PRICE: 1000000,
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 6,
  SEARCH_DEBOUNCE_MS: 300,
} as const;

export const UI_CONSTANTS = {
  TOAST_DURATION_MS: 4000,
  OFFLINE_BANNER_TEXT: 'Offline Mode: Changes will not be saved. Reconnect to resume operations.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  OFFLINE_ERROR: 'Operation blocked: Device is currently disconnected from the network.',
} as const;

export const SORT_OPTIONS = {
  FIELDS: [
    { label: 'Created Date', value: 'createdAt' },
    { label: 'Product Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Product ID', value: 'id' },
  ] as const,
  ORDERS: [
    { label: 'Descending', value: 'desc' },
    { label: 'Ascending', value: 'asc' },
  ] as const,
} as const;
