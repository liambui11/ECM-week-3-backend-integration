import { apiClient } from '../../../shared/services/api';
import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../../../shared/types';

export const categoryApi = {
  getMany: (): Promise<Category[]> => {
    return apiClient.get('/categories');
  },

  create: (input: CreateCategoryInput): Promise<Category> => {
    return apiClient.post('/categories', input);
  },

  update: (id: number, input: UpdateCategoryInput): Promise<Category> => {
    return apiClient.put(`/categories/${id}`, input);
  },

  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/categories/${id}`);
  },
};
