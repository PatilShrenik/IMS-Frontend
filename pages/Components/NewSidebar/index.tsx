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
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
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
      path: "/Dashboard",
      icon: (
        <DashboardIcon
          className={` ${
            pathname.includes("/Dashboard") && "dark:bg-meta-4 text-blue-700"
          }`}
          sx={{ color: "white", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Assets",
      path: "/Assets",
      icon: <EqualizerIcon sx={{ color: "white", margin: "0 1.5rem" }} />,
    },
    {
      name: "Alerts",
      path: "/Alerts",
      icon: (
        <NotificationsActiveIcon sx={{ color: "white", margin: "0 1.5rem" }} />
      ),
    },
    {
      name: "Topology",
      path: "/Topology",
      icon: <CameraRoundedIcon sx={{ color: "white", margin: "0 1.5rem" }} />,
    },
    {
      name: "Explorer",
      path: "/Explorer",
      icon: <DataSaverOffIcon sx={{ color: "white", margin: "0 1.5rem" }} />,
    },
    {
      name: "Reports",
      path: "/Reports",
      icon: <AssignmentIcon sx={{ color: "white", margin: "0 1.5rem" }} />,
    },
    {
      name: "Diagnostics",
      path: "/Diagnostics",
      icon: <EqualizerIcon sx={{ color: "white", margin: "0 1.5rem" }} />,
    },
    {
      name: "NCM",
      path: "/NCM",
      icon: <Person2Icon sx={{ color: "white", margin: "0 1.5rem" }} />,
    },
    {
      name: "Audit",
      path: "/Audit",
      icon: <DynamicFormIcon sx={{ color: "white", margin: "0 1.5rem" }} />,
    },
    {
      name: "Settings",
      path: "/Settings",
      icon: <SettingsIcon sx={{ color: "white", margin: "0 1.5rem" }} />,
    },
  ];

  return (
    <aside
      ref={sidebar}
      className="left-0 top-0 w-[5.5rem] flex h-screen flex-col overflow-y-hidden bg-[#171A22] duration-300 ease-linear dark:bg-boxdark  lg:translate-x-0 shadow-2xl"
    >
      <div className="flex h-[2.5rem] items-center justify-between px-4 py-1 pt-1.3 border-b-2">
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
        <nav className="pb-4">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={`group relative flex items-center rounded-sm py-1 mt-1 font-medium text-bodydark1 duration-300 ease-in-out text-[#DEE4EE] hover:text-[#DEE4EE] dark:hover:bg-meta-4 ${
                      pathname.includes(link.path) && "dark:bg-meta-4"
                    }`}
                  >
                    <div className="w-full">
                      <div className="flex justify-around">{link.icon}</div>
                      <p className="text-xs flex justify-evenly">{link.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* <nav className="pb-4">
          <div>
            <ul className="mb-6 flex flex-col ju gap-1.5">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium text-bodydark1 duration-300 ease-in-out  text-[#DEE4EE] hover:text-[#DEE4EE] dark:hover:bg-meta-4 ${
                      pathname.includes(link.path) && " dark:bg-meta-4 "
                    }`}
                  >
                    <Box>
                      <div className="flex flex-col">
                        {link.icon}
                        <span className="mr-3 text-xs font-light ml-[-12px]">
                          {link.name}
                        </span>
                      </div>
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
        </nav> */}
      </div>
    </aside>
  );
};

export default Sidebar;
