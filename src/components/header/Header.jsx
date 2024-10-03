import DarkModeSwitcher from "../DarkModeSwitcher";
import { Link } from "react-router-dom";
import DropdownUser from "../sidebar/DropdownUser";
import { FaBars } from "react-icons/fa6";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-2 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden text-xl"
          >
            <FaBars />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <p className=" text-gray-200">
              <span className=" text-sea1">Sy</span>sal
            </p>
          </Link>
        </div>
        <div className="flex items-center gap-2 2xsm:gap-7  lg:block">
          <img className=" w-24 " src="/src/assets/images/sea.png" alt="" />
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownUser />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
