import React, { useState } from 'react';
import { Product, Category, CreateProductInput, ProductQueryParams } from '../../../../shared/types';
import { INVENTORY_LIMITS } from '../../../../shared/constants';
import ProductCard from '../ProductCard/ProductCard';
import ProductFilterBar from '../ProductFilterBar/ProductFilterBar';
import ProductForm from '../ProductForm/ProductForm';
import { useProducts } from '../../hooks/useProducts';
import './ProductPanel.css';

interface ProductPanelProps {
  categories: Category[];
  onToast: (msg: string, type: 'success' | 'error') => void;
}

const DEFAULT_QUERY: ProductQueryParams = {
  page: INVENTORY_LIMITS.DEFAULT_PAGE,
  limit: INVENTORY_LIMITS.DEFAULT_LIMIT,
  sort: 'createdAt',
  order: 'desc',
};

export const ProductPanel: React.FC<ProductPanelProps> = ({ categories, onToast }) => {
  const {
    products, pagination, queryParams, loading, error, opLoading,
    setQueryParams, addProduct, editProduct, removeProduct
  } = useProducts(DEFAULT_QUERY);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (p: Product) => {
    setEditingProduct(p);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (input: CreateProductInput) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, input);
    } else {
      await addProduct(input);
    }
  };

  const handleFilterChange = (filters: Partial<ProductQueryParams>) => {
    setQueryParams((prev) => ({ ...prev, ...filters }));
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      handleFilterChange({ page: pagination.currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      handleFilterChange({ page: pagination.currentPage + 1 });
    }
  };

  return (
    <div className="product-panel">
      <div className="prod-panel-header">
        <h3 className="panel-title">Inventory Items</h3>
        <button className="prod-add-btn" onClick={handleAddClick}>+ Add Product</button>
      </div>

      <ProductFilterBar categories={categories} queryParams={queryParams} onFilterChange={handleFilterChange} />

      {error && <div className="prod-error">Failed loading products: {error}</div>}

      {loading ? (
        <div className="prod-grid-skeleton">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="prod-empty">No products match the selected criteria.</div>
      ) : (
        <div className="prod-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} categories={categories} isDeleting={!!opLoading[`delete-${p.id}`]} onDelete={removeProduct} onEdit={handleEditClick} />
          ))}
        </div>
      )}

      <div className="pagination-bar">
        <button className="pag-btn" onClick={handlePrevPage} disabled={pagination.currentPage <= 1 || loading}>Prev</button>
        <span className="pag-info">Page {pagination.currentPage} of {pagination.totalPages}</span>
        <button className="pag-btn" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages || loading}>Next</button>
      </div>

      {isFormOpen && (
        <ProductForm categories={categories} product={editingProduct} submitting={opLoading.create || (editingProduct ? !!opLoading[`update-${editingProduct.id}`] : false)} onSubmit={handleFormSubmit} onClose={() => setIsFormOpen(false)} onToast={onToast} />
      )}
    </div>
  );
};

export default ProductPanel;
