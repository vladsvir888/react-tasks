import { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { themeList, type Theme } from './types';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(themeList.light);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export default ThemeProvider;
