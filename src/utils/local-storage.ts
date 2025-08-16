import type { Theme } from '../types';

export const cacheKey = {
  reactCourseSearchTerm: 'reactCourseSearchTerm',
  reactCourseTheme: 'reactCourseTheme',
} as const;

export interface CacheValues {
  [cacheKey.reactCourseSearchTerm]: string;
  [cacheKey.reactCourseTheme]: Theme;
}

export type Keys = keyof typeof cacheKey;

interface CacheUtil {
  set: <T extends Keys>(key: T, value: CacheValues[T]) => void;
  get: <T extends Keys>(key: T) => CacheValues[T];
  remove: (key: Keys) => void;
  removeAll: () => void;
}

export const cacheUtil: CacheUtil = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(key) ?? 'null');
    }
  },
  remove: (key) => localStorage.removeItem(key),
  removeAll: () => localStorage.clear(),
};
