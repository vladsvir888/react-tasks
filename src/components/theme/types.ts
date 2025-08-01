export const themeList = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = keyof typeof themeList;
export type ComplexTheme = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};
