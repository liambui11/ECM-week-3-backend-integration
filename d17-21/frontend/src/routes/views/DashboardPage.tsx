import React, { useState, useCallback } from 'react';
import { useAuth } from '../../features/auth';
import { useCategories, CategoryPanel } from '../../features/categories';
import { ProductPanel } from '../../features/products';
import OfflineBanner from '../../shared/components/OfflineBanner/OfflineBanner';
import ErrorBoundary from '../../shared/components/ErrorBoundary/ErrorBoundary';
import Toast from '../../shared/components/Toast/Toast';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export const DashboardPage: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const [toast, setToast] = useState<ToastState | null>(null);

  const {
    categories,
    loading: catLoading,
    error: catError,
    opLoading: catOpLoading,
    addCategory,
    removeCategory,
  } = useCategories();

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
      
      <header className="app-navbar" id="dashboard-navbar">
        <div className="nav-brand">
          <h1 className="brand-title">E+CRAFTMAN</h1>
        </div>
        <div className="nav-actions">
          <span className="user-greeting">Welcome, {user.name}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-layout" id="dashboard-main-view">
        <aside className="cat-layout-section">
          <ErrorBoundary fallbackTitle="Category management is offline">
            <CategoryPanel
              categories={categories}
              loading={catLoading}
              error={catError}
              opLoading={catOpLoading}
              onAdd={addCategory}
              onDelete={removeCategory}
              onToast={triggerToast}
            />
          </ErrorBoundary>
        </aside>

        <section className="prod-layout-section">
          <ErrorBoundary fallbackTitle="Product catalog is offline">
            <ProductPanel categories={categories} onToast={triggerToast} />
          </ErrorBoundary>
        </section>
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

export default DashboardPage;
