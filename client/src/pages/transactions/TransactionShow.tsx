import { useParams } from 'react-router-dom';

import { useGetTransactionsByIdQuery } from '../../store';
import Skeleton from '../../components/Skeleton';

const TransactionShow: React.FC = () => {
  const { transactionId } = useParams();

  const { data, isFetching, error } = useGetTransactionsByIdQuery(transactionId ?? '');

  if (isFetching) {
    return <Skeleton times={1} />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <div className='border min-h-min rounded p-2'>
      <div>
        <h2>{data.name}</h2>
      </div>
    </div>
  );
};
export default TransactionShow;
