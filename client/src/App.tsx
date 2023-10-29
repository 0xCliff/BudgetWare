import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { TbMoon, TbMoonOff } from 'react-icons/tb';

import { router } from './router';

function App() {
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
      <RouterProvider router={router} />

      <button
        onClick={() => toggleTheme()}
        className='fixed bottom-2 right-2 lg:bottom-3 lg:left-2.5 cursor-pointer'
      >
        {theme}
      </button>
    </div>
  );
}

export default App;
