import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { VscChromeClose, VscSignOut } from 'react-icons/vsc';

import Button from './Button';
import { useSignoutMutation } from '../store';

const Drawer: React.FC<NavProps> = ({ isOpen, links, close }) => {
  const [signOut] = useSignoutMutation({});

  const renderedLinks = links.map((link) => {
    return (
      <NavLink
        key={link.label}
        to={link.path}
        onClick={link.fn}
        className='m-2'
      >
        {link.label}
      </NavLink>
    );
  });

  return (
    <div
      className={clsx(
        !isOpen && 'hidden',
        isOpen &&
          'fixed top-0 right-0 w-1/3 h-full shadow-md dark:shadow-gray-800 light dark:dark'
      )}
    >
      <div className=''>
        <div className='h-20 w-full flex items-center justify-between px-4 border-b dark:border-gray-800'>
          <h3 className='text-xl'>Menu</h3>
          <button
            onClick={() => close(false)}
            className='cursor-pointer'
          >
            <VscChromeClose />
          </button>
        </div>
        <nav className='w-full h-full flex flex-col'>
          {renderedLinks}

          <Button className=''>
            <VscSignOut
              className='h-6 w-6 cursor-pointer'
              onClick={() => signOut({})}
            />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Drawer;
