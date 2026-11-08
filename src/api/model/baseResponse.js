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
    response_code = '',
    status = null,
    message_id = '',
    message_en = '',
    title_id = '',
    title_en = '',
    data = [],
  } = {}) {
    this.response_code = response_code;
    this.status = status;
    this.message_id = message_id;
    this.message_en = message_en;
    this.title_id = title_id;
    this.title_en = title_en;
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
      response_code: source.response_code,
      status: source.status,
      message_id: source.message_id,
      message_en: source.message_en,
      title_id: source.title_id,
      title_en: source.title_en,
      data: mappedData,
    });
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
