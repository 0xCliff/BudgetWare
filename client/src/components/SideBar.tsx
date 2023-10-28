import { NavLink } from 'react-router-dom';
import { VscAccount, VscSettingsGear } from 'react-icons/vsc';

const SideBar = () => {
  return (
    <div className='hidden lg:flex flex-col h-full justify-end pb-12'>
      <VscAccount
        onClick={() => {}}
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
