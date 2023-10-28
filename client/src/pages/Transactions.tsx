import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import TransactionList, { Transaction } from '../components/TransactionList';
import { UserContext } from '../context/userContext';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    data: { _id: id },
  } = useContext(UserContext);

  const { data, isLoading, isIdle, isError } = useQuery(['getTransactions', id], async () => {
    return await axios
      .get(`/api/v1/${id}/transactions`, { withCredentials: true })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  });

  if (isLoading || isIdle) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredData = data.filter((transaction: Transaction) => {
    return (
      transaction.name.toLowerCase().includes(searchTerm) || transaction.category.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className='w-full min-h-screen space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl'>Transactions</h2>
        <Button>+</Button>
      </div>

      <div className=''>
        <SearchBar
          placeholder='Search'
          id='term'
          classNames=''
          value={searchTerm}
          onChange={(e: any) => handleChange(e.target.value)}
        />
      </div>
      <div>
        <TransactionList transactions={filteredData} />
      </div>
    </div>
  );
};

export default Transactions;
