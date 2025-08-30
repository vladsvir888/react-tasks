import { use } from 'react';
import { fetchData } from '../api';
import type { ResponseData } from '../types';

const DataTable = () => {
  const data = use(fetchData()) as ResponseData;

  console.log(data, 'data');

  return <div>Table</div>;
};

export default DataTable;
