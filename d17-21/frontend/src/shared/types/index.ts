// TypeScript type and interface declarations for models, DTOs, and API responses (Rule #9).

export interface Category {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  price: number; // Stored as decimal on backend, handled as number in UI
  categoryId: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface SuccessResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

export interface ErrorResponse {
  status: 'error';
  message: string;
  error?: string | Record<string, string[]>;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  image?: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  categoryId?: number;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
}

export interface ProductQueryParams {
  page: number;
  limit: number;
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sort: 'id' | 'name' | 'price' | 'createdAt';
  order: 'asc' | 'desc';
}
