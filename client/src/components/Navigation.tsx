import NavBar from './NavBar';
import SideBar from './SideBar';

const Navigation = () => {
  return (
    <div className='lg:w-[25%] xl:w-[20%] w-full lg:min-h-screen h-16 lg:shadow-md shadow lg:shadow-gray-300 lg:dark:shadow-zinc-900 shadow-gray-300 dark:shadow-zinc-900'>
      <SideBar />
      {/* Small Screens  */}
      <NavBar />
    </div>
  );
};
export default Navigation;
