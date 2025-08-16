import { useState } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { cacheKey } from '../utils/local-storage';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
  const {
    value: valueLS,
    set: setInLS,
    remove: removeFromLS,
  } = useLocalStorage(cacheKey.reactCourseSearchTerm);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(valueLS || '');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setInLS(query);
    router.push(`?name=${query}`);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value.trim());
  };

  const resetQuery = (): void => {
    setQuery('');
    removeFromLS();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('name');
    newSearchParams.delete('page');
    router.push(`?${newSearchParams.toString()}`);
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
