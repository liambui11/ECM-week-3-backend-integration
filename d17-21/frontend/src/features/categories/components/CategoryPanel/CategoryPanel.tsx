import React, { useState } from 'react';
import { Category } from '../../../../shared/types';
import CategoryCard from '../CategoryCard/CategoryCard';
import './CategoryPanel.css';

interface CategoryPanelProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
  opLoading: Record<string, boolean>;
  onAdd: (name: string, desc?: string) => Promise<Category>;
  onDelete: (id: number) => Promise<void>;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

export const CategoryPanel: React.FC<CategoryPanelProps> = ({
  categories, loading, error, opLoading, onAdd, onDelete, onToast
}) => {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await onAdd(name.trim(), desc.trim() || undefined);
      setName('');
      setDesc('');
      onToast('Category created successfully', 'success');
    } catch (err) {
      onToast(err instanceof Error ? err.message : 'Error creating category', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
      onToast('Category deleted successfully', 'success');
    } catch (err) {
      onToast(err instanceof Error ? err.message : 'Error deleting category', 'error');
    }
  };

  if (loading) return <div className="cat-panel-loader">Loading categories...</div>;
  if (error) return <div className="cat-panel-error">Failed: {error}</div>;

  return (
    <div className="category-panel">
      <h3 className="panel-title">Manage Categories</h3>
      
      <form onSubmit={handleSubmit} className="cat-form">
        <input className="cat-input" type="text" placeholder="Category Name..." value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="cat-input" type="text" placeholder="Description (Optional)..." value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button type="submit" className="cat-submit-btn" disabled={opLoading.create}>
          {opLoading.create ? 'Creating...' : 'Add Category'}
        </button>
      </form>

      <div className="cat-list">
        {categories.length === 0 ? (
          <p className="cat-empty-msg">No categories created yet.</p>
        ) : (
          categories.map((c) => (
            <CategoryCard key={c.id} category={c} isDeleting={!!opLoading[`delete-${c.id}`]} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPanel;
