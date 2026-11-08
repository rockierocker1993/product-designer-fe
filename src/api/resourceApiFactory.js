import { apiRequest } from "./apiUtils";
import { API_CONFIG } from "../config";

const API_BASE_URL = API_CONFIG.BASE_URL;

const buildUrl = (path) => `${API_BASE_URL}/${path}`;

/**
 * Creates a consistent API object for list/detail/category/search endpoints.
 */
export const createResourceApi = ({
  resourcePath,
  categoryPath = `${resourcePath}/category`,
  searchPath = `${resourcePath}/search`,
  searchParamName = "q",
}) => {
  const fetchList = async () => {
    const response = await apiRequest(buildUrl(resourcePath));
    return response.data || [];
  };

  const fetchById = async (id) => {
    const response = await apiRequest(buildUrl(`${resourcePath}/${id}`));
    return response.data;
  };

  const fetchByCategory = async (category) => {
    const response = await apiRequest(buildUrl(`${categoryPath}/${category}`));
    return response.data || [];
  };

  const search = async (query) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
      buildUrl(`${searchPath}?${searchParamName}=${encodedQuery}`),
    );
    return response.data || [];
  };

  return {
    fetchList,
    fetchById,
    fetchByCategory,
    search,
  };
};
