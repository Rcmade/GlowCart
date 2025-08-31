import React, { createContext, useContext, useState } from 'react';
import { darkTheme, lightTheme } from './themes';

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }:{ children: React.ReactNode}) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
