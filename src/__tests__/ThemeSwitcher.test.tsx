import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { cacheKey, cacheUtil } from '../utils/local-storage';
import { themeList } from '../constants/theme';
import ThemeSwitcher from '../components/ThemeSwitcher';
import ThemeProvider from '../providers/theme';

const ThemeProviderWithSwitcher = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
};

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    cacheUtil.remove(cacheKey.reactCourseTheme);
    document.documentElement.classList.remove(
      ...document.documentElement.classList
    );
  });

  it('should set theme from localStorage', () => {
    cacheUtil.set(cacheKey.reactCourseTheme, themeList.dark);

    render(<ThemeProviderWithSwitcher />);

    expect(document.documentElement.classList.contains(themeList.dark)).toEqual(
      true
    );
  });

  it('should set dark theme based on prefers-color-scheme', () => {
    globalThis.matchMedia = vi.fn().mockReturnValue({
      matches: true,
    });

    render(<ThemeProviderWithSwitcher />);

    expect(document.documentElement.classList.contains(themeList.dark)).toEqual(
      true
    );
  });

  it('should set dark theme on button click', () => {
    render(<ThemeProviderWithSwitcher />);

    const darkButton = screen.getByText('Dark');
    fireEvent.click(darkButton);

    expect(cacheUtil.get(cacheKey.reactCourseTheme)).toEqual(themeList.dark);
    expect(document.documentElement.classList.contains(themeList.dark)).toEqual(
      true
    );
    expect(
      document.documentElement.classList.contains(themeList.light)
    ).toEqual(false);
  });
});
