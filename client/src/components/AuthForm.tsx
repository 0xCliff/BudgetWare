import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Input from './Input';
import Button from './Button';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm: React.FC = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      await axios
        .post('/api/v1/auth/register', data, { withCredentials: true })
        .then(() => toast.success('Welcome.'))
        .catch(() => toast.error('Something went wrong.'))
        .finally(() => {
          setIsLoading(false);
          document.location.reload();
        });
    }

    if (variant === 'LOGIN') {
      await axios
        .post('/api/v1/auth/login', data, { withCredentials: true })
        .then(() => toast.success('Logged in.'))
        .catch(() => toast.error('Invalid credentials.'))
        .finally(() => {
          setIsLoading(false);
          document.location.reload();
        });
    }
  };

  return (
    <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        {variant === 'REGISTER' && (
          <Input
            label='User name'
            id='username'
            register={register}
            required
            errors={errors}
            disabled={isLoading}
          />
        )}
        <Input
          label='Email address'
          id='email'
          type='email'
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <Input
          label='Password'
          id='password'
          register={register}
          required
          type='password'
          errors={errors}
          disabled={isLoading}
        />
        {variant === 'REGISTER' && (
          <Input
            label='Confirm password'
            id='confirmPassword'
            type='password'
            register={register}
            required
            errors={errors}
            disabled={isLoading}
          />
        )}
        <div>
          <Button
            disabled={isLoading}
            fullWidth
            type='submit'
          >
            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
          </Button>
        </div>
      </form>
      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>
              {variant === 'LOGIN' ? 'New to budget-app?' : 'Already have an account?'}
            </span>
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
        <div
          onClick={toggleVariant}
          className='underline cursor-pointer'
        >
          {variant === 'LOGIN' ? (
            <span className='text-violet-500'>Create an account</span>
          ) : (
            <span className='text-violet-500'>Login</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
