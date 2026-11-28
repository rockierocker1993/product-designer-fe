export class CategoryModel {
  constructor({
    category = null,
    children = [],
  } = {}) {
    this.category = category;
    this.children = children;
  }

  toJSON() {
    return {
      category: this.category,
      children: this.children
    };
  }

  /**
   * @param {Object} item
   * @returns {CategoryModel}
   */
  static from(item = {}) {
    return new CategoryModel({
      category: item.category || null,
      children: item.children || [],
    });
  }
}