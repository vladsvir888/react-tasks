import type { CharacterSummary } from '../types';

type Props = CharacterSummary;

const ResultsItem = ({ name, description }: Props) => {
  return (
    <div className="results-item flex flex-wrap gap-x-4 gap-y-1">
      {name && <p className="font-bold">{name}</p>}
      {description && <p>{description}</p>}
    </div>
  );
};

export default ResultsItem;
