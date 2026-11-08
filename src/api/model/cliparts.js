export class ClipartDtoModel {
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
   * @param {ClipartRaw} item
   * @returns {ClipartDtoModel}
   */
  static from(item = {}) {
    return new ClipartDtoModel({
      id: item.id ?? null,
      name: item.name || '',
      svg: item.svg || '',
      category: item.category || '',
    });
  }
}
