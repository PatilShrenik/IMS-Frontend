import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { usePathname } from "next/navigation";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../AppContext";
import { Divider } from "@mui/material";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import ExpandLess from "@mui/icons-material/ExpandLess";
interface DropdownItem {
  subMenuDropdownname: string;
  subMenuDropdownpathName: string;
}
interface SubMenuItem {
  subMenuName: string;
  subMenuPathName?: string;
  subMenuDropdown?: DropdownItem[];
}

interface MenuItem {
  name: string;
  pathName: string;
  subMenu?: SubMenuItem[];
}

const SidebarMenu = () => {
  const { sidebarOpen } = useAppContext();
  const pathname = usePathname();
  console.log("--", sidebarOpen);
  const path = pathname;
  // console.log("path", path);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(0);

  const handleSubmenuClick = (index: any) => {
    setOpenSubmenu((prevOpen) => (prevOpen === index ? null : index));
  };
  const [selectedDropdown, setSelectedDropdown] = useState(null) as any;

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      pathName: "/Dashboard",
    },

    {
      name: "Assets",
      pathName: "/Assets",
    },

    {
      name: "Alerts",
      pathName: "/Alerts",
    },

    {
      name: "Topology",
      pathName: "/Topology",
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
      pathName: "/Reports",
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
      pathName: "/NCM",
    },
    {
      name: "Audit",
      pathName: "/Audit",
    },

    {
      name: "Settings",
      pathName: "/Settings",
      subMenu: [
        {
          subMenuName: "User Settings",
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
            className={`relative flex flex-col overflow-y-hidden bg-light-menu-color dark:bg-dark-container  border-[#3C3C3C] duration-300 ease-linear translate-x-0 ${
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
                                className="relative w-full py-2 items-center text-black dark:text-textColor hover:text-primary2 dark:hover:text-primary2 font-light"
                              >
                                <div
                                  className="w-full mx-1 py-2 flex justify-between cursor-pointer transition duration-300 ease-in-out rounded-lg dark:hover:bg-[#282828] hover:bg-[#D8D8D8] p-2"
                                  onClick={() => handleSubmenuClick(subIndex)}
                                >
                                  <div className="flex">
                                    {submenuItem.subMenuDropdown && (
                                      <ManageAccountsIcon
                                        fontSize="small"
                                        className={` ${
                                          openSubmenu === subIndex
                                            ? "text-primary2"
                                            : ""
                                        }`}
                                      />
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
                                  <KeyboardArrowRightIcon
                                    fontSize="small"
                                    sx={{ fontSize: "15px" }}
                                    className={`mr-2 transform ${
                                      openSubmenu === subIndex
                                        ? "rotate-90 text-primary2"
                                        : ""
                                    }`}
                                  />
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
                                              selectedDropdown === dropdownIndex
                                                ? "border-l-4 px-1 bg-[#D8D8D8] border-primary3 dark:bg-[#282828]" // Add your selected background color
                                                : ""
                                            }`}
                                            onClick={() => {
                                              // handleDropdownClick(
                                              //   subIndex,
                                              //   dropdownIndex
                                              // );
                                              setSelectedDropdown(
                                                dropdownIndex
                                              );
                                            }}
                                          >
                                            <p
                                              className={`pl-[1.3rem] ${
                                                selectedDropdown ===
                                                dropdownIndex
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
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-r from-[#B3B6B7] dark:from-black  to-transparent before:content-[''] before:block before:absolute before:h-full before:w-3 before:left-0 before:top-0 before:z-0" />
          </div>
        ) : (
          ""
        )
      )}
    </>
  );
};

export default SidebarMenu;