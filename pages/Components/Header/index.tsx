import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import { usePathname } from "next/navigation";
import DropdownUser from "./DropdownUser";
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../AppContext";
import Breadcrumb from "../BreadCrumbs";
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
    <header className="sticky top-0 z-[100] h-[3rem] flex bg-light-menu-color shadow-sm shadow-[#B3B6B7] dark:shadow-black ease-linear dark:bg-dark-menu-color  lg:translate-x-0">
      {/* <div></div> */}
      <div className="flex flex-grow items-center justify-between px-2 py-4 shadow-2 ">
        <div className="flex">
          {(pathname.includes("Explorer") ||
            pathname.includes("Diagnostics") ||
            pathname.includes("settings")) && (
            <>
              <div
                className=" flex cursor-pointer items-center"
                onClick={() => {
                  toggleSideBarState();
                  // toggleSideBarClickState();
                }}
              >
                <MenuIcon
                  style={{ fontWeight: 700 }}
                  className={` ${
                    sidebarOpen
                      ? "text-primary2 dark:text-primary3"
                      : "text-black dark:text-white"
                  }`}
                />
              </div>
              <div className="ml-44">
                <Breadcrumb />
              </div>
            </>
          )}
        </div>
        {/* <div className="flex items-left gap-2 sm:gap-4">{path}</div> */}

        <div className="flex mr-2 items-center gap-5 2xsm:gap-7">
          <ul className="flex mt-1 items-center gap-4 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
            <DropdownUser />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
