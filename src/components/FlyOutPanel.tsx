import { useAppDispatch, useAppSelector } from '../store';
import {
  createDownloadFavoriteLink,
  removeAllFavorite,
  selectFavoriteDownloadLink,
  selectFavoriteItemsCount,
} from '../store/favoriteSlice';

const FlyOutPanel = () => {
  const count = useAppSelector(selectFavoriteItemsCount);
  const link = useAppSelector(selectFavoriteDownloadLink);
  const dispatch = useAppDispatch();

  if (!count) {
    return null;
  }

  return (
    <div className="fly-out-panel fixed bottom-0 left-0 p-2.5 bg-white dark:bg-black w-full flex flex-col items-center border-t">
      <p className="mb-1.5">Selected items: {count}</p>
      <div className="flex gap-1.5">
        <button
          className="cursor-pointer bg-black dark:bg-white hover:bg-slate-200 px-3 py-1 text-white dark:text-black hover:text-black rounded-md transition"
          type="button"
          onClick={() => dispatch(removeAllFavorite())}
        >
          Unselect all
        </button>
        <a
          href={link}
          className="cursor-pointer bg-black dark:bg-white hover:bg-slate-200 px-3 py-1 text-white dark:text-black hover:text-black rounded-md transition"
          download={`${count}_items.csv`}
          onClick={() => {
            dispatch(createDownloadFavoriteLink());
          }}
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default FlyOutPanel;
