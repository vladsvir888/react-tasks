'use client';

import Search from './Search';
import Results from './Results';
import Pagination from './Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import useLocalStorage from '../hooks/useLocalStorage';
import { cacheKey } from '../utils/local-storage';
import { useEffect } from 'react';
import { useGetCharacterQuery } from '../store/api';
import RefreshButton from './RefreshButton';
import DetailsCardWrapper from './DetailsCardWrapper';

const Main = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const detailsParam = searchParams.get('details');
  const { value: searchQuery } = useLocalStorage(
    cacheKey.reactCourseSearchTerm
  );

  useEffect(() => {
    if (searchQuery && !searchParams?.size) {
      router.push(`?name=${searchQuery}`);
    }
  }, []);

  const characterQuerySearchParams = new URLSearchParams(searchParams);
  characterQuerySearchParams.delete('details');

  const { data, isFetching, error, refetch } = useGetCharacterQuery(
    characterQuerySearchParams.toString()
  );

  return (
    <div className="main flex flex-col sm:flex-row gap-2.5 items-start">
      <div>
        <div className="mb-2">
          <RefreshButton refetch={refetch} />
        </div>
        <Search />
        <Results
          results={data?.results || []}
          loading={isFetching}
          error={data?.error || error}
        />
        {data?.info && <Pagination {...data.info} />}
      </div>
      {detailsParam && (
        <DetailsCardWrapper id={detailsParam} searchParams={searchParams} />
      )}
    </div>
  );
};

export default Main;
