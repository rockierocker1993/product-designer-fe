import { createResourceApi } from './resourceApiFactory';

const shapesApi = createResourceApi({ resourcePath: 'shapes' });

/**
 * Fetch list of available shapes from API
 * @returns {Promise<Array>} Array of shape objects
 */
export const fetchShapesList = async () => {
  return shapesApi.fetchList();
};

/**
 * Fetch a specific shape by ID or name
 * @param {string} shapeId - The ID or name of the shape
 * @returns {Promise<Object>} Shape object with SVG data
 */
export const fetchShapeById = async (shapeId) => {
  return shapesApi.fetchById(shapeId);
};

/**
 * Fetch shapes by category
 * @param {string} category - Category name (e.g., 'animals', 'nature', 'symbols')
 * @returns {Promise<Array>} Array of shape objects
 */
export const fetchShapesByCategory = async (category) => {
  return shapesApi.fetchByCategory(category);
};

/**
 * Search shapes by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching shape objects
 */
export const searchShapes = async (query) => {
  return shapesApi.search(query);
};
