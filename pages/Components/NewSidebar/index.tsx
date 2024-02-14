import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import Person2Icon from "@mui/icons-material/Person2";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useAppContext } from "../AppContext";

import { Box } from "@mui/system";

const Sidebar = () => {
  const pathname = usePathname();
  const sidebarOpen = useAppContext();
  const [open, setOpen] = useState<boolean>(false);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const links = [
    {
      name: "Dashboard",
      path: "/page/FinOps/reports",
      icon: (
        <DashboardIcon
          className={` ${
            pathname.includes("page/FinOps/reports") &&
            "dark:bg-meta-4 text-blue-700"
          }`}
          sx={{ color: "white" }}
        />
      ),
    },
    {
      name: "Assets",
      path: "/page/FinOps/Settings",
      icon: <EqualizerIcon sx={{ color: "white" }} />,
    },
    {
      name: "Alert",
      path: "/page/Alert",
      icon: <NotificationsActiveIcon sx={{ color: "white" }} />,
    },
    {
      name: "Topology",
      path: "/page/Topology",
      icon: <CameraRoundedIcon sx={{ color: "white" }} />,
    },
    {
      name: "Explorer",
      path: "/page/Explorer",
      icon: <DataSaverOffIcon sx={{ color: "white" }} />,
    },
    {
      name: "Report",
      path: "/page/Report",
      icon: <AssignmentIcon sx={{ color: "white" }} />,
    },
    {
      name: "Diagnostics",
      path: "/page/Diagnostics",
      icon: <EqualizerIcon sx={{ color: "white" }} />,
    },
    {
      name: "NCM",
      path: "/page/NCM",
      icon: <Person2Icon sx={{ color: "white" }} />,
    },
    {
      name: "Audit",
      path: "/page/Audit",
      icon: <DynamicFormIcon sx={{ color: "white" }} />,
    },
    {
      name: "Settings",
      path: "/page/Settings",
      icon: < SettingsIcon sx={{ color: "white" }} />,
    },

  ];



 
  return (
    <aside
      ref={sidebar}
      className="left-0 top-0 w-[6.50rem] z-9999 flex h-screen flex-col overflow-y-hidden bg-[#171A22] duration-300 ease-linear dark:bg-boxdark  lg:translate-x-0 "
    >
      <div className="flex h-[2.5rem] items-center justify-between gap-2 px-4 pt-1.3 border-b-2">
        <Link href="" className="flex cursor-default">
          <Image
            width={32}
            height={32}
            src={"/logo-icon.svg"}
            alt="Logo"
            className={`${!sidebarOpen && "my-6"}`}
          />
        </Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="pb-4 lg:mt-3 lg:px-4">
          <div>
            <ul className="mb-6 flex flex-col ju gap-1.5">
              {links.map((link, index) => (
                 <li key={index}>
                  <Link
                   href={link.path}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium text-bodydark1 duration-300 ease-in-out  text-[#DEE4EE] hover:text-[#DEE4EE] dark:hover:bg-meta-4 ${
                      pathname.includes(link.path) &&
                      " dark:bg-meta-4 "
                    }`}
                  >
                    <Box>
                    {link.icon}
                      <span className="mr-3 text-xs font-light ml-[-12px]">
                        {link.name}
                      </span>
                    </Box>
                  </Link>
                </li>
                // <li>
                //   <Link
                //     href="/page/FinOps/reports"
                //     className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium text-bodydark1 duration-300 ease-in-out  text-[#DEE4EE] hover:text-[#DEE4EE] dark:hover:bg-meta-4 ${
                //       pathname.includes("page/FinOps/reports") &&
                //       " dark:bg-meta-4 "
                //     }`}
                //   >
                //    <Box>
                //     <DashboardIcon
                //       sx={{ color: "white" }}
                      // className={` ${
                      //   pathname.includes("page/FinOps/reports") &&
                      //   "dark:bg-meta-4 text-blue-700"
                      // }`}
                //     />
                //  <span className="mr-3 text-xs font-light ml-[-12px]">Dashboard</span>
                //       </Box>
                //   </Link>
                // </li>
                // <li>
                //   <Link
                //     href="/page/FinOps/Settings"
                //     className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium text-bodydark1 duration-300 ease-in-out  dark:hover:bg-meta-4 text-[#DEE4EE] hover:text-[#DEE4EE] ${
                //       pathname.includes("/page/FinOps/Settings") &&
                //       " dark:bg-meta-4"
                //     }`}
                //   >
                //     <Box>
                //     <EqualizerIcon
                //       sx={{ color: "white" }}
                //       className={`${
                //         pathname.includes("/page/FinOps/Settings") &&
                //         "dark:bg-meta-4 text-blue-700"
                //       }`}
                //     />
                //      <span className="mr-3 text-xs font-light ml-[-5px]">Assets</span>
                //     </Box>

                //   </Link>
                // </li>
                // <li>
                //   <Link
                //     href="/page/Topology"
                //     className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium text-bodydark1 duration-300 ease-in-out  dark:hover:bg-meta-4 text-[#DEE4EE] hover:text-[#DEE4EE] ${
                //       pathname.includes("/page/Topology") &&
                //       " dark:bg-meta-4"
                //     }`}
                //   >
                //     <Box>
                //     <EqualizerIcon
                //       sx={{ color: "white" }}
                //       className={`${
                //         pathname.includes("/page/Topology") &&
                //         "dark:bg-meta-4 text-blue-700"
                //       }`}
                //     />
                //      <span className="mr-3 text-xs font-light ml-[-5px]">Topology</span>
                //     </Box>

                //   </Link>
                // </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
