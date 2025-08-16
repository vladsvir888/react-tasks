import { ReadonlyURLSearchParams } from 'next/navigation';
import { useGetCharacterByIdQuery } from '../store/api';
import DetailsCard from './DetailsCard';
import Skeleton from './Skeleton';

type Props = {
  id: string;
  searchParams: ReadonlyURLSearchParams;
};

const DetailsCardWrapper = ({ id, searchParams }: Props) => {
  const { data, error, isFetching, refetch } = useGetCharacterByIdQuery(id);

  if (isFetching) {
    return <Skeleton loading={isFetching} width={300} height={400} />;
  }

  if (!data || error) {
    return <p>No character</p>;
  }

  return <DetailsCard data={data} search={searchParams} refetch={refetch} />;
};

export default DetailsCardWrapper;
