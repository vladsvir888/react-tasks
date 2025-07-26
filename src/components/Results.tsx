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

  if (loading) {
    return <Skeleton loading={loading} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!error && !list.length) {
    return <p>no results</p>;
  }

  return (
    <div className="results pt-2.5">
      <h1 className="text-3xl font-medium">Search results</h1>
      <div className="pt-2.5">
        {!!list.length && (
          <ul className="flex flex-col gap-y-2">
            {list.map((item) => (
              <li key={item.id}>
                <ResultsItem {...item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Results;
