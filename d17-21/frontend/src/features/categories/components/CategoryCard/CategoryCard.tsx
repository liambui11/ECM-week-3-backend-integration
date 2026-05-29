import React from 'react';
import { Category } from '../../../../shared/types';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isActive,
  isDeleting,
  onDelete,
  onSelect,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(category.id);
  };

  const handleCardClick = () => {
    onSelect(category.id);
  };

  return (
    <div
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="category-info">
        <h4 className="cat-name">{category.name}</h4>
        {category.description && <p className="cat-desc">{category.description}</p>}
      </div>
      <button className="cat-delete" disabled={isDeleting} onClick={handleDelete}>
        {isDeleting ? 'Wait' : 'Del'}
      </button>
    </div>
  );
};

export default CategoryCard;
