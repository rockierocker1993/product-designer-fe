/**
 * @template TIn
 * @template TOut
 * @callback DataMapper
 * @param {TIn} item
 * @returns {TOut}
 */

const normalizeBaseResponseOptions = (fallbackOrOptions) => {
  if (
    Array.isArray(fallbackOrOptions) ||
    fallbackOrOptions === null ||
    fallbackOrOptions === undefined ||
    typeof fallbackOrOptions !== 'object'
  ) {
    return {
      fallbackData: fallbackOrOptions ?? [],
      mapData: null,
    };
  }

  return {
    fallbackData: Object.prototype.hasOwnProperty.call(fallbackOrOptions, 'fallbackData')
      ? fallbackOrOptions.fallbackData
      : [],
    mapData: typeof fallbackOrOptions.mapData === 'function' ? fallbackOrOptions.mapData : null,
  };
};

const applyDataMapper = (data, mapData) => {
  if (!mapData) return data;
  if (Array.isArray(data)) return data.map(mapData);
  if (data === null || data === undefined) return data;
  return mapData(data);
};

export class BaseResponseModel {
  constructor({
    responseCode = '',
    status = null,
    messageId = '',
    messageEn = '',
    titleId = '',
    titleEn = '',
    data = [],
  } = {}) {
    this.responseCode = responseCode;
    this.status = status;
    this.messageId = messageId;
    this.messageEn = messageEn;
    this.titleId = titleId;
    this.titleEn = titleEn;
    this.data = data;
  }

  /**
   * @template TIn
   * @template TOut
   * @param {any} payload
   * @param {Array|Object|{fallbackData?: any, mapData?: DataMapper<TIn, TOut>}|null} [fallbackOrOptions=[]]
   * @returns {BaseResponseModel}
   */
  static from(payload, fallbackOrOptions = []) {
    const source = payload && typeof payload === 'object' ? payload : {};
    const { fallbackData, mapData } = normalizeBaseResponseOptions(fallbackOrOptions);

    const hasDataField = Object.prototype.hasOwnProperty.call(source, 'data');
    const normalizedData = hasDataField ? source.data : (Array.isArray(source) ? source : fallbackData);
    const mappedData = applyDataMapper(normalizedData, mapData);

    return new BaseResponseModel({
      responseCode: source.responseCode,
      status: source.status,
      messageId: source.messageId,
      messageEn: source.messageEn,
      titleId: source.titleId,
      titleEn: source.titleEn,
      data: mappedData,
    });
  }

  static toResponse(payload, fallbackOrOptions = []) {
    const source = payload && typeof payload === 'object' ? payload : {};
    const { fallbackData, mapData } = normalizeBaseResponseOptions(fallbackOrOptions);

    const hasDataField = Object.prototype.hasOwnProperty.call(source, 'data');
    const normalizedData = hasDataField ? source.data : (Array.isArray(source) ? source : fallbackData);
    const mappedData = applyDataMapper(normalizedData, mapData);

    return mappedData;
  }
}



/**
 * Normalize API response into a unified base response shape.
 * @template TIn
 * @template TOut
 * @param {any} payload - Raw API payload
 * @param {Array|Object|{fallbackData?: any, mapData?: DataMapper<TIn, TOut>}|null} [fallbackOrOptions=[]]
 * @returns {BaseResponse<any>}
 */
export const toBaseResponse = (payload, fallbackOrOptions = []) => {
  return BaseResponseModel.from(payload, fallbackOrOptions);
};

/**
 * Normalize API response into a unified base response shape.
 * @template TIn
 * @template TOut
 * @param {any} payload - Raw API payload
 * @param {Array|Object|{fallbackData?: any, mapData?: DataMapper<TIn, TOut>}|null} [fallbackOrOptions=[]]
 * @returns {BaseResponse<any>}
 */
export const toResponse = (payload, fallbackOrOptions = []) => {
  return BaseResponseModel.toResponse(payload, fallbackOrOptions);
};
