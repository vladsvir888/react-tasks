type Props = {
  children: React.ReactNode;
  classes?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  handleClick?: () => void;
};

const Button = ({
  children,
  classes,
  disabled,
  type = 'button',
  handleClick,
}: Props) => {
  const buttonClasses = `not-disabled:cursor-pointer border-gray-300 border p-2 rounded text-gray-700 hover:not-disabled:bg-gray-100 ${classes ? classes : ''}`;

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
