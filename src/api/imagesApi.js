import { apiRequest } from './apiUtils';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

/**
 * Fetch all images
 * @returns {Promise<Array>} List of images
 */
export const fetchImagesList = async () => {
  const response = await apiRequest(`${API_BASE_URL}/images`);
  return response.data || [];
};

/**
 * Fetch image by ID
 * @param {number} id - Image ID
 * @returns {Promise<Object>} Image data
 */
export const fetchImageById = async (id) => {
  const response = await apiRequest(`${API_BASE_URL}/images/${id}`);
  return response.data;
};

/**
 * Fetch images by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of images in category
 */
export const fetchImagesByCategory = async (category) => {
  const response = await apiRequest(`${API_BASE_URL}/images/category/${category}`);
  return response.data || [];
};

/**
 * Search images
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching images
 */
export const searchImages = async (query) => {
  const response = await apiRequest(`${API_BASE_URL}/images/search?q=${encodeURIComponent(query)}`);
  return response.data || [];
};

/**
 * Upload image
 * @param {FormData} formData - Image file data
 * @returns {Promise<Object>} Uploaded image data
 */
export const uploadImage = async (formData) => {
  const response = await apiRequest(`${API_BASE_URL}/images/upload`, {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header, let browser set it with boundary
  });
  return response.data;
};
