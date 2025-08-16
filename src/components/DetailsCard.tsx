import Link from 'next/link';
import type { Character } from '../types';
import RefreshButton from './RefreshButton';
import { ReadonlyURLSearchParams } from 'next/navigation';

type Props = {
  data: Character;
  search: ReadonlyURLSearchParams;
  refetch: () => unknown;
};

const DetailsCard = ({ data, search, refetch }: Props) => {
  const searchParams = new URLSearchParams(search);
  searchParams.delete('details');

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
            href={`/?${searchParams.toString()}`}
          >
            Close
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DetailsCard;
