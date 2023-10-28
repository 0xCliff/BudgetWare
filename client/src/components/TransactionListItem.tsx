import Button from './Button';
import { Transaction } from './TransactionList';

interface TransactionListItemProps {
  transaction: Transaction;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction }) => {
  return (
    <div className='border rounded mb-2 cursor-pointer'>
      <div className='flex space-x-2 items-center justify-between p-2'>
        <div>
          <div className='flex items-center space-x-4'>
            <p>Name: {transaction.name}</p>
            <p>Category: {transaction.category}</p>
          </div>
          <div className='flex items-center space-x-4'>
            <p>Price: ${transaction.price.toFixed(2)}</p>
            <p>Date: {transaction.date}</p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionListItem;
