type Props = {
  message?: string;
};

const ErrorMessage = ({ message }: Props) => {
  return message && <p className="text-red-500 text-xs">{message}</p>;
};

export default ErrorMessage;
