import { Link, useLocation } from 'react-router';
import type { CharacterSummary } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import {
  addFavorite,
  removeFavorite,
  selectFavoriteItem,
} from '../store/favoriteSlice';

const ResultsItem = ({ id, name, description, url }: CharacterSummary) => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const favoriteItem = useAppSelector((state) => selectFavoriteItem(state, id));

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const action = isChecked
      ? () => addFavorite({ id, name, description, url })
      : () => removeFavorite(id);
    dispatch(action());
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
