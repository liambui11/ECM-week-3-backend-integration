import React, { useState } from 'react';
import { useCategories, CategoryPanel } from './features/categories';
import { ProductPanel } from './features/products';
import OfflineBanner from './shared/components/OfflineBanner/OfflineBanner';
import ErrorBoundary from './shared/components/ErrorBoundary/ErrorBoundary';
import Toast from './shared/components/Toast/Toast';
import "./App.css";

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export const App: React.FC = () => {
  const {
    categories, loading: catLoading, error: catError, opLoading: catOpLoading,
    addCategory, removeCategory
  } = useCategories();

  const [toast, setToast] = useState<ToastState | null>(null);

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleCloseToast = () => setToast(null);

  return (
    <div className="app-container">
      <OfflineBanner />
      
      <header className="app-navbar" id="dashboard-navbar">
        <div className="nav-brand">
          <h1 className="brand-title">E+CRAFTMAN</h1>
        </div>
      </header>

      <main className="dashboard-layout" id="dashboard-main-view">
        <aside className="cat-layout-section">
          <ErrorBoundary fallbackTitle="Category management is offline">
            <CategoryPanel categories={categories} loading={catLoading} error={catError} opLoading={catOpLoading} onAdd={addCategory} onDelete={removeCategory} onToast={triggerToast} />
          </ErrorBoundary>
        </aside>

        <section className="prod-layout-section">
          <ErrorBoundary fallbackTitle="Product catalog is offline">
            <ProductPanel categories={categories} onToast={triggerToast} />
          </ErrorBoundary>
        </section>
      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />
      )}
    </div>
  );
};

export default App;
