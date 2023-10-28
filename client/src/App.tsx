import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { TbMoon, TbMoonOff } from 'react-icons/tb';
import axios from 'axios';
import { useQuery } from 'react-query';

import { UserContext } from './context/userContext';
import { router } from './router';

const getUser = async () => {
  return await axios
    .get(`/api/v1/users/${document.cookie.slice(5)}`, { withCredentials: true })
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

function App() {
  const { data, isLoading } = useQuery('getUser', getUser);
  const [themeMode, setThemeMode] = useState<string>('dark');

  const theme =
    localStorage.theme === 'dark' ? (
      <TbMoon className='h-6 w-6 lg:h-8 lg:w-8 text-violet-400' />
    ) : (
      <TbMoonOff className='h-6 w-6 lg:h-8 lg:w-8 text-violet-500' />
    );

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
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

  return (
    <div className='min-h-screen bg-neutral-100 dark:bg-zinc-800 dark:text-neutral-200 transition-all duration-300 '>
      <UserContext.Provider value={{ data, isLoading }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
      <button
        onClick={() => toggleTheme()}
        className='fixed bottom-5 right-5 lg:bottom-3 lg:left-2.5 cursor-pointer'
      >
        {theme}
      </button>
    </div>
  );
}

export default App;
