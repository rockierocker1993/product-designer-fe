export class ImageModel {
  constructor({
    id = null,
    name = '',
    urlThumbnail = '',
    format = '',
    width = null,
    height = null,
    category = '',
  } = {}) {
    this.id = id;
    this.name = name;
    this.urlThumbnail = urlThumbnail;
    this.format = format;
    this.width = width;
    this.height = height;
    this.category = category;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      urlThumbnail: this.urlThumbnail,
      format: this.format,
      width: this.width,
      height: this.height,
      category: this.category
    };
  }

  /**
   * @param {ClipartRaw} item
   * @returns {ImageModel}
   */
  static from(item = {}) {
    return new ImageModel({
      id: item.id ?? null,
      name: item.name || '',
      urlThumbnail: item.urlThumbnail || '',
      format: item.format || '',
      width: item.width || null,
      height: item.height || null,
      category: item.category || '',
    });
  }
}
