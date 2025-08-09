import { Link } from 'react-router';
import type { Character } from '../types';
import Skeleton from './Skeleton';
import RefreshButton from './RefreshButton';

type Props = {
  data?: Character | null;
  loading: boolean;
  search: string;
  error: unknown;
  refetch: () => unknown;
};

const DetailsCard = ({ data, loading, search, error, refetch }: Props) => {
  if (loading) {
    return <Skeleton loading={loading} width={300} height={400} />;
  }

  if (!data || error) {
    return <p>No character</p>;
  }

  return (
    <article className="card border border-slate-200 rounded-sm">
      <img src={data.image} alt="" width={300} height={300} />
      <div className="p-2.5">
        <h2 className="font-bold">{data.name}</h2>
        <p>Gender: {data.gender}</p>
        <p>Species: {data.species}</p>
        <p>Status: {data.status}</p>
        <div className="flex items-center justify-end gap-1.5">
          <RefreshButton refetch={refetch} />
          <Link
            className="cursor-pointer flex transition hover:text-slate-700 dark:hover:text-gray-300"
            to={`/${search}`}
          >
            Close
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DetailsCard;
