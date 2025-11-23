import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { getThemeMode, setThemeMode } from '../utils/theme';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getThemeMode());

  useEffect(() => {
    const currentTheme = getThemeMode();
    setTheme(currentTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setThemeMode(newTheme);
  };

  return (
    <div className="theme-toggle">
      <button
        onClick={() => handleThemeChange('light')}
        className={`theme-button ${theme === 'light' ? 'active' : ''}`}
        title="Light Mode"
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
        title="Dark Mode"
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => handleThemeChange('auto')}
        className={`theme-button ${theme === 'auto' ? 'active' : ''}`}
        title="Auto Mode"
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;
