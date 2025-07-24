import { NavLink, type NavLinkRenderProps } from 'react-router';

const items = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/about',
    text: 'About',
  },
  {
    to: '/not-found',
    text: 'Not found',
  },
];

const Navigation = () => {
  return (
    <nav className="flex gap-2 mb-2.5">
      {items.map(({ to, text }) => (
        <NavLink
          key={text}
          to={to}
          className={({ isActive }: NavLinkRenderProps) =>
            isActive ? 'underline' : 'transition hover:text-slate-700'
          }
        >
          {text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
