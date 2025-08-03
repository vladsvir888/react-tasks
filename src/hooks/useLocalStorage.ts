import { useCallback, useState } from 'react';
import { cacheUtil, type CacheValues, type Keys } from '../utils/local-storage';

const useLocalStorage = <T extends Keys>(key: T) => {
  const [value, setValue] = useState<CacheValues[T] | null>(() =>
    cacheUtil.get(key)
  );

  const set = useCallback(
    (newValue: CacheValues[T]) => {
      setValue(newValue);
      cacheUtil.set(key, newValue);
    },
    [key]
  );

  const remove = useCallback(() => {
    setValue(null);
    cacheUtil.remove(key);
  }, [key]);

  return {
    value,
    set,
    remove,
  };
};

export default useLocalStorage;
