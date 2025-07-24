type Props = {
  makeError: () => void;
};

const ErrorButton = ({ makeError }: Props) => {
  return (
    <button
      className="error-button cursor-pointer mt-5 bg-slate-200 hover:bg-slate-300 px-3 py-1 text-black rounded-md transition"
      onClick={makeError}
    >
      Make an error
    </button>
  );
};

export default ErrorButton;
