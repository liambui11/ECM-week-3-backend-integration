// Custom hook managing state, pagination, sorting, search filters, and optimistic updates (Rule #1, Rule #2).

import { useState, useEffect, useCallback } from 'react';
import { Product, Pagination, ProductQueryParams, CreateProductInput, UpdateProductInput } from '../../../shared/types';
import { api } from '../../../shared/services/api';
import { UI_CONSTANTS, INVENTORY_LIMITS } from '../../../shared/constants';
import { useOffline } from '../../../shared/hooks/useOffline';

export const useProducts = (initialParams: ProductQueryParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0, totalPages: 1, currentPage: INVENTORY_LIMITS.DEFAULT_PAGE, limit: INVENTORY_LIMITS.DEFAULT_LIMIT
  });
  const [queryParams, setQueryParams] = useState<ProductQueryParams>(queryParamsBackup(initialParams));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [opLoading, setOpLoading] = useState<Record<string, boolean>>({});
  const isOffline = useOffline();

  function queryParamsBackup(params: ProductQueryParams) {
    return params;
  }

  const loadProducts = useCallback(async (params: ProductQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProducts(params);
      setProducts(res.products);
      setPagination(res.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : UI_CONSTANTS.GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(async (input: CreateProductInput) => {
    if (isOffline) throw new Error(UI_CONSTANTS.OFFLINE_ERROR);
    setOpLoading((prev) => ({ ...prev, create: true }));
    try {
      const fresh = await api.createProduct(input);
      await loadProducts(queryParams);
      return fresh;
    } finally {
      setOpLoading((prev) => ({ ...prev, create: false }));
    }
  }, [isOffline, queryParams, loadProducts]);

  const editProduct = useCallback(async (id: number, input: UpdateProductInput) => {
    if (isOffline) throw new Error(UI_CONSTANTS.OFFLINE_ERROR);
    setOpLoading((prev) => ({ ...prev, [`update-${id}`]: true }));
    const backup = [...products];
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...input } as Product : p)));
    try {
      const res = await api.updateProduct(id, input);
      await loadProducts(queryParams);
      return res;
    } catch (err) {
      setProducts(backup);
      throw err;
    } finally {
      setOpLoading((prev) => ({ ...prev, [`update-${id}`]: false }));
    }
  }, [isOffline, products, queryParams, loadProducts]);

  const removeProduct = useCallback(async (id: number) => {
    if (isOffline) throw new Error(UI_CONSTANTS.OFFLINE_ERROR);
    setOpLoading((prev) => ({ ...prev, [`delete-${id}`]: true }));
    const backup = [...products];
    const backupPag = { ...pagination };
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setPagination((prev) => ({ ...prev, totalItems: prev.totalItems - 1 }));
    try {
      await api.deleteProduct(id);
      await loadProducts(queryParams);
    } catch (err) {
      setProducts(backup);
      setPagination(backupPag);
      throw err;
    } finally {
      setOpLoading((prev) => ({ ...prev, [`delete-${id}`]: false }));
    }
  }, [isOffline, products, pagination, queryParams, loadProducts]);

  useEffect(() => {
    loadProducts(queryParams);
  }, [queryParams, loadProducts]);

  return {
    products, pagination, queryParams, loading, error, opLoading,
    setQueryParams, addProduct, editProduct, removeProduct, reload: () => loadProducts(queryParams)
  };
};

export default useProducts;
