import { useState } from 'react';
import { ThemeContext } from '../contexts/theme';
import { type Theme } from '../types';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export default ThemeProvider;
