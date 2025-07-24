import { useEffect, useState } from 'react';
import Search from './Search';
import Results from './Results';
import type { Character, Info } from '../types';
import { cacheKey, cacheUtil } from '../utils/local-storage';
import Pagination from './Pagination';
import ErrorButton from './ErrorButton';

const Main = () => {
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [info, setInfo] = useState<Info>();
  const [counter, setCounter] = useState(1);
  const [hasError, setHasError] = useState(false);

  const incrementCounter = (): void => {
    setCounter(counter + 1);
  };
  const decrementCounter = (): void => {
    setCounter(counter - 1);
  };

  const fetchData = async (name?: string, page?: number): Promise<void> => {
    try {
      setResults([]);
      setLoading(true);
      setError(undefined);
      setInfo(undefined);

      const queryName = `${name ? `?name=${name}` : ''}`;
      const queryPage = `${page ? `?page=${page}` : ''}`;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/character/${queryName}${queryPage}`
      );
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
        setInfo(data.info);
      } else {
        setError(data.error || 'Oops, something went wrong.');
      }
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const makeError = (): void => {
    setHasError(true);
  };

  useEffect(() => {
    const name = cacheUtil.get(cacheKey.reactClassComponentsSearchTerm);
    fetchData(name);
  }, []);

  if (hasError) {
    throw new Error('Error for catching in ErrorBoundary');
  }

  const isEmptySearch = !cacheUtil.get(cacheKey.reactClassComponentsSearchTerm);

  return (
    <>
      <Search fetchData={fetchData} />
      <Results results={results} loading={loading} error={error} />
      {isEmptySearch && info && (
        <Pagination
          fetchData={fetchData}
          counter={counter}
          incrementCounter={incrementCounter}
          decrementCounter={decrementCounter}
          {...info}
        />
      )}
      <ErrorButton makeError={makeError} />
    </>
  );
};

export default Main;
