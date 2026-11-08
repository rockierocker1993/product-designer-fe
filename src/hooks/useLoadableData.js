import { useCallback, useEffect, useState } from "react";

/**
 * Shared pattern for loading list-like data with retry support.
 */
export const useLoadableData = (loader, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await loader();
      setData(result.data);
      return result.data;
    } catch (err) {
      const message = err?.message || "Failed to load data";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    reload();
  }, [reload]);
  
  return {
    data,
    setData,
    loading,
    error,
    reload,
  };
};
