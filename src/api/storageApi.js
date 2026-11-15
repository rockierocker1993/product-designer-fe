
import { API_CONFIG } from '../config';
import { apiRequest, toBaseResponse } from './apiUtils';
import {
    PresignedUploadResponseModel,
} from './model/presignedUploadResponse';

const API_BASE_URL = API_CONFIG.BASE_URL;
const buildUrl = (path) => `${API_BASE_URL}/storage/${path}`;


export const generatePreasignedUploadImage = async (fileName) => {
    const response = await apiRequest(
        buildUrl(`presigned-url/image?fileName=${fileName}`),
    );
    
    return toBaseResponse(response, {
        fallbackData: null,
        mapData: PresignedUploadResponseModel.from,
    });
};