type Props = {
  loading: boolean;
  width?: number;
  height?: number;
};

const Skeleton = ({ loading, width = 320, height = 700 }: Props) =>
  loading && (
    <div className="skeleton animate-pulse" style={{ width: `${width}px` }}>
      <div
        className="bg-slate-200 w-full rounded-sm"
        style={{ height: `${height}px` }}
      />
    </div>
  );

export default Skeleton;
