import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';
import { IAuthService } from '../../services/AuthService';
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

export const LoginHeader: React.FC = () => (
  <div className="login-header">
    <h2 className="login-title">Sign In</h2>
    <p className="login-subtitle">Access your E+CRAFTMAN manager panel</p>
  </div>
);

export const LoginInput: React.FC<LoginInputProps> = ({
  id, label, type, placeholder, value, onChange, disabled, hasError
}) => (
  <div className="form-group">
    <label className="form-label" htmlFor={id}>{label}</label>
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

export const LoginFooter: React.FC = () => (
  <div className="login-footer">
    <p className="demo-credentials-title">Demo Credentials</p>
    <p className="demo-credential">Email: <code>admin@ecraftman.com</code></p>
    <p className="demo-credential">Password: <code>Password123</code></p>
  </div>
);

interface LoginFormProps {
  authService: IAuthService;
  onSuccess: (user: User) => void;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  authService, onSuccess, onToast
}) => {
  const {
    email, setEmail, password, setPassword, loading, error, handleLogin
  } = useLoginForm({ authService, onSuccess, onToast });

  return (
    <div className="login-card-container">
      <div className="login-card">
        <LoginHeader />
        <form onSubmit={handleLogin} className="login-form">
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
          {error && <div className="form-error-banner" role="alert">{error}</div>}
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Sign In to Panel'}
          </button>
        </form>
        <LoginFooter />
      </div>
    </div>
  );
};
