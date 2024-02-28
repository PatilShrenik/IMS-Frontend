import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import Person2Icon from "@mui/icons-material/Person2";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ConstructionIcon from "@mui/icons-material/Construction";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useAppContext } from "../AppContext";
import Zoom from "@mui/material/Zoom";

import { Box } from "@mui/system";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

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
        <DashboardOutlinedIcon
          className={` ${
            pathname.includes("dashboard") && "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Assets",
      path: "/assets",
      icon: (
        <EqualizerIcon
          className={` ${
            pathname.includes("Assets") && "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Alerts",
      path: "/Alerts",
      icon: (
        <NotificationsActiveIcon
          className={` ${
            pathname.includes("alerts") && "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Topology",
      path: "/topology",
      icon: (
        <CameraRoundedIcon
          className={` ${
            pathname.includes("Topology") && "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Explorer",
      path: "/Explorer",
      icon: (
        <DataSaverOffIcon
          className={` ${
            pathname.includes("explorer") && "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Reports",
      path: "/reports",
      icon: (
        <AssignmentIcon
          className={` ${
            pathname.includes("Reports") && "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Diagnostics",
      path: "/Diagnostics",
      icon: (
        <ConstructionIcon
          className={` ${
            pathname.includes("diagnostics") &&
            "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "NCM",
      path: "/ncm",
      icon: (
        <Person2Icon
          className={` ${
            pathname.includes("NCM") && "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Audit",
      path: "/audit",
      icon: (
        <DynamicFormIcon
          className={` ${
            pathname.includes("Audit") && "text-primary2 dark:text-primary2"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
    {
      name: "Settings",
      path: "/Settings",
      icon: (
        <SettingsIcon
          className={` ${
            pathname.includes("Settings") &&
            "text-[#0078D4] dark:text-[#0078D4]"
          } text-dark-menu-color dark:text-light-menu-color`}
          sx={{ color: "black", margin: "0 1.5rem" }}
        />
      ),
    },
  ];
  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#3C3C3C",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#3C3C3C",
      fontSize: "14px",
    },
  }));
  return (
    <aside
      ref={sidebar}
      className={`left-0 top-0 w-[4rem] flex h-screen flex-col overflow-y-hidden bg-light-menu-color shadow-sm shadow-[#B3B6B7] dark:shadow-black ease-linear dark:bg-dark-menu-color duration-300  dark:bg-boxdark  lg:translate-x-0 ${
        sidebarOpen && ""
      } `}
      // className="left-0 z-[100] top-0 w-[3.3rem] flex h-screen flex-col overflow-y-hidden bg-light-menu-color   ease-linear dark:bg-dark-menu-color duration-300  dark:bg-boxdark  lg:translate-x-0 "
    >
      <div className="flex h-[3rem] items-center justify-between px-4 pt-1.">
        <Link href="" className="flex cursor-default">
          <Image width={32} height={32} src={"/logo-icon.svg"} alt="Logo" />
          <div className="flex">
            {/* <p
              className="mx-4 my-6 font-semibold text-2xl text-white"
              style={{
                // background: "#0BBCB2",
                background:
                  "linear-gradient(to right, #0BBCB2 0%, #BCFB40 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              IMS
            </p> */}

            {/* <div className=" my-6 justify-end">
                <MenuIcon />
              </div> */}
          </div>
        </Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear ">
        <nav className="pb-4">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {links.map((link, index) => (
                // <BootstrapTooltip
                //   TransitionComponent={Zoom}
                //   title={link.name}
                //   arrow
                //   placement="right"
                //   slotProps={{
                //     popper: {
                //       sx: {
                //         [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                //           {
                //             marginTop: "0px",
                //           },
                //         [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                //           {
                //             marginBottom: "0px",
                //           },
                //         [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                //           {
                //             marginLeft: "4px",
                //           },
                //         [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                //           {
                //             marginRight: "0px",
                //           },
                //       },
                //     },
                //   }}
                // >
                <li key={index}>
                  {/* <Link
                      href={link.path}
                      className={`group relative flex items-center rounded-sm py-2 mt-1 font-medium text-bodydark1 duration-300 ease-in-out text-textColor hover:text-black dark:hover:bg-meta-4 hover:bg-[#D8D8D8]  hover:dark:bg-[#282828] ${
                        pathname.includes(link.path) &&
                        "border-l-4 px-2 bg-[#D8D8D8] border-[#0078D4] dark:bg-[#282828]"
                      }`}
                    >
                      <div className="w-full px-2">
                        <div className="flex justify-around">{link.icon}</div>
                      </div>
                    </Link> */}
                  <Link
                    href={link.path}
                    className={`flex items-center rounded-sm py-1 mr-1 mt-1 font-medium text-bodydark1 duration-300 text-textColor hover:text-black dark:hover:bg-meta-4 hover:bg-[#D8D8D8]  hover:dark:bg-[#282828] ${
                      pathname.includes(link.path)
                        ? "border-l-4 bg-[#D8D8D8] border-[#0078D4] dark:bg-[#282828]"
                        : "pl-1"
                    }`}
                  >
                    <div className="w-full px-2">
                      <div className="flex justify-around">{link.icon}</div>
                      <p
                        className={`${
                          pathname.includes(link.name)
                            ? "text-black dark:text-textColor text-[9px] flex mx-2 justify-evenly"
                            : "dark:text-textColor text-black text-[9px] flex mx-2 justify-evenly"
                        } " text-black"`}
                      >
                        {link.name}
                      </p>
                    </div>
                  </Link>
                </li>
                // {/* </BootstrapTooltip> */}
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
