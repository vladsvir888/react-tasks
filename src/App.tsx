import { Suspense } from 'react';
import Loading from './components/Loading';
import DataTable from './components/DataTable';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DataTable />
    </Suspense>
  );
}

export default App;
