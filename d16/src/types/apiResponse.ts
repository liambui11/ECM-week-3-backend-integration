import { ValidationError } from './validation';

export interface ApiSuccessResponse<T> {
  status: number;
  data: T;
  message?: string;
  total?: number;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  errors?: ValidationError[];
}

export interface ApiHealthResponse {
  status: string;
  timestamp: string;
}
