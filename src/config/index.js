// Environment configuration
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

// API configuration
export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Canvas configuration
export const CANVAS_CONFIG = {
  WIDTH: 800,
  HEIGHT: 600,
  BACKGROUND_COLOR: '#ffffff',
  SELECTION_COLOR: '#084D42',
  SELECTION_LINE_WIDTH: 2,
};

// Theme configuration
export const THEME_CONFIG = {
  // Primary colors
  PRIMARY_COLOR: import.meta.env.VITE_PRIMARY_COLOR || '#084D42',
  SECONDARY_COLOR: import.meta.env.VITE_SECONDARY_COLOR || '#0a5f51',
  ACCENT_COLOR: import.meta.env.VITE_ACCENT_COLOR || '#FE7743',
  
  // Background colors
  BG_LIGHT: import.meta.env.VITE_BG_LIGHT || '#ffffff',
  BG_DARK: import.meta.env.VITE_BG_DARK || '#1a1a1a',
  BG_NEUTRAL: import.meta.env.VITE_BG_NEUTRAL || '#f5f5f5',
  BG_CANVAS: import.meta.env.VITE_BG_CANVAS || '#ffffff',
  
  // Text colors
  TEXT_PRIMARY: import.meta.env.VITE_TEXT_PRIMARY || '#1a1a1a',
  TEXT_SECONDARY: import.meta.env.VITE_TEXT_SECONDARY || '#6b7280',
  TEXT_LIGHT: import.meta.env.VITE_TEXT_LIGHT || '#ffffff',
  
  // Border colors
  BORDER_COLOR: import.meta.env.VITE_BORDER_COLOR || '#e5e7eb',
  BORDER_FOCUS: import.meta.env.VITE_BORDER_FOCUS || '#084D42',
  
  // Status colors
  SUCCESS_COLOR: import.meta.env.VITE_SUCCESS_COLOR || '#10B981',
  WARNING_COLOR: import.meta.env.VITE_WARNING_COLOR || '#F59E0B',
  ERROR_COLOR: import.meta.env.VITE_ERROR_COLOR || '#E5484D',
  INFO_COLOR: import.meta.env.VITE_INFO_COLOR || '#3B82F6',
};

// UI configuration
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 350,
  MENU_WIDTH: 80,
  GRID_COLUMNS: {
    SHAPES: 4,
    IMAGES: 3,
    TEMPLATES: 2,
    CLIPARTS: 4,
  },
};

export default {
  ENV,
  API_CONFIG,
  CANVAS_CONFIG,
  THEME_CONFIG,
  UI_CONFIG,
};
