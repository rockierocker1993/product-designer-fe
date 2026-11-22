export class TextModel {
  constructor({
    id = null,
    name = '',
    urlThumbnail = '',
    category = ''
  } = {}) {
    this.id = id;
    this.name = name;
    this.urlThumbnail = urlThumbnail;
    this.category = category;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      urlThumbnail: this.urlThumbnail,
      category: this.category
    };
  }
  /**
   * @param {TextRaw} item
   * @returns {TextModel}
   */
  static from(item = {}) {
    return new TextModel({
      id: item.id ?? null,
      name: item.name || '',
      urlThumbnail: item.urlThumbnail || '',
      category: item.category || ''
    });
  }
}