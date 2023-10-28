import clsx from 'clsx';
import { AiOutlineReload } from 'react-icons/ai';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        className,
        'flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary &&
          !danger &&
          'bg-violet-500 dark:bg-violet-400 hover:bg-violet-600 dark:hover:bg-violet-500 focus-visible:outline-violet-600 dark:focus-visible:outline-violet-500'
      )}
    >
      {disabled ? <AiOutlineReload className='h-4 w-4 animate-spin' /> : children}
    </button>
  );
};

export default Button;
