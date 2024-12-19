// ThemeContext.js
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeChanger = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
