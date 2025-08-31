import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

type Props = {
  query: string;
  setQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
};

const SearchCleanButton = dynamic(
  () => import('../components/SearchCleanButton'),
  { ssr: false }
);

const SearchInput = ({ query, setQuery, resetQuery }: Props) => {
  const t = useTranslations();

  return (
    <div className="search-input relative">
      <input
        name="q"
        type="text"
        placeholder={t('Search')}
        className="border-slate-300 border rounded-md pl-2 pr-5 py-1 placeholder-slate-400 dark:placeholder-slate-100"
        required
        value={query}
        onChange={setQuery}
      />
      <SearchCleanButton query={query} resetQuery={resetQuery} />
    </div>
  );
};

export default SearchInput;
