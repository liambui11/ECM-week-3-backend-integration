import React, { useState, useCallback } from 'react';
import { LoginForm, authApi, useAuth } from '../../features/auth';
import OfflineBanner from '../../shared/components/OfflineBanner/OfflineBanner';
import ErrorBoundary from '../../shared/components/ErrorBoundary/ErrorBoundary';
import Toast from '../../shared/components/Toast/Toast';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export const LoginPage: React.FC = () => {
  const { loginUser } = useAuth();
  const [toast, setToast] = useState<ToastState | null>(null);

  const triggerToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  }, []);

  const handleToastClose = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <div className="app-container">
      <OfflineBanner />
      <main className="login-layout-view">
        <ErrorBoundary fallbackTitle="Login feature is offline">
          <LoginForm
            authService={authApi}
            onSuccess={loginUser}
            onToast={triggerToast}
          />
        </ErrorBoundary>
      </main>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default LoginPage;
