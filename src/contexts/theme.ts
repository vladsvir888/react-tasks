import { createContext } from 'react';
import type { ComplexTheme } from '../types';

export const ThemeContext = createContext<ComplexTheme | null>(null);
