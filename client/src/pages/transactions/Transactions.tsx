import { useState } from 'react';

import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import { useFetchTransactionsQuery, useFetchUserQuery } from '../../store';
import TransactionList from '../../components/transactions/TransactionsList';
import { NavLink } from 'react-router-dom';
import Skeleton from '../../components/Skeleton';

const Transactions: React.FC = () => {
  const { data: user } = useFetchUserQuery('');
  const { data, isError, isLoading } = useFetchTransactionsQuery(user?._id ?? '');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (isError) {
    return <div>Error...</div>;
  }

  const handleChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredData = data?.filter((transaction: Transaction) => {
    return (
      transaction.name.toLowerCase().includes(searchTerm) ||
      transaction.category.toLowerCase().includes(searchTerm) ||
      transaction.price.toString().includes(searchTerm) ||
      transaction.date.toString().includes(searchTerm)
    );
  });

  return (
    <div className='w-full min-h-screen space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl'>Transactions</h2>
        <NavLink to={`/transactions/new`}>
          <Button>+</Button>
        </NavLink>
      </div>

      <div className=''>
        <SearchBar
          placeholder='Filter Transactions'
          id='term'
          classNames=''
          value={searchTerm}
          onChange={(e: any) => handleChange(e.target.value)}
        />
      </div>
      <div>
        {isLoading && (
          <div className='flex flex-col items-center mt-2'>
            <Skeleton
              times={6}
              classNames='h-14 w-full mx-2'
            />
          </div>
        )}
        <TransactionList transactions={filteredData ?? []} />
      </div>
    </div>
  );
};

export default Transactions;
