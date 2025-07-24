type Props = {
  loading: boolean;
};

const Skeleton = ({ loading }: Props) => {
  return (
    <>
      {loading && (
        <div className="skeleton animate-pulse w-[320px]">
          <div className="h-[700px] bg-slate-200 w-full rounded-sm" />
        </div>
      )}
    </>
  );
};

export default Skeleton;
