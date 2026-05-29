import React, { useState, useEffect } from 'react';
import { Product, Category, CreateProductInput } from '../../../../shared/types';
import './ProductForm.css';

interface ProductFormProps {
  categories: Category[];
  product: Product | null;
  submitting: boolean;
  onSubmit: (input: CreateProductInput) => Promise<unknown>;
  onClose: () => void;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  categories, product, submitting, onSubmit, onClose, onToast
}) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [img, setImg] = useState<string>('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setCategoryId(product.categoryId.toString());
      setDesc(product.description || '');
      setImg(product.image || '');
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !categoryId) return;
    try {
      await onSubmit({
        name: name.trim(),
        price: Number(price),
        categoryId: Number(categoryId),
        description: desc.trim() || undefined,
        image: img.trim() || undefined,
      });
      onToast(product ? 'Product updated' : 'Product created', 'success');
      onClose();
    } catch (err) {
      onToast(err instanceof Error ? err.message : 'Action failed', 'error');
    }
  };

  return (
    <div className="form-overlay" role="dialog" aria-modal="true">
      <div className="form-modal">
        <h3 className="modal-title">{product ? 'Update Inventory Item' : 'New Inventory Item'}</h3>
        <form onSubmit={handleSubmit} className="modal-fields">
          <input className="form-input" type="text" placeholder="Product Name..." value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="form-input" type="number" step="0.01" placeholder="Price ($)..." value={price} onChange={(e) => setPrice(e.target.value)} required />
          <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Select Category...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input className="form-input" type="url" placeholder="Image URL (Optional)..." value={img} onChange={(e) => setImg(e.target.value)} />
          <textarea className="form-textarea" placeholder="Description (Optional)..." value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} />
          <div className="form-actions">
            <button type="button" className="form-btn" onClick={onClose} disabled={submitting}>Cancel</button>
            <button type="submit" className="form-btn form-btn-submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
