import { useTranslations } from 'next-intl';
import IconClose from './icons/IconClose';

type Props = {
  query: string;
  resetQuery: () => void;
};

const SearchCleanButton = ({ query, resetQuery }: Props) => {
  const t = useTranslations();

  return (
    query && (
      <button
        title={t('ClearQuery')}
        className="cursor-pointer absolute right-1 top-[50%] translate-y-[-50%]"
        type="button"
        onClick={resetQuery}
      >
        <IconClose />
      </button>
    )
  );
};

export default SearchCleanButton;
