import { VscSettingsGear, VscAccount, VscMenu } from 'react-icons/vsc';

const Navigation = () => {
  return (
    <div className='lg:w-[25%] xl:w-[20%] w-full lg:min-h-screen h-16 rounded lg:shadow-md shadow lg:shadow-gray-300 shadow-gray-200'>
      <div className='hidden lg:flex flex-col h-full justify-end pb-12'>
        <VscAccount
          onClick={() => {}}
          className='hidden lg:block text-violet-500 h-8 w-8 m-2 cursor-pointer'
        />
        <VscSettingsGear
          onClick={() => {}}
          className='hidden lg:block text-violet-500 h-8 w-8 m-2 cursor-pointer'
        />
      </div>

      {/* Small Screens  */}

      <div className='lg:hidden h-full flex justify-between items-center mx-4'>
        <VscMenu
          onClick={() => {}}
          className='text-violet-500 h-6 w-6 cursor-pointer'
        />
        <VscAccount
          onClick={() => {}}
          className='text-violet-500 rounded-full h-6 w-6 cursor-pointer'
        />
      </div>
    </div>
  );
};
export default Navigation;
