import { Link } from 'react-router';
import type { Character } from '../types';
import Skeleton from './Skeleton';

type Props = {
  data: Character | null;
  loading: boolean;
  search: string;
};

const DetailsCard = ({ data, loading, search }: Props) => {
  if (loading) {
    return <Skeleton loading={loading} width={300} height={400} />;
  }

  if (!data) {
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
        <Link
          className="cursor-pointer flex justify-end transition hover:text-slate-700"
          to={`/${search}`}
        >
          Close
        </Link>
      </div>
    </article>
  );
};

export default DetailsCard;
