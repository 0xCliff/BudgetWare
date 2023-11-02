import { useState } from 'react';
import { VscMenu } from 'react-icons/vsc';

import SideBar from './SideBar';
import { NavLink } from 'react-router-dom';
import Drawer from '../Drawer';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const links = [
    {
      label: 'Dashboard',
      path: `/dashboard`,
      fn: () => setIsOpen((prev) => !prev),
    },
    {
      label: 'Profile',
      path: `/profile`,
      fn: () => setIsOpen((prev) => !prev),
    },
    {
      label: 'Transactions',
      path: `/transactions`,
      fn: () => setIsOpen((prev) => !prev),
    },

    {
      label: 'Accounts',
      path: '/accounts',
      fn: () => setIsOpen((prev) => !prev),
    },
    {
      label: 'Reports',
      path: '/reports',
      fn: () => setIsOpen((prev) => !prev),
    },
    {
      label: 'Settings',
      path: '/settings',
      fn: () => setIsOpen((prev) => !prev),
    },
  ];

  return (
    <div className='lg:w-[25%] xl:w-[20%] w-full lg:min-h-screen h-20 lg:shadow shadow shadow-gray-300 dark:shadow-gray-800'>
      <SideBar links={links} />

      <div className='lg:hidden h-full flex justify-between items-center mx-8'>
        <NavLink
          to='/'
          className='text-xl text-violet-500 dark:text-violet-400'
        >
          BudgetWare
        </NavLink>
        <VscMenu
          onClick={() => setIsOpen((prev) => !prev)}
          className='dark:dark light h-6 w-6 cursor-pointer'
        />
        <Drawer
          close={setIsOpen}
          isOpen={isOpen}
          links={links}
        />
      </div>
    </div>
  );
};
export default Navigation;
