import { Suspense } from 'react';
import Main from '../components/Main';

const HomePage = () => {
  return (
    <div className="home">
      <Suspense>
        <Main />
      </Suspense>
    </div>
  );
};

export default HomePage;
