import TransactionListItem from './TransactionsListItem';

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
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

export default TransactionsList;
