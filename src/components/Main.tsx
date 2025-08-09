import Search from './Search';
import Results from './Results';
import type { Character, Info } from '../types';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router';
import { API_URL } from '../constants/config';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import { cacheKey } from '../utils/local-storage';
import { useEffect } from 'react';

type Data = {
  results: Character[];
  info: Info;
  error?: string;
};

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { value: searchQuery } = useLocalStorage(
    cacheKey.reactCourseSearchTerm
  );

  useEffect(() => {
    if (searchQuery && !searchParams.size) {
      setSearchParams({ name: searchQuery });
    }
  }, []);

  const { data, loading, error } = useFetch<Data>(
    `${API_URL}/character/?${searchParams.toString()}`
  );

  return (
    <div className="main">
      <Search />
      <Results
        results={data?.results || []}
        loading={loading}
        error={data?.error || error}
      />
      {data?.info && <Pagination {...data.info} />}
    </div>
  );
};

export default Main;
