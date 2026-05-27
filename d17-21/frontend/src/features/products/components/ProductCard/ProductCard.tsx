// ProductCard component displaying product metrics and action buttons (Rule #2).

import React from 'react';
import { Product, Category } from '../../../../shared/types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  categories: Category[];
  isDeleting: boolean;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

const RenderImage: React.FC<{ image: string | null; name: string; catName: string }> = ({
  image, name, catName
}) => (
  <div className="prod-img-wrapper">
    {image ? (
      <img src={image} alt={name} className="prod-img" />
    ) : (
      <div className="prod-img-placeholder">No Image</div>
    )}
    <span className="prod-cat-badge">{catName}</span>
  </div>
);

const RenderInfo: React.FC<{
  product: Product; onEdit: () => void; onDelete: () => void; isDeleting: boolean;
}> = ({ product, onEdit, onDelete, isDeleting }) => (
  <div className="prod-info">
    <h4 className="prod-title">{product.name}</h4>
    {product.description && <p className="prod-description">{product.description}</p>}
    <div className="prod-footer">
      <span className="prod-price">${Number(product.price).toFixed(2)}</span>
      <div className="prod-actions">
        <button className="prod-btn-edit" onClick={onEdit} title="Edit product">Edit</button>
        <button className="prod-btn-delete" disabled={isDeleting} onClick={onDelete} title="Delete product">
          {isDeleting ? 'Wait' : 'Del'}
        </button>
      </div>
    </div>
  </div>
);

export const ProductCard: React.FC<ProductCardProps> = ({
  product, categories, isDeleting, onDelete, onEdit
}) => {
  const catName = product.category?.name || categories.find((c) => c.id === product.categoryId)?.name || 'Stock';
  const handleEdit = () => onEdit(product);
  const handleDelete = () => onDelete(product.id);

  return (
    <div className="product-card">
      <RenderImage image={product.image} name={product.name} catName={catName} />
      <RenderInfo product={product} onEdit={handleEdit} onDelete={handleDelete} isDeleting={isDeleting} />
    </div>
  );
};

export default ProductCard;
