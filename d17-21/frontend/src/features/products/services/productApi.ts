import { apiClient } from '../../../shared/services/api';
import {
  CreateProductInput,
  Pagination,
  Product,
  ProductQueryParams,
  UpdateProductInput,
} from '../../../shared/types';

export const productApi = {
  getMany: (
    q: ProductQueryParams
  ): Promise<{ products: Product[]; pagination: Pagination }> => {
    return apiClient.get('/products', {
      params: q,
    });
  },

  getOne: (id: number): Promise<Product> => {
    return apiClient.get(`/products/${id}`);
  },

  create: (input: CreateProductInput): Promise<Product> => {
    return apiClient.post('/products', input);
  },

  update: (id: number, input: UpdateProductInput): Promise<Product> => {
    return apiClient.put(`/products/${id}`, input);
  },

  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/products/${id}`);
  },
};
