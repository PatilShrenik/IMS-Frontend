import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import { usePathname } from "next/navigation";
import DropdownUser from "./DropdownUser";
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
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
  const pathname = usePathname();
  const path = pathname.substring(1);
  const transformedString = path
    .replace(/\//g, " > ")
    .replace(/-/g, " ")
    .split("/")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" > ");
  // console.log("header path", path.substring(1));
  return (
    <header
      className="sticky top-0 z-[100] h-[3rem] flex bg-light-menu-color  ease-linear dark:bg-dark-menu-color  lg:translate-x-0 " 
    >
      <div className="flex flex-grow items-center justify-between px-2 py-4 shadow-2 ">
        {pathname.includes("Explorer") ||
        pathname.includes("Diagnostics") ||
        pathname.includes("Settings") ? (
          <div
            className=" flex cursor-pointer"
            
          >
            {sidebarOpen ? (
              <NavigateBeforeIcon
                onClick={() => {
                  toggleSideBarState();
                }}
                className="text-black dark:text-white"
              />
            ) : (
              <NavigateNextIcon
                onClick={() => {
                  toggleSideBarState();
                }}
                className="text-black dark:text-white"
              />
            )}
            <div className="mx-4 ">
              <p className="dark:text-textColor align-middle">
                <HomeIcon
                  fontSize="small"
                  className="align-sub dark:text-textColor hover:text-primary2 dark:hover:text-primary2"
                />{" "}
                {"> "}
                {transformedString}{" "}
                {/* {pathname.includes("Explorer") && " > Metric"} */}
              </p>
            </div>
          </div>
        ) : (
          <div
            className=" flex cursor-pointer"
            onClick={() => {
              toggleSideBarState();
              // toggleSideBarClickState();
            }}
          >
            {/* <MenuIcon className="text-black dark:text-white" /> */}
            <div className="mx-4 ">
              <p className="dark:text-textColor align-middle">
                {!pathname.includes("Dashboard") && (
                  <>
                    <HomeIcon
                      fontSize="small"
                      className="align-sub dark:text-textColor hover:text-primary2 dark:hover:text-primary2"
                    />
                    {" / "}
                  </>
                )}
                {path}
              </p>
            </div>
          </div>
        )}
        {/* <div className="flex items-left gap-2 sm:gap-4">{path}</div> */}

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
