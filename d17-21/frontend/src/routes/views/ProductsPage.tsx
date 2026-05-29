import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCategories } from '../../features/categories';
import { ProductPanel } from '../../features/products';
import ErrorBoundary from '../../shared/components/ErrorBoundary/ErrorBoundary';
import { DashboardContextType } from './DashboardLayout';

export const ProductsPage: React.FC = () => {
  const { triggerToast } = useOutletContext<DashboardContextType>();
  const { categories } = useCategories();

  return (
    <section className="prod-layout-section" style={{ width: '100%' }} id="products-view-section">
      <ErrorBoundary fallbackTitle="Product catalog is offline">
        <ProductPanel categories={categories} onToast={triggerToast} />
      </ErrorBoundary>
    </section>
  );
};

export default ProductsPage;
