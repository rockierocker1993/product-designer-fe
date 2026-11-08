import { useCallback, useState } from 'react';
import { fetchShapesList, fetchShapesByCategory, searchShapes } from '../api/shapesApi';
import { useLoadableData } from './useLoadableData';

/**
 * Custom hook for fetching and managing shapes from API
 */
export const useShapes = () => {
  const {
    data: shapes,
    loading,
    error,
    reload,
  } = useLoadableData(fetchShapesList);

  return { shapes, loading, error, refetch: reload };
};

/**
 * Custom hook for fetching shapes by category
 */
export const useShapesByCategory = (category) => {
  const loadShapesByCategory = useCallback(async () => {
    if (!category) return [];
    return fetchShapesByCategory(category);
  }, [category]);

  const {
    data: shapes,
    loading,
    error,
    reload,
  } = useLoadableData(loadShapesByCategory);

  return { shapes, loading, error, refetch: reload };
};

/**
 * Custom hook for searching shapes
 */
export const useSearchShapes = () => {
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query) {
      setShapes([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchShapes(query);
      setShapes(data);
    } catch (err) {
      setError(err.message);
      console.error(`Error searching shapes with query "${query}":`, err);
    } finally {
      setLoading(false);
    }
  };

  return { shapes, loading, error, search };
};
