import { useTranslations } from 'next-intl';

const AboutPage = () => {
  const t = useTranslations('About');

  return (
    <div className="about">
      <h1>{t('title')}</h1>
      <p>{t('text')}</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
        className="transition underline hover:no-underline"
      >
        RS School React {t('course')}
      </a>
    </div>
  );
};

export default AboutPage;
