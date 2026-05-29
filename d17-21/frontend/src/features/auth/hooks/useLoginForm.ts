import { useState, FormEvent, useCallback } from 'react';
import { User } from '../types';

export interface IAuthService {
  login: (email: string, password: string) => Promise<{ user: User }>;
  register: (email: string, password: string) => Promise<void>;
}

interface UseLoginFormProps {
  authService: IAuthService;
  onSuccess: (user: User) => void;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

export const useLoginForm = ({
  authService,
  onSuccess,
  onToast,
}: UseLoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
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
    if (isRegister && password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        await authService.register(email, password);
        onToast('Registration successful! Logging in...', 'success');
      }
      const response = await authService.login(email, password);
      if (!isRegister) {
        onToast('Login successful!', 'success');
      }
      onSuccess(response.user);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Operation failed';
      setError(errMsg);
      onToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = useCallback(() => {
    setIsRegister((prev) => !prev);
    setError(null);
    setPassword('');
    setConfirmPassword('');
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isRegister,
    toggleMode,
    loading,
    error,
    handleAuth,
  };
};

export default useLoginForm;
