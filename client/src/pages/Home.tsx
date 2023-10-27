import axios from 'axios';
import { useQuery } from 'react-query';

interface UserAttributes {
  data: {
    email: string;
    username: string;
    id: string;
  };
  isLoading: boolean;
}

const getUser = async () => {
  return await axios
    .get(`/api/v1/users/${document.cookie.slice(5)}`, { withCredentials: true })
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

const Home: React.FC = () => {
  const { data, isLoading } = useQuery('getUser', getUser);

  return (
    <div>Welcome {isLoading ? '...' : <span className='text-lg text-violet-500 font-bold'>{data.username}</span>}</div>
  );
};
export default Home;
