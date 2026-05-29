import React from 'react';
import { Category } from '../../../../shared/types';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
  isDeleting: boolean;
  onDelete: (id: number) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, isDeleting, onDelete }) => {
  const handleDelete = () => onDelete(category.id);

  return (
    <div className="category-card">
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
