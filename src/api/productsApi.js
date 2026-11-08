import { createResourceApi } from './resourceApiFactory';

const productsApi = createResourceApi({ resourcePath: 'products' });

/**
 * Fetch all products
 * @returns {Promise<Array>} List of products
 */
export const fetchProductsList = async () => {
  return productsApi.fetchList();
};

/**
 * Fetch product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product data
 */
export const fetchProductById = async (id) => {
  return productsApi.fetchById(id);
};

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of products in category
 */
export const fetchProductsByCategory = async (category) => {
  return productsApi.fetchByCategory(category);
};

/**
 * Search products
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching products
 */
export const searchProducts = async (query) => {
  return productsApi.search(query);
};
