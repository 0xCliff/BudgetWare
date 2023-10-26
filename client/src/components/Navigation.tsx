import NavBar from './NavBar';
import SideBar from './SideBar';

const Navigation = () => {
  return (
    <div className='lg:w-[25%] xl:w-[20%] w-full lg:min-h-screen h-16 rounded lg:shadow-md shadow lg:shadow-gray-300 shadow-gray-200'>
      <SideBar />
      {/* Small Screens  */}
      <NavBar />
    </div>
  );
};
export default Navigation;
