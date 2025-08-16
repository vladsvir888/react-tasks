'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../i18n/navigation';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const menu = [
    {
      to: '/',
      text: t('Home'),
    },
    {
      to: '/about',
      text: t('About'),
    },
  ];

  return (
    <nav className="flex gap-2">
      {menu.map(({ to, text }) => (
        <Link
          key={text}
          href={to}
          className={
            pathname === to
              ? 'underline'
              : 'transition hover:text-slate-700 dark:hover:text-gray-300'
          }
        >
          {text}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
