import clsx from 'clsx';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  disabled?: boolean;
  classNames?: string;
}

const Input: React.FC<InputProps> = ({ label, id, type, required, register, errors, disabled, classNames }) => {
  return (
    <div>
      <label
        className='block text-sm font-medium leading-6 text-gray-900'
        htmlFor={id}
      >
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          type={type}
          required={required}
          autoComplete={id}
          {...register(id)}
          disabled={disabled}
          className={clsx(
            'dark:bg-neutral-200 form-input block w-full rounded-md border-0 py-1.5 px-2 focus:outline-none text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6',
            errors && errors[id] && 'ring-1 ring-rose-500',
            disabled && 'opacity-50 cursor-default',
            classNames
          )}
        />
        {errors && errors[id] && <p className='text-sm text-rose-500'>{errors[id]?.message?.toString()}</p>}
      </div>
    </div>
  );
};

export default Input;
