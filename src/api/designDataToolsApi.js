
import { API_CONFIG } from '../config';
import { apiRequest, toBaseResponse } from './apiUtils';
import {
    ClipartDtoModel,
} from './model/cliparts';

const API_BASE_URL = API_CONFIG.BASE_URL;
const buildUrl = (path) => `${API_BASE_URL}/${path}`;

/**
 * Search cliparts
 * @param {string} query - Search query
 * @returns {Promise<import('./model/baseResponse').BaseResponse<import('./model/cliparts').ClipartDto[]>>} Base response containing matching cliparts
 */
export const searchCliparts = async (page, size, query, category) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
        buildUrl(`design/data-tools/clipart?page=${page}&size=${size}&filter=${encodedQuery}&category=${category}`),
    );
    
    return toBaseResponse(response, {
        fallbackData: null,
        mapData: ClipartDtoModel.from,
    });
};

export const getCategory = async (type) => {
    const response = await apiRequest(
        buildUrl(`design/data-tools/category/${type}`),
    );
    return toBaseResponse(response, {
        fallbackData: null,
        mapData: (data) => data, // No mapping needed for category
    });
};
