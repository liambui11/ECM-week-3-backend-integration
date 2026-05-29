import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import Navbar from '../../shared/components/Navbar/Navbar';
import OfflineBanner from '../../shared/components/OfflineBanner/OfflineBanner';
import Toast from '../../shared/components/Toast/Toast';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export interface DashboardContextType {
  triggerToast: (message: string, type: 'success' | 'error') => void;
}

export const DashboardLayout: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const [toast, setToast] = useState<ToastState | null>(null);

  const triggerToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      triggerToast('Logged out successfully', 'success');
    } catch {
      triggerToast('Logout failed. Please try again.', 'error');
    }
  }, [logoutUser, triggerToast]);

  const handleToastClose = useCallback(() => {
    setToast(null);
  }, []);

  if (!user) return null;

  return (
    <div className="app-container">
      <OfflineBanner />
      
      <div className="dashboard-body-wrapper">
        <Navbar onLogout={handleLogout} />

        <main className="dashboard-layout" id="dashboard-main-view">
          <Outlet context={{ triggerToast }} />
        </main>
      </div>

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

export default DashboardLayout;
