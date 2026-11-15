export class ProductModel {
  constructor({
    id = null,
    name = '',
    productCode = '',
    urlThumbnail = '',
    category = '',
    colors = [],
    images = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.productCode = productCode;
    this.urlThumbnail = urlThumbnail;
    this.category = category;
    this.colors = colors;
    this.images = images;
  }

  /**
   * @param {ProductRaw} item
   * @returns {ProductModel}
   */
  static from(item = {}) {
    return new ProductModel({
      id: item.id ?? null,
      name: item.name || '',
      productCode: item.productCode || '',
      urlThumbnail: item.urlThumbnail || '',
      category: item.category || '',
      colors: item.colors || [],
      images: item.images || [],
    });
  }
}