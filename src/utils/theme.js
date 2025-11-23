import { THEME_CONFIG } from '../config/index.js';

/**
 * Apply theme configuration to CSS variables
 */
export const applyTheme = () => {
  const root = document.documentElement;
  
  // Primary colors
  root.style.setProperty('--primary-color', THEME_CONFIG.PRIMARY_COLOR);
  root.style.setProperty('--secondary-color', THEME_CONFIG.SECONDARY_COLOR);
  root.style.setProperty('--accent-color', THEME_CONFIG.ACCENT_COLOR);
  
  // Background colors
  root.style.setProperty('--bg-light', THEME_CONFIG.BG_LIGHT);
  root.style.setProperty('--bg-dark', THEME_CONFIG.BG_DARK);
  root.style.setProperty('--bg-neutral', THEME_CONFIG.BG_NEUTRAL);
  root.style.setProperty('--bg-canvas', THEME_CONFIG.BG_CANVAS);
  
  // Text colors
  root.style.setProperty('--text-primary', THEME_CONFIG.TEXT_PRIMARY);
  root.style.setProperty('--text-secondary', THEME_CONFIG.TEXT_SECONDARY);
  root.style.setProperty('--text-light', THEME_CONFIG.TEXT_LIGHT);
  
  // Border colors
  root.style.setProperty('--border-color', THEME_CONFIG.BORDER_COLOR);
  root.style.setProperty('--border-focus', THEME_CONFIG.BORDER_FOCUS);
  
  // Status colors
  root.style.setProperty('--success-color', THEME_CONFIG.SUCCESS_COLOR);
  root.style.setProperty('--warning-color', THEME_CONFIG.WARNING_COLOR);
  root.style.setProperty('--error-color', THEME_CONFIG.ERROR_COLOR);
  root.style.setProperty('--info-color', THEME_CONFIG.INFO_COLOR);
};

/**
 * Get current theme mode from localStorage or system preference
 */
export const getThemeMode = () => {
  const stored = localStorage.getItem('theme-mode');
  if (stored) return stored;
  
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

/**
 * Set theme mode (light, dark, or auto)
 */
export const setThemeMode = (mode) => {
  localStorage.setItem('theme-mode', mode);
  applyThemeMode(mode);
};

/**
 * Apply theme mode to document
 */
export const applyThemeMode = (mode) => {
  const root = document.documentElement;
  const body = document.body;
  
  // Store actual mode for auto
  let actualMode = mode;
  
  if (mode === 'auto') {
    // Auto mode - follow system preference
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    actualMode = isDark ? 'dark' : 'light';
  }
  
  if (actualMode === 'dark') {
    root.setAttribute('data-theme', 'dark');
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    
    root.style.setProperty('--bg-primary', THEME_CONFIG.BG_DARK);
    root.style.setProperty('--text-color', THEME_CONFIG.TEXT_LIGHT);
    
    // Update more variables for dark mode
    body.style.backgroundColor = THEME_CONFIG.BG_DARK;
    body.style.color = THEME_CONFIG.TEXT_LIGHT;
    
  } else {
    root.setAttribute('data-theme', 'light');
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    
    root.style.setProperty('--bg-primary', THEME_CONFIG.BG_LIGHT);
    root.style.setProperty('--text-color', THEME_CONFIG.TEXT_PRIMARY);
    
    // Update more variables for light mode
    body.style.backgroundColor = THEME_CONFIG.BG_LIGHT;
    body.style.color = THEME_CONFIG.TEXT_PRIMARY;
  }
  
  console.log(`Theme applied: ${mode} (actual: ${actualMode})`);
};

/**
 * Initialize theme system
 */
export const initTheme = () => {
  applyTheme();
  const mode = getThemeMode();
  applyThemeMode(mode);
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const currentMode = getThemeMode();
      if (currentMode === 'auto') {
        applyThemeMode('auto');
      }
    });
  }
};

export default {
  applyTheme,
  getThemeMode,
  setThemeMode,
  applyThemeMode,
  initTheme,
};
