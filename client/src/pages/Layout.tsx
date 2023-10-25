import { FaMoneyCheckAlt } from 'react-icons/fa';

import AuthForm from '../components/AuthForm';
import Navigation from '../components/Navigation';

const Layout: React.FC<any> = ({ children }) => {
  let layout;
  if (document.cookie.includes('AUTH')) {
    layout = (
      <div className='flex flex-col lg:flex-row'>
        <Navigation />
        <div className='m-4 w-full min-h-full rounded shadow p-2'>{children}</div>
      </div>
    );
  } else {
    layout = (
      <div className='sm:w-full sm:min-h-full sm:max-w-md sm:mx-auto sm:mt-24 m-8'>
        <div className='flex flex-col space-y-6'>
          <FaMoneyCheckAlt className='text-violet-500 mx-auto sm:h-24 sm:w-24 h-16 w-16' />
          <h1 className='text-4xl text-center'>
            Sign In To <span className='text-violet-500 font-bold'>Budget App</span>
          </h1>
          <AuthForm />
        </div>
      </div>
    );
  }

  return layout;
};

export default Layout;
