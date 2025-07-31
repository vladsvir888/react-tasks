import IconClose from './icons/IconClose';

type Props = {
  query: string;
  setQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
};

const SearchInput = ({ query, setQuery, resetQuery }: Props) => {
  return (
    <div className="search-input relative">
      <input
        name="q"
        type="text"
        placeholder="Search..."
        className="border-slate-300 border rounded-md pl-2 pr-5 py-1"
        required
        value={query}
        onChange={setQuery}
      />
      {query && (
        <button
          title="Clean query"
          className="cursor-pointer absolute right-1 top-[50%] translate-y-[-50%]"
          type="button"
          onClick={resetQuery}
        >
          <IconClose />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
