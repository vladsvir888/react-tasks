import type { Character } from '../types';
import ResultsItem from './ResultsItem';
import Skeleton from './Skeleton';

type Props = {
  results: Character[];
  loading: boolean;
  error?: unknown;
};

const Results = ({ results, loading, error }: Props) => {
  const list = results.map((item) => ({
    id: item.id,
    name: item.name,
    url: item.url,
    description: `${item.gender}, ${item.species}, ${item.status}`,
  }));

  if (loading) {
    return (
      <div className="pt-2.5">
        <Skeleton loading={loading} />
      </div>
    );
  }

  if (error) {
    return <p className="pt-2.5">There is nothing here</p>;
  }

  if (!list.length) {
    return <p className="pt-2.5">no results</p>;
  }

  return (
    <div className="results pt-2.5">
      <h1 className="text-3xl font-medium">Search results</h1>
      <div className="pt-2.5">
        <ul className="flex flex-col gap-y-2">
          {list.map((item) => (
            <li key={item.id}>
              <ResultsItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
