type Props = {
  refetch: () => unknown;
};

const RefreshButton = ({ refetch }: Props) => {
  return (
    <button
      className="cursor-pointer bg-black dark:bg-white hover:bg-slate-200 px-3 py-1 text-white dark:text-black hover:text-black rounded-md transition"
      onClick={refetch}
    >
      Refresh
    </button>
  );
};

export default RefreshButton;
