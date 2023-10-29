import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { useFetchUserQuery, useGetTransactionsByIdQuery, useUpdateTransactionMutation } from '../../store';
import Input from '../Input';
import Button from '../Button';
import Skeleton from '../Skeleton';

const transactionSchema = z.object({
  category: z.string().min(1, { message: 'Category is required.' }),
  date: z.date(),
  name: z.string().min(1, { message: 'Name is required.' }),
  price: z.coerce.number().multipleOf(0.01).min(0.01, { message: 'Price is required.' }),
  userId: z.coerce.string().min(1),
  transactionId: z.string(),
});

type TransactionValues = z.infer<typeof transactionSchema>;

const EditTransactionForm: React.FC = () => {
  const { transactionId } = useParams();
  const { data, isFetching, error } = useGetTransactionsByIdQuery(transactionId as string);
  const { data: user } = useFetchUserQuery('');
  const [updateTransaction] = useUpdateTransactionMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: data?.name,
      price: data?.price,
      category: data?.category,
      userId: user?._id,
      date: new Date(),
      transactionId: data?._id,
    },
  });

  if (isFetching) {
    return <Skeleton times={4} />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const onSubmit: SubmitHandler<TransactionValues> = async (data) => {
    setIsLoading(true);
    console.log(data);
    updateTransaction(data)
      .then(() => toast.success('Transaction added.'))
      .catch((error: FieldErrors) => {
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
      <h2 className='text-xl my-2 text-center'>Edit a Transaction</h2>
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTransactionForm;
