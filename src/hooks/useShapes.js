import { useState, useEffect } from 'react';
import { fetchShapesList, fetchShapesByCategory, searchShapes } from '../api/shapesApi';

/**
 * Custom hook for fetching and managing shapes from API
 */
export const useShapes = () => {
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadShapes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchShapesList();
      setShapes(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading shapes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShapes();
  }, []);

  return { shapes, loading, error, refetch: loadShapes };
};

/**
 * Custom hook for fetching shapes by category
 */
export const useShapesByCategory = (category) => {
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const loadShapes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchShapesByCategory(category);
        setShapes(data);
      } catch (err) {
        setError(err.message);
        console.error(`Error loading shapes for category ${category}:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadShapes();
  }, [category]);

  return { shapes, loading, error };
};

/**
 * Custom hook for searching shapes
 */
export const useSearchShapes = () => {
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (keyword) => {
    if (!keyword) {
      setShapes([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchShapes(keyword);
      setShapes(data);
    } catch (err) {
      setError(err.message);
      console.error(`Error searching shapes with keyword "${keyword}":`, err);
    } finally {
      setLoading(false);
    }
  };

  return { shapes, loading, error, search };
};
