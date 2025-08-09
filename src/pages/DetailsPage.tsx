import { useLocation, useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import { useGetCharacterByIdQuery } from '../store/api';

const DetailsPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const { data, error, isFetching } = useGetCharacterByIdQuery(id ?? '');

  return (
    <DetailsCard
      data={data}
      loading={isFetching}
      search={search}
      error={error}
    />
  );
};

export default DetailsPage;
