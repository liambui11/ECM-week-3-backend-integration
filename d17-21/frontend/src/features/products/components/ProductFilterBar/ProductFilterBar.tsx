import React, { useState, useEffect } from 'react';
import { Category, ProductQueryParams } from '../../../../shared/types';
import { SORT_OPTIONS } from '../../../../shared/constants';
import './ProductFilterBar.css';

interface ProductFilterBarProps {
  categories: Category[];
  queryParams: ProductQueryParams;
  onFilterChange: (filters: Partial<ProductQueryParams>) => void;
}

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  categories, queryParams, onFilterChange
}) => {
  const [search, setSearch] = useState<string>(queryParams.search || '');
  const [minPrice, setMinPrice] = useState<string>(queryParams.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState<string>(queryParams.maxPrice?.toString() || '');

  useEffect(() => {
    setSearch(queryParams.search || '');
    setMinPrice(queryParams.minPrice?.toString() || '');
    setMaxPrice(queryParams.maxPrice?.toString() || '');
  }, [queryParams.search, queryParams.minPrice, queryParams.maxPrice]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search: search.trim() || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      page: 1,
    });
  };

  const handleClear = () => {
    setSearch('');
    setMinPrice('');
    setOpacityMax('');
    onFilterChange({
      search: undefined, minPrice: undefined, maxPrice: undefined, categoryId: undefined, page: 1
    });
  };

  const setOpacityMax = (val: string) => {
    setMaxPrice(val);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onFilterChange({ categoryId: val ? Number(val) : undefined, page: 1 });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sort: e.target.value as ProductQueryParams['sort'], page: 1 });
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ order: e.target.value as ProductQueryParams['order'], page: 1 });
  };

  return (
    <form onSubmit={handleApply} className="filter-bar">
      <div className="filter-group">
        <input className="filt-input filt-search" type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="filt-select" value={queryParams.categoryId || ''} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <input className="filt-input filt-price" type="number" placeholder="Min $" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input className="filt-input filt-price" type="number" placeholder="Max $" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <button type="submit" className="filt-btn filt-btn-primary">Apply</button>
        <button type="button" className="filt-btn" onClick={handleClear}>Clear</button>
      </div>

      <div className="filter-group filt-sort-grp">
        <select className="filt-select" value={queryParams.sort} onChange={handleSortChange}>
          {SORT_OPTIONS.FIELDS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select className="filt-select" value={queryParams.order} onChange={handleOrderChange}>
          {SORT_OPTIONS.ORDERS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default ProductFilterBar;
