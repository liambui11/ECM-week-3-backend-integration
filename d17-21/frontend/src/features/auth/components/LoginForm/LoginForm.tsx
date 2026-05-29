// LoginForm renders a responsive, highly polished user credentials card with a seamless login/register mode toggle (Rule #1, Rule #2, Rule #9).
import React from 'react';
import { useLoginForm, IAuthService } from '../../hooks/useLoginForm';
import { User } from '../../types';
import './LoginForm.css';

interface LoginInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
  hasError: boolean;
}

export const LoginHeader: React.FC<{ isRegister: boolean }> = ({ isRegister }) => (
  <div className="login-header">
    <h1 className="brand-logo-title">E+CRAFTMAN</h1>
    <h2 className="login-title">{isRegister ? 'Create Account' : 'Sign In'}</h2>
    <p className="login-subtitle">
      {isRegister ? 'Register your E+CRAFTMAN admin credentials' : 'Access your manager panel'}
    </p>
  </div>
);

export const LoginInput: React.FC<LoginInputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  hasError,
}) => (
  <div className="form-group">
    <label className="form-label" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`form-input-field ${hasError ? 'input-error' : ''}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      required
    />
  </div>
);

interface LoginFormProps {
  authService: IAuthService;
  onSuccess: (user: User) => void;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  authService,
  onSuccess,
  onToast,
}) => {
  const {
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
  } = useLoginForm({ authService, onSuccess, onToast });

  return (
    <div className="login-card-container">
      <div className="login-card">
        <LoginHeader isRegister={isRegister} />
        
        <form onSubmit={handleAuth} className="login-form">
          <LoginInput
            id="email-input"
            label="Email Address"
            type="email"
            placeholder="admin@ecraftman.com"
            value={email}
            onChange={setEmail}
            disabled={loading}
            hasError={!!error && !email.includes('@')}
          />
          
          <LoginInput
            id="password-input"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            disabled={loading}
            hasError={!!error && password.length < 6}
          />

          {isRegister && (
            <LoginInput
              id="confirm-password-input"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={setConfirmPassword}
              disabled={loading}
              hasError={!!error && password !== confirmPassword}
            />
          )}

          {error && (
            <div className="form-error-banner" role="alert">
              {error}
            </div>
          )}
          
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : isRegister ? 'Create Account' : 'Sign In to Panel'}
          </button>
        </form>

        <div className="login-toggle-container">
          <button className="login-toggle-btn" onClick={toggleMode} disabled={loading}>
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
