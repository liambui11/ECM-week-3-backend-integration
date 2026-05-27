// Type definitions for the Product entity

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  error: string;
  message: string;
}
