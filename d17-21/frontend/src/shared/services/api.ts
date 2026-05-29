// Centralized API client using fetch to communicate with the Express backend (Rule #2).

import { API_CONFIG } from '../constants';
import {
  Category,
  Product,
  Pagination,
  CreateProductInput,
  UpdateProductInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  ProductQueryParams,
} from '../types';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || `Request failed with code ${response.status}`);
  }
  return json.data as T;
}

export const api = {
  getCategories: (): Promise<Category[]> => {
    return request<Category[]>('/categories');
  },
  
  createCategory: (input: CreateCategoryInput): Promise<Category> => {
    return request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  
  updateCategory: (id: number, input: UpdateCategoryInput): Promise<Category> => {
    return request<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
  },
  
  deleteCategory: (id: number): Promise<void> => {
    return request<void>(`/categories/${id}`, {
      method: 'DELETE',
    });
  },

  getProducts: (q: ProductQueryParams): Promise<{ products: Product[]; pagination: Pagination }> => {
    const params = new URLSearchParams();
    Object.entries(q).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        params.append(key, String(val));
      }
    });
    return request<{ products: Product[]; pagination: Pagination }>(`/products?${params.toString()}`);
  },

  getProduct: (id: number): Promise<Product> => {
    return request<Product>(`/products/${id}`);
  },

  createProduct: (input: CreateProductInput): Promise<Product> => {
    return request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  updateProduct: (id: number, input: UpdateProductInput): Promise<Product> => {
    return request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
  },

  deleteProduct: (id: number): Promise<void> => {
    return request<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};
export default api;
