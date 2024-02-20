import React, { useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { usePathname } from "next/navigation";
import Collapse from "@mui/material/Collapse";
import BookIcon from '@mui/icons-material/Book';
import { useAppContext } from "../AppContext";
import { Divider } from "@mui/material";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import PolicyIcon from "@mui/icons-material/Policy";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrafficIcon from "@mui/icons-material/Traffic";

interface DropdownItem {
  subMenuDropdownname: string;
  subMenuDropdownpathName: string;
}
interface SubMenuItem {
  subMenuName: string;
  subMenuPathName?: string;
  subMenuIcon?: any;
  subMenuDropdown?: DropdownItem[];
}

interface MenuItem {
  name: string;
  pathName: string;
  subMenu?: SubMenuItem[];
}

interface SelectedDropdown {
  [key: string]: number | null;
}

const SidebarMenu = () => {
  const { sidebarOpen } = useAppContext();
  const pathname = usePathname();
 // console.log("--", sidebarOpen);
  const path = pathname;
  // console.log("path", path);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(0);
  const [selectedDropdown, setSelectedDropdown] = useState<SelectedDropdown>(
    {}
  );

  const handleSubmenuClick = (index: any) => {
    setOpenSubmenu((prevOpen) => (prevOpen === index ? null : index));
    console.log(openSubmenu);
    setSelectedDropdown({});
  };
 
 const handleDropdownClick = (submenuIndex: number, dropdownIndex: number) => {
    const key = `submenu${submenuIndex}`;
    console.log(key);
    console.log(dropdownIndex);
    setSelectedDropdown({
      ...selectedDropdown,
      [key]: dropdownIndex,
    });
  };

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      pathName: "/Dashboard",
    },

    {
      name: "Assets",
      pathName: "/assets",
    },

    {
      name: "Alerts",
      pathName: "/Alerts",
    },

    {
      name: "Topology",
      pathName: "/topology",
    },
    {
      name: "Explorer",
      pathName: "/Explorer",
      subMenu: [
        {
          subMenuName: "Metric",
          subMenuPathName: "/page/changeSetting",
        },
        {
          subMenuName: "Flow",
          subMenuPathName: "/page/changeSetting",
        },
      ],
    },
    {
      name: "Reports",
      pathName: "/reports",
    },

    {
      name: "Diagnostics",
      pathName: "/Diagnostics",
      subMenu: [
        {
          subMenuName: "Ping",
          subMenuPathName: "/page/changeSetting",
        },
        {
          subMenuName: "SNMP",
          subMenuPathName: "/page/changeSetting",
        },
        {
          subMenuName: "SSH",
          subMenuPathName: "/page/changeSetting",
        },
        {
          subMenuName: "TCPDUMP",
          subMenuPathName: "/page/changeSetting",
        },
        {
          subMenuName: "API",
          subMenuPathName: "/page/changeSetting",
        },
        {
          subMenuName: "Traceroute",
          subMenuPathName: "/page/changeSetting",
        },
      ],
    },
    {
      name: "NCM",
      pathName: "/ncm",
    },
    {
      name: "Audit",
      pathName: "/audit",
    },

    {
      name: "Settings",
      pathName: "/Settings",
      subMenu: [
        {
          subMenuName: "User Settings",
          subMenuIcon: <ManageAccountsIcon />,
          // subMenuPathName: "/page/changeSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "User",
              subMenuDropdownpathName: "/page/user",
            },
            {
              subMenuDropdownname: "Role",
              subMenuDropdownpathName: "/page/role",
            },
            {
              subMenuDropdownname: "Group",
              subMenuDropdownpathName: "/page/role",
            },
            {
              subMenuDropdownname: "Password Settings",
              subMenuDropdownpathName: "/page/role",
            },
            {
              subMenuDropdownname: "LDPA",
              subMenuDropdownpathName: "/page/role",
            },
          ],
        },

        {
          subMenuName: "System Settings",
          subMenuIcon: <SettingsSystemDaydreamIcon />,
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "Global Settings",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "Mail Server",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "SMS Server",
              subMenuDropdownpathName: "/page/flow",
            },
          ],
        },

        {
          subMenuName: "Policy",
          subMenuIcon: <PolicyIcon />,
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "Alarm",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "Policy",
              subMenuDropdownpathName: "/page/flow",
            },
          ],
        },

        {
          subMenuName: "Device Settings",
          subMenuIcon: <AppSettingsAltIcon />,
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "Credential Profile",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "Site Management",
              subMenuDropdownpathName: "/page/flow",
            },
          ],
        },

        {
          subMenuName: "Catalog",
          subMenuIcon: <BookIcon/>,
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "SNMP",
              subMenuDropdownpathName: "/page/flow",
            },
          ],
        },
        {
          subMenuName: "Traffic",
          subMenuIcon: <TrafficIcon />,
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "Flow",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "Trap",
              subMenuDropdownpathName: "/page/flow",
            },
          ],
        },
        {
          subMenuName: "Schedular",
          subMenuIcon: <ScheduleIcon />,
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "Discovery Schedular",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "Report Schedular",
              subMenuDropdownpathName: "/page/flow",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {menuItems.map((menuItem, index) =>
        pathname.includes(menuItem.name) && menuItem.subMenu ? (
          <div
            key={index}
            className={`relative flex flex-col overflow-y-hidden bg-light-menu-color dark:bg-dark-container duration-300 ease-linear translate-x-0 ${
              sidebarOpen ? "w-0 " : "w-[13rem] border-r"
            }`}
          >
            {/* <div className="flex justify-between h-[3rem] px-3 items-center text-black dark:text-textColor pt-1.3 shadow-lg shadow-white dark:shadow-black">
              <p>{menuItem.name}</p>
            </div> */}

            <ul>
              {menuItems.map((menuItem, index) =>
                pathname.includes(menuItem.name) ? (
                  <li className="w-full" key={index}>
                    <div className="group relative flex items-center rounded-sm py-1 font-medium text-bodydark1 duration-300 ease-in-out  text-textColor  dark:hover:bg-meta-4 hover:text-primary2 dark:hover:text-primary2">
                      {menuItem.subMenu?.length && (
                        <ul className="w-full p-0 py-[2px]">
                          {menuItem.subMenu.map((submenuItem, subIndex) => (
                            <>
                              <li
                                key={subIndex}
                                className="relative w-full py-2 items-center text-black dark:text-textColor font-light"
                              >
                                <div
                                  className={`w-full mx-1 py-2 flex justify-between cursor-pointer transition duration-300 ease-in-out rounded-lg dark:hover:bg-[#282828] hover:bg-[#D8D8D8] p-2 ${
                                    openSubmenu == subIndex &&
                                    "dark:bg-[#282828] bg-[#D8D8D8]"
                                  }`}
                                  onClick={() => handleSubmenuClick(subIndex)}
                                >
                                  <div className="flex">
                                    {/* {submenuItem.subMenuDropdown && (
                                      <ManageAccountsIcon
                                        fontSize="small"
                                        className={` ${
                                          openSubmenu === subIndex
                                            ? "text-primary2"
                                            : ""
                                        }`}
                                      />
                                    )} */}
                                    {submenuItem.subMenuIcon &&
                                      React.cloneElement(
                                        submenuItem.subMenuIcon,
                                        {
                                          fontSize: "small",
                                          className: `${
                                            openSubmenu === subIndex
                                              ? "text-primary2"
                                              : ""
                                          }`,
                                        }
                                      )}
                                    <p
                                      className={`mx-2 text-[14px]  ${
                                        openSubmenu === subIndex
                                          ? "text-primary2"
                                          : ""
                                      }`}
                                    >
                                      {submenuItem.subMenuName}
                                    </p>
                                  </div>
                                  {submenuItem.subMenuDropdown && (
                                    <KeyboardArrowRightIcon
                                      fontSize="small"
                                      sx={{ fontSize: "15px" }}
                                      className={`mr-2 transform ${
                                        openSubmenu === subIndex
                                          ? "rotate-90 text-primary2"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </div>
                                <Collapse
                                  in={openSubmenu === subIndex}
                                  timeout="auto"
                                  unmountOnExit
                                  style={{
                                    margin: "0",
                                  }}
                                >
                                  {submenuItem.subMenuDropdown && (
                                    <ul className="ml-[1.3rem] pY-[5px] transition-opacity ">
                                      {submenuItem.subMenuDropdown.map(
                                        (dropdownItem, dropdownIndex) => (
                                          <li
                                            key={dropdownIndex}
                                            className={`relative mr-3 py-1 my-[2px] text-[14px] items-center text-black dark:text-textColor hover:bg-[#D8D8D8] dark:hover:bg-[#282828] cursor-pointer font-light rounded ${
                                              // selectedDropdown === dropdownIndex
                                              selectedDropdown[
                                                `submenu${subIndex}`
                                              ] === dropdownIndex
                                                ? "border-l-4 px-1 bg-[#D8D8D8] border-primary3 dark:bg-[#282828]" // Add your selected background color
                                                : ""
                                            }`}
                                            onClick={() => {
                                             
                                             handleDropdownClick(
                                                subIndex,
                                                dropdownIndex
                                              );
                                            }}
                                          >
                                            <p
                                              className={`pl-[1.3rem] ${
                                                   // selectedDropdown === dropdownIndex
                                                selectedDropdown[
                                                  `submenu${subIndex}`
                                                ] === dropdownIndex
                                                  ? "pl-[.75rem]"
                                                  : ""
                                              }`}
                                            >
                                              {dropdownItem.subMenuDropdownname}
                                            </p>
                                            {/* {dropdownIndex !==
                                              dropdownItem.subMenuDropdownname
                                                .length -
                                                1 && (
                                              <div className="absolute top-0 bottom-0 left-0 bg-[#B9B9B9] dark:bg-[#464646] w-[1px]" />
                                            )} */}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                </Collapse>
                              </li>
                              <Divider className="mx-2 bg-[#B9B9B9] dark:bg-[#464646]" />
                            </>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
            {/* <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-r from-[#B3B6B7] dark:from-black to-transparent before:content-[''] before:block before:absolute before:h-full before:w-3 before:left-0 before:top-0 before:z-0" /> */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-r from-[#B3B6B7] dark:from-black to-transparent before:content-[''] before:block before:absolute before:h-full before:w-3 before:left-0 before:top-0 before:z-0" />

          </div>
        ) : (
          ""
        )
      )}
    </>
  );
};

export default SidebarMenu;
