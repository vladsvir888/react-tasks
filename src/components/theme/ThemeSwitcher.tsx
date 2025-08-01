import { useGetTheme } from './useGetTheme';
import { themeList, type Theme } from './types';
import { useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { cacheKey } from '../../utils/local-storage';

const ThemeSwitcher = () => {
  const { value: themeLS, set: setThemeLS } = useLocalStorage(
    cacheKey.reactCourseTheme
  );
  const { theme, setTheme } = useGetTheme();
  const preparedThemeList = Object.keys(themeList) as Theme[];

  const handleClick = (item: Theme) => {
    setTheme(item);
    setThemeLS(item);
    document.documentElement.classList.remove(themeList.light, themeList.dark);
    document.documentElement.classList.add(item);
  };

  const toUpperCaseFirstLetter = (item: string) => {
    return item[0].toUpperCase() + item.slice(1);
  };

  useEffect(() => {
    if (themeLS) {
      setTheme(themeLS);
      document.documentElement.classList.add(themeLS);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(themeList.dark);
      document.documentElement.classList.add(themeList.dark);
    }
  }, []);

  return (
    <div className="theme-switcher border rounded-lg px-2 py-1">
      {preparedThemeList.map((item) => (
        <button
          key={item}
          aria-pressed={item === theme}
          className="cursor-pointer py-1 px-2 aria-pressed:bg-slate-800  aria-pressed:rounded-lg aria-pressed:text-white"
          onClick={() => handleClick(item)}
        >
          {toUpperCaseFirstLetter(item)}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
