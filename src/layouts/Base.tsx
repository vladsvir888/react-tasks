import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';
import ThemeSwitcher from '../components/theme/ThemeSwitcher';
import FlyOutPanel from '../components/FlyOutPanel';

const BaseLayout = () => {
  return (
    <div className="p-2.5 pb-24">
      <header className="flex flex-wrap items-center justify-between mb-2.5 gap-2.5">
        <Navigation />
        <ThemeSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
      <FlyOutPanel />
    </div>
  );
};

export default BaseLayout;
