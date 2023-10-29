import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useCreateTransactionMutation, useFetchUserQuery } from '../../store';
import Input from '../Input';
import Button from '../Button';

const transactionSchema = z.object({
  category: z.string().min(1, { message: 'Category is required.' }),
  date: z.date(),
  name: z.string().min(1, { message: 'Name is required.' }),
  price: z.coerce.number().multipleOf(0.01).min(0.01, { message: 'Price is required.' }),
  userId: z.coerce.string().min(1),
});

type TransactionValues = z.infer<typeof transactionSchema>;

const NewTransactionForm: React.FC = () => {
  const { data: user } = useFetchUserQuery('');
  const [addTransaction] = useCreateTransactionMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: '',
      price: 0.0,
      category: '',
      userId: user?._id,
      date: new Date(),
    },
  });

  const onSubmit: SubmitHandler<TransactionValues> = async (data) => {
    setIsLoading(true);
    addTransaction(data)
      .then(() => toast.success('Transaction added.'))
      .catch((error) => {
        toast.error('Something went wrong.');
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        window.location.href = '/transactions';
      });
  };

  return (
    <div className='w-3/4 mx-auto bg-white rounded-lg p-4 mt-16'>
      <h2 className='text-xl my-2 text-center'>Add a new Transaction</h2>
      <form
        className='space-y-4 mt-12'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id='name'
          label='name'
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id='price'
          label='price'
          type='number'
          min={0}
          step={0.01}
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id='category'
          label='category'
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <div className='flex justify-center'>
          <Button
            disabled={isLoading}
            type='submit'
            fullWidth
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewTransactionForm;
