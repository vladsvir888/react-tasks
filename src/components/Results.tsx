import type { Character } from '../types';
import ResultsItem from './ResultsItem';
import Skeleton from './Skeleton';

type Props = {
  results: Character[];
  loading: boolean;
  error?: string;
};

const Results = ({ results, loading, error }: Props) => {
  const list = results.map((item) => ({
    id: item.id,
    name: item.name,
    description: `${item.gender}, ${item.species}, ${item.status}`,
  }));

  return (
    <div className="results pt-2.5">
      <h1 className="text-3xl font-medium">Search results</h1>
      <div className="pt-2.5">
        {loading && <Skeleton loading={loading} />}
        {!!list.length && (
          <ul className="flex flex-col gap-y-2">
            {list.map((item) => (
              <li key={item.id}>
                <ResultsItem {...item} />
              </li>
            ))}
          </ul>
        )}
        {error && <p>{error}</p>}
        {!error && !list.length && <p>no results</p>}
      </div>
    </div>
  );
};

export default Results;
