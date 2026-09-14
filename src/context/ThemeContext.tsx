import React, { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Bộ màu động sẽ tự động thay đổi dựa trên trạng thái isDarkMode
  const theme = {
    isDark: isDarkMode,
    background: isDarkMode ? '#0b0f19' : '#f3f4f6',
    card: isDarkMode ? '#111827' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#111827',
    textSecondary: isDarkMode ? '#9ca3af' : '#6b7280',
    primary: '#d946ef',
    border: isDarkMode ? '#1f2937' : '#e5e7eb',
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);