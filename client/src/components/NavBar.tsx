import axios from 'axios';
import clsx from 'clsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { VscAccount, VscMenu, VscSignOut } from 'react-icons/vsc';
import { useMutation } from 'react-query';
import { NavLink } from 'react-router-dom';

import Button from './Button';

const signOut = async () => {
  await axios
    .post('http://localhost:8080/api/v1/auth/signout')
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
    <div className='lg:hidden h-full flex justify-between items-center mx-4'>
      <VscMenu
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className='text-violet-500 h-6 w-6 cursor-pointer'
      />

      <div
        className={clsx(
          !isMenuOpen && 'hidden',
          isMenuOpen && 'absolute top-16 left-0 min-h-max w-6/12 rounded-br-lg shadow-md bg-white border-br'
        )}
      >
        <div className='ml-2 p-2'>
          <ul className='flex flex-col space-y-2 text-violet-500'>
            <NavLink
              to='/'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Home
            </NavLink>
            <NavLink to='/transactions'>Transactions</NavLink>
            <NavLink to='/reports'>Reports</NavLink>
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
        className='text-violet-500 rounded-full h-6 w-6 cursor-pointer'
      />

      <div
        className={clsx(
          !isAccountOpen && 'hidden',
          isAccountOpen && 'absolute top-16 right-0 min-h-max w-3/12 rounded-bl-lg shadow-md bg-white border-bl'
        )}
      >
        <div className='ml-2 p-2'>
          <ul className='flex flex-col space-y-2 text-violet-500'>
            <NavLink to='/user/'>Profile</NavLink>
            <NavLink to='/user/accounts'>Accounts</NavLink>
            <Button className='mr-2'>
              <VscSignOut
                className='h-6 w-6 cursor-pointer '
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
