import type { Info } from '../types';

type Props = Info & {
  fetchData: (name?: string, page?: number) => Promise<void>;
  decrementCounter: () => void;
  incrementCounter: () => void;
  counter: number;
};

const Pagination = ({
  fetchData,
  decrementCounter,
  incrementCounter,
  counter,
  prev,
  next,
  pages,
}: Props) => {
  const handleClickPrev = async (page: number): Promise<void> => {
    await fetchData(undefined, page);
    decrementCounter();
  };

  const handleClickNext = async (page: number): Promise<void> => {
    await fetchData(undefined, page);
    incrementCounter();
  };
  let nextPage: number;
  let prevPage: number;

  if (next) {
    nextPage = +next.split('?page=')[1];
  }

  if (prev) {
    prevPage = +prev.split('?page=')[1];
  }

  return (
    <div className="pagination flex items-center gap-x-2 pt-2">
      {prev && (
        <button
          className="cursor-pointer transition hover:text-slate-700"
          onClick={() => handleClickPrev(prevPage)}
        >
          Prev
        </button>
      )}
      <p>
        {counter} of {pages}
      </p>
      {next && (
        <button
          className="cursor-pointer transition hover:text-slate-700"
          onClick={() => handleClickNext(nextPage)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
