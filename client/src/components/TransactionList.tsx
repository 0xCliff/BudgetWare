import TransactionListItem from './TransactionListItem';

export interface Transaction {
  category: string;
  date: string;
  name: string;
  price: number;
  user: string;
  _id: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const renderedTransactions = transactions.map((transaction: Transaction) => {
    return (
      <TransactionListItem
        key={transaction._id}
        transaction={transaction}
      />
    );
  });

  return <div>{renderedTransactions}</div>;
};

export default TransactionList;
