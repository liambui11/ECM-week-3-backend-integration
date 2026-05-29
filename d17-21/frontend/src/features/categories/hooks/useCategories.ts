import { useState, useEffect, useCallback } from 'react';
import { Category } from '../../../shared/types';
import { UI_CONSTANTS } from '../../../shared/constants';
import { useOffline } from '../../../shared/hooks/useOffline';
import { categoryApi } from '../services/categoryApi';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [opLoading, setOpLoading] = useState<Record<string, boolean>>({});
  const isOffline = useOffline();

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await categoryApi.getMany();
      setCategories(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : UI_CONSTANTS.GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = useCallback(async (name: string, description?: string) => {
    if (isOffline) throw new Error(UI_CONSTANTS.OFFLINE_ERROR);
    setOpLoading((prev) => ({ ...prev, create: true }));
    try {
      const fresh = await categoryApi.create({ name, description });
      setCategories((prev) => [...prev, fresh]);
      return fresh;
    } finally {
      setOpLoading((prev) => ({ ...prev, create: false }));
    }
  }, [isOffline]);

  const removeCategory = useCallback(async (id: number) => {
    if (isOffline) throw new Error(UI_CONSTANTS.OFFLINE_ERROR);
    setOpLoading((prev) => ({ ...prev, [`delete-${id}`]: true }));
    try {
      await categoryApi.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setOpLoading((prev) => ({ ...prev, [`delete-${id}`]: false }));
    }
  }, [isOffline]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    opLoading,
    reload: loadCategories,
    addCategory,
    removeCategory,
  };
};

export default useCategories;
