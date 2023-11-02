import { SlWallet } from 'react-icons/sl';
import { useState } from 'react';
import { TbMoon, TbMoonOff } from 'react-icons/tb';

import AuthForm from '../components/auth/AuthForm';
import Navigation from '../components/navigation/Navigation';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC<any> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<string>('dark');

  const theme =
    localStorage.theme === 'dark' ? (
      <div className='hover:bg-neutral-700 h-12 w-12 flex items-center justify-center rounded-full transition-colors ease-in-out duration-300'>
        <TbMoon className='h-6 w-6 lg:h-8 lg:w-8 text-violet-400' />
      </div>
    ) : (
      <div className='hover:bg-neutral-200 h-12 w-12 flex items-center justify-center rounded-full transition-colors ease-in-out duration-300'>
        <TbMoonOff className='h-6 w-6 lg:h-8 lg:w-8 text-violet-500' />
      </div>
    );

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const toggleTheme = () => {
    if (themeMode === 'dark') {
      setThemeMode('light');
      localStorage.theme = 'light';
    } else {
      setThemeMode('dark');
      localStorage.theme = 'dark';
    }
  };

  let content;
  if (document.cookie.includes('AUTH')) {
    content = (
      <div className='flex flex-col lg:flex-row'>
        <Toaster />
        <Navigation />
        <div className='p-4 w-full h-full'>{children}</div>
        <button
          onClick={() => toggleTheme()}
          className='fixed bottom-2 right-2 lg:bottom-3 lg:left-2.5 cursor-pointer'
        >
          {theme}
        </button>
      </div>
    );
  } else {
    content = (
      <div className='w-2/3 mx-auto pt-32 sm:w-full sm:min-h-full sm:max-w-md sm:mx-auto'>
        <div className='flex flex-col space-y-6'>
          <SlWallet className='text-violet-500 dark:text-violet-400 mx-auto sm:h-24 sm:w-24 h-16 w-16 animate-wiggle' />
          <h1 className='text-4xl text-center'>
            Sign In To{' '}
            <span className='text-violet-500 dark:text-violet-400 font-bold'>
              BudgetWare
            </span>
          </h1>
          <Toaster />
          <AuthForm />
          <button
            onClick={() => toggleTheme()}
            className='fixed bottom-2 right-2 lg:bottom-3 lg:left-2.5 cursor-pointer'
          >
            {theme}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen light dark:dark transition-all duration-300 '>
      {content}
    </div>
  );
};

export default Layout;
