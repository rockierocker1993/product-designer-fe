import { apiRequest } from './apiUtils';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

/**
 * Fetch all cliparts
 * @returns {Promise<Array>} List of cliparts
 */
export const fetchClipartsList = async () => {
  const response = await apiRequest(`${API_BASE_URL}/cliparts`);
  return response.data || [];
};

/**
 * Fetch clipart by ID
 * @param {number} id - Clipart ID
 * @returns {Promise<Object>} Clipart data
 */
export const fetchClipartById = async (id) => {
  const response = await apiRequest(`${API_BASE_URL}/cliparts/${id}`);
  return response.data;
};

/**
 * Fetch cliparts by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of cliparts in category
 */
export const fetchClipartsByCategory = async (category) => {
  const response = await apiRequest(`${API_BASE_URL}/cliparts/category/${category}`);
  return response.data || [];
};

/**
 * Search cliparts
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching cliparts
 */
export const searchCliparts = async (query) => {
  const response = await apiRequest(`${API_BASE_URL}/cliparts/search?q=${encodeURIComponent(query)}`);
  return response.data || [];
};
