import { useGetTheme } from '../hooks/useGetTheme';
import { type Theme } from '../types';
import { themeList } from '../constants/theme';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { cacheKey } from '../utils/local-storage';

const ThemeSwitcher = () => {
  const { value: themeLS, set: setThemeLS } = useLocalStorage(
    cacheKey.reactCourseTheme
  );
  const { theme, setTheme } = useGetTheme();

  const preparedThemeList = Object.keys(themeList) as Theme[];

  const toUpperCaseFirstLetter = (item: Theme) => {
    return item[0].toUpperCase() + item.slice(1);
  };

  useEffect(() => {
    if (theme) {
      setThemeLS(theme);
      document.documentElement.classList.remove(
        themeList.light,
        themeList.dark
      );
      document.documentElement.classList.add(theme);
    } else if (themeLS) {
      setTheme(themeLS);
    } else {
      const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? themeList.dark
        : themeList.light;
      setTheme(preferredTheme);
    }
  }, [theme]);

  return (
    <div className="theme-switcher border rounded-lg px-2 py-1">
      {preparedThemeList.map((item) => (
        <button
          key={item}
          aria-pressed={item === theme}
          className="cursor-pointer py-1 px-2 aria-pressed:bg-slate-800 dark:aria-pressed:bg-white aria-pressed:rounded-lg aria-pressed:text-white dark:aria-pressed:text-black"
          onClick={() => setTheme(item)}
        >
          {toUpperCaseFirstLetter(item)}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
