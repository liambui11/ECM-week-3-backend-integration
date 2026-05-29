import { apiClient } from '../../../shared/services/api';
import { User } from '../types';

export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User }> => {
    await apiClient.post('/auth/login', { email, password });
    const user = await authApi.me();
    return { user };
  },

  register: async (email: string, password: string): Promise<void> => {
    await apiClient.post('/auth/register', { email, password });
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  me: async (): Promise<User> => {
    const profile = await apiClient.get<any>('/auth/me');
    const rawProfile = profile as any;
    const userId = rawProfile.userId || rawProfile.id;
    const email = rawProfile.email;
    return {
      id: userId,
      email: email,
      name: email ? email.split('@')[0] : 'User',
    };
  },
};
