import { useLocation, useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import type { Character } from '../types';
import { API_URL } from '../constants/config';
import useFetch from '../hooks/useFetch';

const DetailsPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const { data, loading } = useFetch<Character>(`${API_URL}/character/${id}`);

  return <DetailsCard data={data} loading={loading} search={search} />;
};

export default DetailsPage;
