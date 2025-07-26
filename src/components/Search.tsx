import { useState } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { cacheKey, cacheUtil } from '../utils/local-storage';
import { useSearchParams } from 'react-router';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(
    cacheUtil.get(cacheKey.reactClassComponentsSearchTerm) || ''
  );

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    cacheUtil.set(cacheKey.reactClassComponentsSearchTerm, query);
    setSearchParams({ name: query });
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value.trim());
  };

  const resetQuery = (): void => {
    setQuery('');
    cacheUtil.remove(cacheKey.reactClassComponentsSearchTerm);
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
