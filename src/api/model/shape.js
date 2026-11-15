export class ShapeModel {
  constructor({
    id = null,
    name = '',
    svg = '',
    category = '',
  } = {}) {
    this.id = id;
    this.name = name;
    this.svg = svg;
    this.category = category;
  }

  /**
   * @param {ShapeRaw} item
   * @returns {ShapeModel}
   */
  static from(item = {}) {
    return new ShapeModel({
      id: item.id ?? null,
      name: item.name || '',
      svg: item.svg || '',
      category: item.category || '',
    });
  }
}
