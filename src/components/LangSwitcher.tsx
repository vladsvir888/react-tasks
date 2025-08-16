'use client';

import { useLocale } from 'next-intl';
import { routing } from '../i18n/routing';
import { useRouter } from 'next/navigation';

const LangSwitcher = () => {
  const router = useRouter();
  const activeLocale = useLocale();
  const locales = routing.locales;

  return (
    <div className="lang-switcher border rounded-lg px-2 py-1">
      {locales.map((locale) => (
        <button
          key={locale}
          aria-pressed={locale === activeLocale}
          className="cursor-pointer py-1 px-2 aria-pressed:bg-slate-800 dark:aria-pressed:bg-white aria-pressed:rounded-lg aria-pressed:text-white dark:aria-pressed:text-black"
          onClick={() => router.push(`/${locale}`)}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LangSwitcher;
