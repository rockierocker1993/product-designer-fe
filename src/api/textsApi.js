import { apiRequest } from './apiUtils';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

/**
 * Fetch all text styles
 * @returns {Promise<Array>} List of text styles
 */
export const fetchTextStylesList = async () => {
  const response = await apiRequest(`${API_BASE_URL}/text-styles`);
  return response.data || [];
};

/**
 * Fetch text style by ID
 * @param {number} id - Text style ID
 * @returns {Promise<Object>} Text style data
 */
export const fetchTextStyleById = async (id) => {
  const response = await apiRequest(`${API_BASE_URL}/text-styles/${id}`);
  return response.data;
};

/**
 * Fetch fonts
 * @returns {Promise<Array>} List of available fonts
 */
export const fetchFontsList = async () => {
  const response = await apiRequest(`${API_BASE_URL}/fonts`);
  return response.data || [];
};

/**
 * Search text styles
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching text styles
 */
export const searchTextStyles = async (query) => {
  const response = await apiRequest(`${API_BASE_URL}/text-styles/search?q=${encodeURIComponent(query)}`);
  return response.data || [];
};
