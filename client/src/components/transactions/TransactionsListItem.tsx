import { NavLink } from 'react-router-dom';

import Button from '../Button';
import { useDeleteTransactionMutation, useFetchUserQuery } from '../../store';

const TransactionsListItem: React.FC<TransactionsListItemProps> = ({ transaction }) => {
  const [deleteTransaction] = useDeleteTransactionMutation({});
  const { data: user } = useFetchUserQuery('');

  return (
    <div className='flex items-center justify-between p-2 border rounded mb-2 cursor-pointer'>
      <NavLink to={`/transactions/${transaction._id}`}>
        <div className='flex space-x-2 items-center'>
          <div>
            <div className='flex items-center space-x-4'>
              <p>Name: {transaction.name}</p>
              <p>Category: {transaction.category}</p>
            </div>
            <div className='flex items-center space-x-4'>
              <p>Price: ${transaction.price.toFixed(2)}</p>
              <p>Date: {transaction.date.toString()}</p>
            </div>
          </div>
        </div>
      </NavLink>
      <div className='flex space-x-2'>
        <NavLink to={`/transactions/edit/${transaction._id}`}>
          <Button>Edit</Button>
        </NavLink>
        <Button
          danger
          onClick={() =>
            deleteTransaction({
              userId: user?._id,
              id: transaction._id,
            })
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TransactionsListItem;
