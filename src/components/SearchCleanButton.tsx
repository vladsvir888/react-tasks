import IconClose from './icons/IconClose';

type Props = {
  query: string;
  resetQuery: () => void;
};

const SearchCleanButton = ({ query, resetQuery }: Props) =>
  query && (
    <button
      title="Clean query"
      className="cursor-pointer absolute right-1 top-[50%] translate-y-[-50%]"
      type="button"
      onClick={resetQuery}
    >
      <IconClose />
    </button>
  );

export default SearchCleanButton;
