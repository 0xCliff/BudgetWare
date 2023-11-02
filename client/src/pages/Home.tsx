import Skeleton from '../components/Skeleton';
import { useFetchUserQuery } from '../store';

const Dashboard: React.FC = () => {
  const { data, error, isFetching } = useFetchUserQuery('');
  console.log(data);

  if (isFetching) {
    return <Skeleton times={4} />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div>
      Welcome{' '}
      <span className='text-lg text-violet-500 dark:text-violet-400 font-bold'>
        {data?.username}
      </span>
    </div>
  );
};

export default Dashboard;
