import { apiRequest } from './apiUtils';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

/**
 * Fetch all products
 * @returns {Promise<Array>} List of products
 */
export const fetchProductsList = async () => {
  const response = await apiRequest(`${API_BASE_URL}/products`);
  return response.data || [];
};

/**
 * Fetch product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product data
 */
export const fetchProductById = async (id) => {
  const response = await apiRequest(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of products in category
 */
export const fetchProductsByCategory = async (category) => {
  const response = await apiRequest(`${API_BASE_URL}/products/category/${category}`);
  return response.data || [];
};

/**
 * Search products
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching products
 */
export const searchProducts = async (query) => {
  const response = await apiRequest(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
  return response.data || [];
};
