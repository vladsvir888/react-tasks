import { Outlet } from 'react-router';
import Main from '../components/Main';

const HomePage = () => {
  return (
    <div className="home flex flex-col sm:flex-row gap-2.5 items-start">
      <Main />
      <Outlet />
    </div>
  );
};

export default HomePage;
