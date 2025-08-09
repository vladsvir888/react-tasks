import Search from './Search';
import Results from './Results';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router';
import useLocalStorage from '../hooks/useLocalStorage';
import { cacheKey } from '../utils/local-storage';
import { useEffect } from 'react';
import { useGetCharacterQuery } from '../store/api';
import RefreshButton from './RefreshButton';

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

  const { data, isFetching, error, refetch } = useGetCharacterQuery(
    searchParams.toString()
  );

  return (
    <div className="main">
      <div className="mb-2">
        <RefreshButton refetch={refetch} />
      </div>
      <Search />
      <Results
        results={data?.results || []}
        loading={isFetching}
        error={data?.error || error}
      />
      {data?.info && <Pagination {...data.info} />}
    </div>
  );
};

export default Main;
