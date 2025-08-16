import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="not-found p-2.5 flex justify-center items-center flex-col">
      <h1>404</h1>
      <Link href="/" className="transition underline hover:no-underline">
        Go home
      </Link>
    </div>
  );
};

export default NotFoundPage;
