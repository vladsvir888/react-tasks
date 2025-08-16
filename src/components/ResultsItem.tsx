import Link from 'next/link';
import type { CharacterSummary } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import {
  addFavorite,
  removeFavorite,
  selectFavoriteItem,
} from '../store/favoriteSlice';
import { useSearchParams } from 'next/navigation';

const ResultsItem = ({ id, name, description, url }: CharacterSummary) => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const favoriteItem = useAppSelector((state) => selectFavoriteItem(state, id));

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const action = isChecked
      ? () => addFavorite({ id, name, description, url })
      : () => removeFavorite(id);
    dispatch(action());
  };

  const createLinkHref = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', String(id));
    return `?${params.toString()}`;
  };

  return (
    <div className="results-item flex flex-wrap gap-x-4 gap-y-1">
      <input
        className="accent-black dark:accent-white"
        type="checkbox"
        aria-label={name}
        checked={!!favoriteItem?.checked}
        onChange={handleCheckbox}
      />
      {name && (
        <Link
          href={createLinkHref()}
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
