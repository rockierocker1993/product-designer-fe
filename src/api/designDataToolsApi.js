
import { API_CONFIG } from '../config';
import { apiRequest, toBaseResponse } from './apiUtils';
import {
    ClipartDtoModel,
} from './model/cliparts';
import { ImageModel } from './model/image';

const API_BASE_URL = API_CONFIG.BASE_URL;
const buildUrl = (path) => `${API_BASE_URL}/design/data-tools/${path}`;

/**
 * Search cliparts
 * @param {string} query - Search query
 * @returns {Promise<import('./model/baseResponse').BaseResponse<import('./model/cliparts').ClipartDto[]>>} Base response containing matching cliparts
 */
export const searchCliparts = async (page, size, query, category) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
        buildUrl(`clipart?page=${page}&size=${size}&filter=${encodedQuery}&category=${category}`),
    );
    
    return toBaseResponse(response, {
        fallbackData: null,
        mapData: ClipartDtoModel.from,
    });
};

/**
 * Search images
 * @param {string} query - Search query
 * @returns {Promise<import('./model/baseResponse').BaseResponse<import('./model/image').ImageModel[]>>} Base response containing matching images
 */
export const searchImages = async (page, size, query, category) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
        buildUrl(`image?page=${page}&size=${size}&filter=${encodedQuery}&category=${category}`),
    );
    
    return toBaseResponse(response, {
        fallbackData: null,
        mapData: ImageModel.from,
    });
};

/**
 * Get category data
 * @param {string} type - Type of category (e.g., 'clipart', 'image')
 * @returns {Promise<import('./model/baseResponse').BaseResponse<any>>} Base response containing category data
 */
export const getCategory = async (type) => {
    const response = await apiRequest(
        buildUrl(`category/${type}`),
    );
    return toBaseResponse(response, {
        fallbackData: null,
        mapData: (data) => data, // No mapping needed for category
    });
};
