import { Link, useLocation } from 'react-router';
import type { CharacterSummary } from '../types';

type Props = CharacterSummary;

const ResultsItem = ({ id, name, description }: Props) => {
  const { search } = useLocation();

  return (
    <div className="results-item flex flex-wrap gap-x-4 gap-y-1">
      {name && (
        <Link
          to={`/details/${id}${search}`}
          className="font-bold cursor-pointer transition hover:text-slate-700 dark:hover:text-gray-300"
        >
          {name}
        </Link>
      )}
      {description && <p>{description}</p>}
    </div>
  );
};

export default ResultsItem;
