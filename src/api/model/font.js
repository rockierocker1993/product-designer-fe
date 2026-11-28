export class FontModel {
  constructor({
    id = null,
    name = '',
    url = '',
    weight = "400",
    style = "normal"
  } = {}) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.weight = weight;
    this.style = style;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      weight: this.weight,
      style: this.style
    };
  }

  /**
   * @param {Object} item
   * @returns {FontModel}
   */
  static from(item = {}) {
    return new FontModel({
      id: item.id || null,
      name: item.name || '',
      url: item.url || '',
      weight: item.weight || '400',
      style: item.style || 'normal'
    });
  }
}
