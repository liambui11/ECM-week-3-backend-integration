import { LoginResponse, User } from '../types';

export interface IAuthService {
  login(email: string, password: string): Promise<LoginResponse>;
  logout(): void;
  getCurrentUser(): User | null;
}

export class AuthService implements IAuthService {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'auth_user';
  private static readonly SIMULATED_EMAIL = 'admin@ecraftman.com';
  private static readonly SIMULATED_PASS = 'Password123';
  private static readonly DELAY_MS = 1000;

  public async login(email: string, password: string): Promise<LoginResponse> {
    await new Promise((resolve) => setTimeout(resolve, AuthService.DELAY_MS));

    if (email === AuthService.SIMULATED_EMAIL && password === AuthService.SIMULATED_PASS) {
      const mockUser: User = {
        id: 'user_123',
        email: AuthService.SIMULATED_EMAIL,
        name: 'Craftman Admin',
      };
      
      localStorage.setItem(AuthService.TOKEN_KEY, 'mock-jwt-token-xyz');
      localStorage.setItem(AuthService.USER_KEY, JSON.stringify(mockUser));

      return {
        token: 'mock-jwt-token-xyz',
        user: mockUser,
      };
    }

    throw new Error('Invalid email or password');
  }

  public logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
  }

  public getCurrentUser(): User | null {
    const userStr = localStorage.getItem(AuthService.USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }
}
