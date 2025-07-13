export const cacheKey = {
  reactClassComponentsSearchTerm: 'reactClassComponentsSearchTerm',
} as const;

interface CacheValues {
  [cacheKey.reactClassComponentsSearchTerm]: string;
}

type Keys = keyof typeof cacheKey;

interface CacheUtil {
  set: <T extends Keys>(key: T, value: CacheValues[T]) => void;
  get: <T extends Keys>(key: T) => CacheValues[T];
  remove: (key: Keys) => void;
  removeAll: () => void;
}

export const cacheUtil: CacheUtil = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => JSON.parse(localStorage.getItem(key) ?? 'null'),
  remove: (key) => localStorage.removeItem(key),
  removeAll: () => localStorage.clear(),
};
