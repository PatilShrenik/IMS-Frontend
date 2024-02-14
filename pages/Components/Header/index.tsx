import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../AppContext";
// import { useAppContext } from "@/context/AppContext";

const Header = (props: {
  // sidebarOpen: string | boolean | undefined;
  // setSidebarOpen: (arg0: boolean) => void;
}) => {
  const {
    sidebarOpen,
    toggleSideBarState,
    toggleSideBarClickState,
    themeSwitch,
  } = useAppContext();
  return (
    <header
      className="sticky top-0 z-[100] h-[2.5rem] flex bg-white ease-linear drop-shadow-1 dark:bg-[#171A22] dark:drop-shadow-none lg:translate-x-0" // {`
    
    >
      
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 ">
       
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          

          
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              {/* <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-[#3C50E0] dark:fill-[#AEB7C0] dark:hover:fill-[#3C50E0]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button> */}

              {/* <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              /> */}
            </div>
          </form>
        </div>

        <div className="flex mr-2 items-center gap-5 2xsm:gap-7">
          <ul className="flex mt-1 items-center gap-4 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />

            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
