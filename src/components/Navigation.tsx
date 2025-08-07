import { NavLink, type NavLinkRenderProps } from 'react-router';

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
  return (
    <nav className="flex gap-2">
      {menu.map(({ to, text }) => (
        <NavLink
          key={text}
          to={to}
          className={({ isActive }: NavLinkRenderProps) =>
            isActive
              ? 'underline'
              : 'transition hover:text-slate-700 dark:hover:text-gray-300'
          }
        >
          {text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
