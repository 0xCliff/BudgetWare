import { FaMoneyCheckAlt } from 'react-icons/fa';

import AuthForm from '../components/auth/AuthForm';
import Navigation from '../components/Navigation';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC<any> = ({ children }) => {
  if (document.cookie.includes('AUTH')) {
    return (
      <div className='flex flex-col lg:flex-row'>
        <Toaster />
        <Navigation />
        <div className='m-4 w-full min-h-full'>{children}</div>
      </div>
    );
  } else {
    return (
      <div className='sm:w-full sm:min-h-full sm:max-w-md sm:mx-auto sm:pt-24'>
        <div className='flex flex-col space-y-6'>
          <FaMoneyCheckAlt className='text-violet-500 dark:text-violet-400 mx-auto sm:h-24 sm:w-24 h-16 w-16 animate-wiggle' />
          <h1 className='text-4xl text-center'>
            Sign In To <span className='text-violet-500 dark:text-violet-400 font-bold'>BudgetWare</span>
          </h1>
          <Toaster />
          <AuthForm />
        </div>
      </div>
    );
  }
};

export default Layout;
