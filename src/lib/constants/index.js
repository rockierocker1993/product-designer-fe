// Shape types constants
export const SHAPE_TYPES = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  TRIANGLE: 'triangle',
  POLYGON: 'polygon',
  STAR: 'star',
  HEART: 'heart',
  FLOWER: 'flower',
  BIRD: 'bird',
  CLOUD: 'cloud',
  TREE: 'tree',
  BUTTERFLY: 'butterfly',
  SUN: 'sun',
  MOON: 'moon',
};

// Item types constants
export const ITEM_TYPES = {
  SHAPE: 'shape',
  IMAGE: 'image',
  TEXT: 'text',
  PRODUCT: 'product',
  TEMPLATE: 'template',
  CLIPART: 'clipart',
};

// Menu types constants
export const MENU_TYPES = {
  PRODUCT: 'product',
  IMAGES: 'images',
  TEXT: 'text',
  TEMPLATES: 'templates',
  CLIPARTS: 'cliparts',
  SHAPES: 'shapes',
};

// Text alignment constants
export const TEXT_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
  JUSTIFY: 'justify',
};

// Font weights constants
export const FONT_WEIGHTS = {
  THIN: 100,
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
  BLACK: 900,
};

// Default canvas object properties
export const DEFAULT_OBJECT_PROPS = {
  FILL: '#000000',
  STROKE: '#000000',
  STROKE_WIDTH: 0,
  OPACITY: 1,
  ANGLE: 0,
  SCALE_X: 1,
  SCALE_Y: 1,
};

// API status codes
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export default {
  SHAPE_TYPES,
  ITEM_TYPES,
  MENU_TYPES,
  TEXT_ALIGN,
  FONT_WEIGHTS,
  DEFAULT_OBJECT_PROPS,
  API_STATUS,
};
