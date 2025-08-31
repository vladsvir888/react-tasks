'use client';

import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../store';
import {
  removeAllFavorite,
  selectFavoriteItemsCount,
  selectFavouriteItems,
} from '../store/favoriteSlice';
import { useRef, useState } from 'react';

const FlyOutPanel = () => {
  const t = useTranslations();
  const count = useAppSelector(selectFavoriteItemsCount);
  const items = useAppSelector(selectFavouriteItems);
  const dispatch = useAppDispatch();
  const [link, setLink] = useState<string>('');
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  if (!count) {
    return null;
  }

  const handleCsvFile = async () => {
    try {
      const res = await fetch('/api/create-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      const data = await res.blob();
      const url = URL.createObjectURL(data);
      setLink(url);
      setTimeout(() => {
        downloadLinkRef.current?.click();
        URL.revokeObjectURL(url);
        setLink('');
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fly-out-panel fixed bottom-0 left-0 p-2.5 bg-white dark:bg-black w-full flex flex-col items-center border-t">
      <p className="mb-1.5">Selected items: {count}</p>
      <div className="flex gap-1.5">
        <button
          className="cursor-pointer bg-black dark:bg-white hover:bg-slate-200 px-3 py-1 text-white dark:text-black hover:text-black rounded-md transition"
          type="button"
          onClick={() => dispatch(removeAllFavorite())}
        >
          {t('Unselect all')}
        </button>
        <button
          className="cursor-pointer bg-black dark:bg-white hover:bg-slate-200 px-3 py-1 text-white dark:text-black hover:text-black rounded-md transition"
          onClick={handleCsvFile}
        >
          {t('Download')}
        </button>
        <a
          ref={downloadLinkRef}
          href={link}
          className="cursor-pointer bg-black dark:bg-white hover:bg-slate-200 px-3 py-1 text-white dark:text-black hover:text-black rounded-md transition"
          download={`${count}_items.csv`}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default FlyOutPanel;
