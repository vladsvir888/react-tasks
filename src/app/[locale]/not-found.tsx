import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

const NotFoundPage = () => {
  const t = useTranslations();

  return (
    <div className="not-found p-2.5 flex justify-center items-center flex-col">
      <h1>404</h1>
      <Link href="/" className="transition underline hover:no-underline">
        {t('GoHome')}
      </Link>
    </div>
  );
};

export default NotFoundPage;
