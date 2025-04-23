'use client';

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

// todo 刷新问题
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    setTheme(stored);
    document.documentElement.dataset.theme = stored;
  }, []);

  return <ThemeContext.Provider value={{ currentTheme: theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
