import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';

export const useGetTheme = () => {
  const themeObject = useContext(ThemeContext);

  if (!themeObject) {
    throw new Error('useGetTheme must be used within a Provider');
  }

  return themeObject;
};
