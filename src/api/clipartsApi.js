import { createResourceApi } from './resourceApiFactory';

const clipartsApi = createResourceApi({ resourcePath: 'cliparts' });

/**
 * Fetch all cliparts
 * @returns {Promise<Array>} List of cliparts
 */
export const fetchClipartsList = async () => {
  return clipartsApi.fetchList();
};

/**
 * Fetch clipart by ID
 * @param {number} id - Clipart ID
 * @returns {Promise<Object>} Clipart data
 */
export const fetchClipartById = async (id) => {
  return clipartsApi.fetchById(id);
};

/**
 * Fetch cliparts by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of cliparts in category
 */
export const fetchClipartsByCategory = async (category) => {
  return clipartsApi.fetchByCategory(category);
};

/**
 * Search cliparts
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching cliparts
 */
export const searchCliparts = async (query) => {
  return clipartsApi.search(query);
};
