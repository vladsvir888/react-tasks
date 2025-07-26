import { useEffect, useState } from 'react';
import Search from './Search';
import Results from './Results';
import type { Character, Info } from '../types';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router';

const Main = () => {
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [info, setInfo] = useState<Info>();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setResults([]);
        setLoading(true);
        setError(undefined);
        setInfo(undefined);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/character/?${searchParams.toString()}`
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

    fetchData();
  }, [searchParams]);

  return (
    <>
      <Search />
      <Results results={results} loading={loading} error={error} />
      {info && <Pagination {...info} />}
    </>
  );
};

export default Main;
