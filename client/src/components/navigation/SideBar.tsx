import { NavLink } from 'react-router-dom';
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';

import { useSignoutMutation } from '../../store';

const SideBar: React.FC<SideBarProps> = ({ links }) => {
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
    <div className='hidden lg:flex flex-col h-full justify-end pb-12'>
      {renderedLinks}
      <VscSignOut
        onClick={() => signOut({})}
        className='hidden lg:block text-violet-500 dark:text-violet-400 h-8 w-8 m-2 cursor-pointer'
      />
      <NavLink to='/settings'>
        <VscSettingsGear
          onClick={() => {}}
          className='hidden lg:block text-violet-500 dark:text-violet-400 h-8 w-8 m-2 cursor-pointer'
        />
      </NavLink>
    </div>
  );
};
export default SideBar;
