import { useState } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { cacheKey } from '../utils/local-storage';
import { useSearchParams } from 'react-router';
import useLocalStorage from '../hooks/useLocalStorage';

const Search = () => {
  const {
    value: valueLS,
    set: setInLS,
    remove: removeFromLS,
  } = useLocalStorage(cacheKey.reactCourseSearchTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(valueLS || '');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setInLS(query);
    setSearchParams({ name: query });
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value.trim());
  };

  const resetQuery = (): void => {
    setQuery('');
    removeFromLS();
    searchParams.delete('name');
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  return (
    <div className="top-controls">
      <form className="flex items-center gap-x-2" onSubmit={handleSubmit}>
        <SearchInput
          query={query}
          setQuery={handleQuery}
          resetQuery={resetQuery}
        />
        <SearchButton />
      </form>
    </div>
  );
};

export default Search;
