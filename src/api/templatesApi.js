import { apiRequest } from './apiUtils';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

/**
 * Fetch all templates
 * @returns {Promise<Array>} List of templates
 */
export const fetchTemplatesList = async () => {
  const response = await apiRequest(`${API_BASE_URL}/templates`);
  return response.data || [];
};

/**
 * Fetch template by ID
 * @param {number} id - Template ID
 * @returns {Promise<Object>} Template data
 */
export const fetchTemplateById = async (id) => {
  const response = await apiRequest(`${API_BASE_URL}/templates/${id}`);
  return response.data;
};

/**
 * Fetch templates by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of templates in category
 */
export const fetchTemplatesByCategory = async (category) => {
  const response = await apiRequest(`${API_BASE_URL}/templates/category/${category}`);
  return response.data || [];
};

/**
 * Search templates
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching templates
 */
export const searchTemplates = async (query) => {
  const response = await apiRequest(`${API_BASE_URL}/templates/search?q=${encodeURIComponent(query)}`);
  return response.data || [];
};
