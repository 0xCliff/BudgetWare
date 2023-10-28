import { useContext } from 'react';

import { UserContext } from '../context/userContext';

const Home: React.FC = () => {
  const user = useContext(UserContext);

  return (
    <div>
      Welcome{' '}
      {user.isLoading ? (
        '...'
      ) : (
        <span className='text-lg text-violet-500 dark:text-violet-400 font-bold'>{user.data.username}</span>
      )}
    </div>
  );
};

export default Home;
