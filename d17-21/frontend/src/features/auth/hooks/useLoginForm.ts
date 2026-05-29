import { useState, FormEvent } from 'react';
import { IAuthService } from '../services/AuthService';
import { User } from '../types';

interface UseLoginFormProps {
  authService: IAuthService;
  onSuccess: (user: User) => void;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

export const useLoginForm = ({ authService, onSuccess, onToast }: UseLoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MIN_PASSWORD_LEN = 6;

  const validateInputs = (): boolean => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < MIN_PASSWORD_LEN) {
      setError(`Password must be at least ${MIN_PASSWORD_LEN} characters.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(email, password);
      onToast('Login successful!', 'success');
      onSuccess(response.user);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Login failed';
      setError(errMsg);
      onToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};
