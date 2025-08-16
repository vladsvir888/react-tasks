'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menu = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/about',
    text: 'About',
  },
];

const Navigation = () => {
  const pathname = usePathname();

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
