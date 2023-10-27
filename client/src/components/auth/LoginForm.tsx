import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import Input from '../Input';

interface LoginFormProps {
  toggleVariant: () => void;
}

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Must be a valid email address' }),
  password: z.string().min(8, { message: 'Password required' }),
});

export type LoginValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ toggleVariant }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    setIsLoading(true);

    await axios
      .post('/api/v1/auth/login', data, { withCredentials: true })
      .then(() => toast.success('Logged in.'))
      .catch(() => toast.error('Invalid credentials.'))
      .finally(() => {
        setIsLoading(false);
        document.location.reload();
      });
  };

  return (
    <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <div>
          <Button
            disabled={isLoading}
            fullWidth
            type='submit'
          >
            Sign in
          </Button>
        </div>
      </form>
      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>New to budget-app?</span>
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
        <div
          onClick={toggleVariant}
          className='underline cursor-pointer'
        >
          <span className='text-violet-500'>Create an account</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
