import { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { NavLink } from 'react-router-dom';
import { VscAccount, VscMenu, VscSignOut } from 'react-icons/vsc';

import Button from './Button';

const signOut = async () => {
  await axios
    .get('/api/v1/auth/signout', { withCredentials: true })
    .then(() => toast.success('Signed out'))
    .catch(() => toast.error('Something went wrong.'));
};

const NavBar = () => {
  const mutatuion = useMutation(signOut, {
    onSuccess: () => {
      document.location.reload();
    },
    onError: () => {
      toast.error('Something went wrong.');
    },
  });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  return (
    <div className='lg:hidden h-full flex justify-between items-center mx-8'>
      <VscMenu
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className='text-violet-500 dark:text-violet-400 h-6 w-6 cursor-pointer'
      />

      <div
        className={clsx(
          !isMenuOpen && 'hidden',
          isMenuOpen &&
            'absolute top-16 left-0  flex items-center h-52 w-full rounded-b-lg shadow-md bg-neutral-100 dark:bg-zinc-800 transition-all ease-in-out'
        )}
      >
        <div className='ml-2 p-2 h-[80%] border-r dark:border-violet-300 w-1/3'>
          <ul className='flex flex-col space-y-2 text-violet-500 dark:text-violet-400'>
            <NavLink
              to='/'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Home
            </NavLink>
          </ul>
        </div>
        <div className='ml-2 p-2 h-[80%] border-r dark:border-violet-300  w-1/3'>
          <ul className='flex flex-col space-y-2 text-violet-500 dark:text-violet-400'>
            <NavLink
              to='/transactions'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Transactions
            </NavLink>
            <NavLink
              to='/reports'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Reports
            </NavLink>
          </ul>
        </div>
        <div className='ml-2 p-2 h-[80%] w-1/3'>
          <ul className='flex flex-col space-y-2 text-violet-500 dark:text-violet-400'>
            <NavLink
              to='/settings'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Settings
            </NavLink>
          </ul>
        </div>
      </div>

      <VscAccount
        onClick={() => setIsAccountOpen((prev) => !prev)}
        className='text-violet-500 dark:text-violet-400 rounded-full h-6 w-6 cursor-pointer'
      />

      <div
        className={clsx(
          !isAccountOpen && 'hidden',
          isAccountOpen &&
            'absolute top-16 right-0 min-h-max w-2/12 rounded-bl-lg shadow-md bg-neutral-100 dark:bg-zinc-800 border-bl transition-all ease-in-out'
        )}
      >
        <div className='ml-2 p-2'>
          <ul className='flex flex-col space-y-2 text-violet-500 dark:text-violet-400'>
            <NavLink
              to='/user/'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Profile
            </NavLink>
            <NavLink
              to='/user/accounts'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Accounts
            </NavLink>
            <Button className='mr-2'>
              <VscSignOut
                className='h-6 w-6 cursor-pointer'
                onClick={() => mutatuion.mutate()}
              />
            </Button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
