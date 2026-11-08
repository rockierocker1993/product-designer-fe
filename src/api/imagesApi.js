import { apiRequest } from './apiUtils';
import { createResourceApi } from './resourceApiFactory';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;
const imagesApi = createResourceApi({ resourcePath: 'images' });

/**
 * Fetch all images
 * @returns {Promise<Array>} List of images
 */
export const fetchImagesList = async () => {
  return imagesApi.fetchList();
};

/**
 * Fetch image by ID
 * @param {number} id - Image ID
 * @returns {Promise<Object>} Image data
 */
export const fetchImageById = async (id) => {
  return imagesApi.fetchById(id);
};

/**
 * Fetch images by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of images in category
 */
export const fetchImagesByCategory = async (category) => {
  return imagesApi.fetchByCategory(category);
};

/**
 * Search images
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching images
 */
export const searchImages = async (query) => {
  return imagesApi.search(query);
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
