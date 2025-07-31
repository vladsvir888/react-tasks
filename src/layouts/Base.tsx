import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';

const BaseLayout = () => {
  return (
    <div className="p-2.5">
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
