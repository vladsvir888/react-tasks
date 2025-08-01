import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export const useGetTheme = () => {
  const themeObject = useContext(ThemeContext);

  if (!themeObject) {
    throw new Error('useGetTheme must be used within a Provider');
  }

  return themeObject;
};
