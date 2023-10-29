import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import Input from '../Input';
import { useRegisterMutation } from '../../store';

const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Username is required.' })
      .max(25, { message: 'Username must be less than 25 charaters' }),
    email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Must be a valid email address' }),
    password: z.string().min(8, { message: 'Password must be greater than 8 chracters.' }),
    confirmPassword: z.string().min(8, { message: 'Please confirm password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

export type RegisterValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC<AuthFormProps> = ({ toggleVariant }) => {
  const [signUp] = useRegisterMutation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    setIsLoading(true);

    signUp(data)
      .then(() => toast.success('Welcome.'))
      .catch((error) => {
        toast.error('Something went wrong.');
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='dark:bg-neutral-200 bg-white px-4 py-8 shadow rounded-lg sm:px-10'>
      <form
        className='space-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label='User name'
          id='username'
          type='text'
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />

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
          type='password'
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />

        <Input
          label='Confirm password'
          id='confirmPassword'
          type='password'
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />

        <div>
          <Button
            disabled={isLoading}
            fullWidth
            type='submit'
          >
            Register
          </Button>
        </div>
      </form>
      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='dark:bg-neutral-200 bg-white px-2 text-gray-500'>Already have an account?</span>
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
        <div
          onClick={toggleVariant}
          className='underline cursor-pointer'
        >
          <span className='text-violet-500'>Login</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
