import { usePathname, useSearchParams } from 'next/navigation';
import type { Info } from '../types';
import Link from 'next/link';

const Pagination = ({ prev, next, pages }: Info) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get('page');
  const detailsSearchParam = searchParams.get('details');
  const page = pageSearchParam ? +pageSearchParam : 1;

  const createLink = (link: string) => {
    const url = new URL(link);
    return `${pathname}${url.search}${detailsSearchParam ? `&details=${detailsSearchParam}` : ''}`;
  };

  return (
    <div className="pagination flex items-center gap-x-2 pt-2">
      {prev && (
        <Link
          className="cursor-pointer transition hover:text-slate-700 dark:hover:text-gray-300"
          href={createLink(prev)}
        >
          Prev
        </Link>
      )}
      <p>
        {page} of {pages}
      </p>
      {next && (
        <Link
          className="cursor-pointer transition hover:text-slate-700 dark:hover:text-gray-300"
          href={createLink(next)}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
