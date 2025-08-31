import { useTranslations } from 'next-intl';

const SearchButton = () => {
  const t = useTranslations();

  return (
    <button
      className="search-button cursor-pointer bg-black dark:bg-white hover:bg-slate-200 px-3 py-1 text-white dark:text-black hover:text-black rounded-md transition"
      type="submit"
    >
      {t('Submit')}
    </button>
  );
};

export default SearchButton;
