export class TemplateModel {
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

  /**
   * @param {TemplateRaw} item
   * @returns {TemplateModel}
   */
  static from(item = {}) {
    return new TemplateModel({
      id: item.id ?? null,
      name: item.name || '',
      urlThumbnail: item.urlThumbnail || '',
      category: item.category || ''
    });
  }
}