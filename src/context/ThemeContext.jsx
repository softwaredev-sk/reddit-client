import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

function getFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('theme');
    return value || 'light';
  }
}

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(() => getFromLocalStorage());

  function toggle() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
