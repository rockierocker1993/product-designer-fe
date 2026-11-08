import { createResourceApi } from './resourceApiFactory';

const templatesApi = createResourceApi({ resourcePath: 'templates' });

/**
 * Fetch all templates
 * @returns {Promise<Array>} List of templates
 */
export const fetchTemplatesList = async () => {
  return templatesApi.fetchList();
};

/**
 * Fetch template by ID
 * @param {number} id - Template ID
 * @returns {Promise<Object>} Template data
 */
export const fetchTemplateById = async (id) => {
  return templatesApi.fetchById(id);
};

/**
 * Fetch templates by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of templates in category
 */
export const fetchTemplatesByCategory = async (category) => {
  return templatesApi.fetchByCategory(category);
};

/**
 * Search templates
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching templates
 */
export const searchTemplates = async (query) => {
  return templatesApi.search(query);
};
