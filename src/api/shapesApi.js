import { apiRequest } from './apiUtils';

// API base URL - sesuaikan dengan backend Anda
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

/**
 * Fetch list of available shapes from API
 * @returns {Promise<Array>} Array of shape objects
 */
export const fetchShapesList = async () => {
  const response = await apiRequest(`${API_BASE_URL}/shapes`);
  return response.data || [];
};

/**
 * Fetch a specific shape by ID or name
 * @param {string} shapeId - The ID or name of the shape
 * @returns {Promise<Object>} Shape object with SVG data
 */
export const fetchShapeById = async (shapeId) => {
  const response = await apiRequest(`${API_BASE_URL}/shapes/${shapeId}`);
  return response.data || null;
};

/**
 * Fetch shapes by category
 * @param {string} category - Category name (e.g., 'animals', 'nature', 'symbols')
 * @returns {Promise<Array>} Array of shape objects
 */
export const fetchShapesByCategory = async (category) => {
  const response = await apiRequest(`${API_BASE_URL}/shapes/category/${category}`);
  return response.data || [];
};

/**
 * Search shapes by keyword
 * @param {string} keyword - Search keyword
 * @returns {Promise<Array>} Array of matching shape objects
 */
export const searchShapes = async (keyword) => {
  const response = await apiRequest(`${API_BASE_URL}/shapes/search?q=${encodeURIComponent(keyword)}`);
  return response.data || [];
};
