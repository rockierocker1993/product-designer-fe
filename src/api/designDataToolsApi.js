
import { API_CONFIG } from '../config';
import { apiRequest, toBaseResponse, toResponse } from './apiUtils';
import {
    ClipartDtoModel,
} from './model/cliparts';
import { ImageModel } from './model/image';
import { ProductModel } from './model/product';
import { ShapeModel } from './model/shape';
import { TextModel } from './model/text';
import { TemplateModel } from './model/template';

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
    
    return toResponse(response, {
        fallbackData: [],
        mapData: ClipartDtoModel.from,
    });
};

export const searchShape = async (page, size, query, category) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
        buildUrl(`shape?page=${page}&size=${size}&filter=${encodedQuery}&category=${category}`),
    );
    
    return toResponse(response, {
        fallbackData: [],
        mapData: ShapeModel.from,
    });
};

export const searchProduct = async (page, size, query, category) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
        buildUrl(`product?page=${page}&size=${size}&filter=${encodedQuery}&category=${category}`),
    );
    
    return toResponse(response, {
        fallbackData: [],
        mapData: ProductModel.from,
    });
};

export const searchText = async (page, size, query, category) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
        buildUrl(`text?page=${page}&size=${size}&filter=${encodedQuery}&category=${category}`),
    );
    
    return toResponse(response, {
        fallbackData: [],
        mapData: TextModel.from,
    });
};

export const searchTemplate = async (page, size, query, category) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await apiRequest(
        buildUrl(`template?page=${page}&size=${size}&filter=${encodedQuery}&category=${category}`),
    );
    
    return toResponse(response, {
        fallbackData: [],
        mapData: TemplateModel.from,
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
    
    return toResponse(response, {
        fallbackData: [],
        mapData: ImageModel.from,
    });
};

export const uploadImage = async (payload) => {
    console.log("Uploading image with payload:", payload);
    const response = await apiRequest(
        buildUrl(`image/upload`),
        {
            method: 'POST',
            body: payload,
        }
    );
    
    return toResponse(response, {
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
    return toResponse(response, {
        fallbackData: [],
        mapData: (data) => data, // No mapping needed for category
    });
};
