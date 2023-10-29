import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';

import Button from '../Button';
import { useSignoutMutation } from '../../store';

const NavBar: React.FC<NavProps> = ({ isOpen, links }) => {
  const [signOut] = useSignoutMutation({});

  const renderedLinks = links.map((link) => {
    return (
      <NavLink
        key={link.label}
        to={link.path}
        onClick={link.fn}
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
          'absolute top-16 left-0  flex items-center min-h-min w-full rounded-b-lg shadow-md bg-neutral-100 dark:bg-zinc-800 transition-all ease-in-out'
      )}
    >
      <div className='ml-2 p-2 h-[80%]'>
        <ul className='flex flex-col space-y-2 text-violet-500 dark:text-violet-400'>
          {renderedLinks}
          <Button className='w-16'>
            <VscSignOut
              className='h-6 w-6 cursor-pointer'
              onClick={() => signOut({})}
            />
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
