import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isUnderground, setIsUnderground] = useState(true);

  const theme = isUnderground 
    ? {
        name: 'UNDERGROUND',
        color: 'text-[#FFD700]', 
        bgColor: 'bg-[#FFD700]',
        borderColor: 'border-[#FFD700]',
        heroImage: '/IRON-X-GYM-2-IMAGES/ug-hero.jpg' // <-- Updated to ug-hero
      }
    : {
        name: 'HQ',
        color: 'text-[#39FF14]', 
        bgColor: 'bg-[#39FF14]',
        borderColor: 'border-[#39FF14]',
        heroImage: '/IRON-X-GYM-2-IMAGES/hq-hero.jpg' // <-- Updated to hq-hero
      };

  const toggleTheme = () => setIsUnderground(!isUnderground);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isUnderground }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);