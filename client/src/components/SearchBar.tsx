import clsx from 'clsx';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  classNames?: string;
  onChange?: (e: any) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, id, required, disabled, classNames, onChange, placeholder }) => {
  return (
    <div className='flex items-center'>
      <FiSearch className='h-8 w-8 mr-2' />
      <input
        id={id}
        type='text'
        required={required}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        className={clsx(
          'dark:bg-neutral-200 form-input block w-full rounded-md border-0 py-1.5 px-2 focus:outline-none text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 placeholder:text-md focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6',
          disabled && 'opacity-50 cursor-default',
          classNames
        )}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
