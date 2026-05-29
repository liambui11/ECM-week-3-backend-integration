import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCategories, CategoryPanel } from '../../features/categories';
import ErrorBoundary from '../../shared/components/ErrorBoundary/ErrorBoundary';
import { DashboardContextType } from './DashboardLayout';

export const CategoriesPage: React.FC = () => {
  const { triggerToast } = useOutletContext<DashboardContextType>();
  const {
    categories,
    loading,
    error,
    opLoading,
    addCategory,
    removeCategory,
  } = useCategories();

  return (
    <aside className="cat-layout-section" style={{ width: '100%', maxWidth: 'none' }} id="categories-view-section">
      <ErrorBoundary fallbackTitle="Category management is offline">
        <CategoryPanel
          categories={categories}
          loading={loading}
          error={error}
          opLoading={opLoading}
          onAdd={addCategory}
          onDelete={removeCategory}
          onToast={triggerToast}
        />
      </ErrorBoundary>
    </aside>
  );
};

export default CategoriesPage;
