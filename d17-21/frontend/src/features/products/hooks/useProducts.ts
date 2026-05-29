// useProducts manages product inventory operations and coordinates search/filter query parameters with the browser URL (Rule #1, Rule #2).
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, Pagination, ProductQueryParams, CreateProductInput, UpdateProductInput } from '../../../shared/types';
import { UI_CONSTANTS, INVENTORY_LIMITS } from '../../../shared/constants';
import { useOffline } from '../../../shared/hooks/useOffline';
import { productApi } from '../services/productApi';

/**
 * Parses URLSearchParams into ProductQueryParams, using initial default values as fallback.
 */
export const parseParams = (
  searchParams: URLSearchParams,
  initialParams: ProductQueryParams
): ProductQueryParams => {
  const page = Number(searchParams.get('page')) || initialParams.page;
  const limit = Number(searchParams.get('limit')) || initialParams.limit;
  const search = searchParams.get('search') || undefined;
  const categoryId = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const sort = (searchParams.get('sort') as ProductQueryParams['sort']) || initialParams.sort;
  const order = (searchParams.get('order') as ProductQueryParams['order']) || initialParams.order;

  return { page, limit, search, categoryId, minPrice, maxPrice, sort, order };
};

/**
 * Serializes ProductQueryParams into a simple key-value record for URLSearchParams, avoiding defaults.
 */
export const serializeParams = (
  params: ProductQueryParams,
  initialParams: ProductQueryParams
): Record<string, string> => {
  const obj: Record<string, string> = {};
  if (params.page !== initialParams.page) obj.page = String(params.page);
  if (params.limit !== initialParams.limit) obj.limit = String(params.limit);
  if (params.search) obj.search = params.search;
  if (params.categoryId) obj.categoryId = String(params.categoryId);
  if (params.minPrice !== undefined) obj.minPrice = String(params.minPrice);
  if (params.maxPrice !== undefined) obj.maxPrice = String(params.maxPrice);
  if (params.sort !== initialParams.sort) obj.sort = params.sort;
  if (params.order !== initialParams.order) obj.order = params.order;
  return obj;
};

export const useProducts = (initialParams: ProductQueryParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0,
    totalPages: 1,
    currentPage: INVENTORY_LIMITS.DEFAULT_PAGE,
    limit: INVENTORY_LIMITS.DEFAULT_LIMIT,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [opLoading, setOpLoading] = useState<Record<string, boolean>>({});
  const isOffline = useOffline();

  const queryParams = useMemo(() => parseParams(searchParams, initialParams), [searchParams, initialParams]);

  const loadProducts = useCallback(async (params: ProductQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productApi.getMany(params);
      setProducts(res.products);
      setPagination(res.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : UI_CONSTANTS.GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  const setQueryParams = useCallback(
    (newParams: Partial<ProductQueryParams> | ((prev: ProductQueryParams) => ProductQueryParams)) => {
      const current = parseParams(searchParams, initialParams);
      const updated = typeof newParams === 'function' ? newParams(current) : { ...current, ...newParams };
      const serialized = serializeParams(updated, initialParams);
      setSearchParams(serialized);
    },
    [searchParams, setSearchParams, initialParams]
  );

  const addProduct = useCallback(async (input: CreateProductInput) => {
    if (isOffline) throw new Error(UI_CONSTANTS.OFFLINE_ERROR);
    setOpLoading((prev) => ({ ...prev, create: true }));
    try {
      const fresh = await productApi.create(input);
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
      const res = await productApi.update(id, input);
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
      await productApi.delete(id);
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
    products,
    pagination,
    queryParams,
    loading,
    error,
    opLoading,
    setQueryParams,
    addProduct,
    editProduct,
    removeProduct,
    reload: () => loadProducts(queryParams),
  };
};

export default useProducts;
