import type { Info } from '../types';
import { Link, useLocation, useSearchParams } from 'react-router';

type Props = Info;

const Pagination = ({ prev, next, pages }: Props) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const pageSearchParam = searchParams.get('page');
  const page = pageSearchParam ? +pageSearchParam : 1;

  const createLink = (link: string) => {
    const url = new URL(link);
    return `${pathname}${url.search}`;
  };

  return (
    <div className="pagination flex items-center gap-x-2 pt-2">
      {prev && (
        <Link
          className="cursor-pointer transition hover:text-slate-700"
          to={createLink(prev)}
        >
          Prev
        </Link>
      )}
      <p>
        {page} of {pages}
      </p>
      {next && (
        <Link
          className="cursor-pointer transition hover:text-slate-700"
          to={createLink(next)}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
