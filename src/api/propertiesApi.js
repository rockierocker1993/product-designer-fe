
import { API_CONFIG } from '../config';
import { apiRequest, toResponse } from './apiUtils';
import { FontModel } from './model/font';
import { putCache, getCache } from '../utils/cache';

const API_BASE_URL = API_CONFIG.BASE_URL;
const buildUrl = (path) => `${API_BASE_URL}/design/properties/${path}`;


/**
 * Search fonts
 * @param {string} query - Search query
 * @returns {Promise<import('./model/baseResponse').BaseResponse<FontModel[]>>} Base response containing matching fonts
 */
export const searchFonts = async (page = 1, size = 10, query = "") => {
    const cached = getCache(`fonts?page=${page}&size=${size}&filter=${query}`);
    if (cached) {
        return cached;
    }
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
        buildUrl(`fonts?page=${page}&size=${size}&filter=${encodedQuery}`),
    );
    
    const result = toResponse(response, {
        fallbackData: [],
        mapData: FontModel.from,
    });
    putCache(`fonts?page=${page}&size=${size}&filter=${query}`, result);
    return result;
};