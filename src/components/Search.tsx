import { useState } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { cacheKey, cacheUtil } from '../utils/local-storage';

type Props = {
  fetchData: (name?: string) => Promise<void>;
};

const Search = ({ fetchData }: Props) => {
  const [query, setQuery] = useState(
    cacheUtil.get(cacheKey.reactClassComponentsSearchTerm) || ''
  );

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    fetchData(query);
    cacheUtil.set(cacheKey.reactClassComponentsSearchTerm, query);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value.trim());
  };

  const resetQuery = (): void => {
    setQuery('');
    cacheUtil.remove(cacheKey.reactClassComponentsSearchTerm);
    fetchData();
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
