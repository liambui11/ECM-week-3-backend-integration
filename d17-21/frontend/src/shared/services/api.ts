import axios, { AxiosResponse } from 'axios';
import { API_CONFIG } from '../constants';

const IDEMPOTENCY_HEADER = 'x-idempotency-key';
const MUTATING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

const generateUUID = (): string => {
  if (typeof self !== 'undefined' && self.crypto && self.crypto.randomUUID) {
    return self.crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  if (method && MUTATING_METHODS.includes(method)) {
    if (config.headers && !config.headers[IDEMPOTENCY_HEADER]) {
      config.headers[IDEMPOTENCY_HEADER] = generateUUID();
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data.data ?? response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'The system has malfunctioned.';
    return Promise.reject(new Error(message));
  }
);

