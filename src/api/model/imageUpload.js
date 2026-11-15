export class ImageUploadModel {
  constructor({
    url = '',
    urlThumbnail = '',
    format = '',
    width = null,
    height = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.urlThumbnail = urlThumbnail;
    this.format = format;
    this.width = width;
    this.height = height;
    this.category = category;
  }

  /**
   * @param {ImageUploadModelRaw} item
   * @returns {ImageUploadModel}
   */
  static from(item = {}) {
    return new ImageUploadModel({
      url: item.id ?? '',
      urlThumbnail: item.urlThumbnail || '',
      format: item.format || '',
      width: item.width || null,
      height: item.height || null,
    });
  }
}
