
import { API_CONFIG } from '../config';
import { apiRequest, toResponse } from './apiUtils';
import { CategoryModel } from './model/category';
import { putCache, getCache } from '../utils/cache';

const API_BASE_URL = API_CONFIG.BASE_URL;
const buildUrl = (path) => `${API_BASE_URL}/design/${path}`;

export const getCategory = async (type) => {
    const cached = getCache(`category/${type}`);
    if (cached) {
        return cached;
    }

    const response = await apiRequest(
        buildUrl(`category/${type}`),
    );
    const result = toResponse(response, {
        fallbackData: null,
        mapData: CategoryModel.from,
    });
    putCache(`category/${type}`, result);
    return result;
};
