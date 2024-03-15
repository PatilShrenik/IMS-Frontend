import React, { useState } from "react";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { usePathname } from "next/navigation";
import Collapse from "@mui/material/Collapse";
import BookIcon from "@mui/icons-material/Book";
import { useAppContext } from "../AppContext";
import { Divider } from "@mui/material";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import ArticleIcon from '@mui/icons-material/Article';
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
  console.log("path", path);
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
      pathName: "/dashboard",
    },

    {
      name: "Assets",
      pathName: "/assets",
    },

    {
      name: "Alerts",
      pathName: "/alerts",
    },

    {
      name: "Topology",
      pathName: "/topology",
    },
    {
      name: "Explorer",
      pathName: "/explorer",
      subMenu: [
        {
          subMenuName: "Metric",
          subMenuPathName: "/Explorer/metric",
        },
        {
          subMenuName: "Flow",
          subMenuPathName: "/Explorer/flow",
        },
      ],
    },
    {
      name: "Reports",
      pathName: "/reports",
    },

    {
      name: "Diagnostics",
      pathName: "/diagnostics",
      subMenu: [
        {
          subMenuName: "Ping",
          subMenuPathName: "/Diagnostics/ping",
        },
        {
          subMenuName: "SNMP",
          subMenuPathName: "/Diagnostics/snmp",
        },
        {
          subMenuName: "SSH",
          subMenuPathName: "/Diagnostics/ssh",
        },
        {
          subMenuName: "TCPDUMP",
          subMenuPathName: "/Diagnostics/tcpdump",
        },
        {
          subMenuName: "API",
          subMenuPathName: "/Diagnostics/api",
        },
        {
          subMenuName: "Traceroute",
          subMenuPathName: "/Diagnostics/traceroute",
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
      pathName: "/settings",
      subMenu: [
        {
          subMenuName: "User Settings",
          subMenuIcon: <ManageAccountsIcon />,
          // subMenuPathName: "/page/changeSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "User",
              subMenuDropdownpathName: "/Settings/user-settings/user",
            },
            {
              subMenuDropdownname: "Role",
              subMenuDropdownpathName: "/Settings/user-settings/role",
            },
            {
              subMenuDropdownname: "Group",
              subMenuDropdownpathName: "/Settings/user-settings/group",
            },
            {
              subMenuDropdownname: "Password Settings",
              subMenuDropdownpathName: "/Settings/user-settings/password",
            },
            {
              subMenuDropdownname: "LDAP",
              subMenuDropdownpathName: "/Settings/user-settings/ldap",
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
              subMenuDropdownpathName:
                "/Settings/system-settings/global-settings",
            },
            {
              subMenuDropdownname: "Mail Server",
              subMenuDropdownpathName: "/Settings/system-settings/mail-server",
            },
            {
              subMenuDropdownname: "SMS Server",
              subMenuDropdownpathName: "/Settings/system-settings/sms-server",
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
              subMenuDropdownpathName: "/Settings/policy/alarm",
            },
            {
              subMenuDropdownname: "Policy",
              subMenuDropdownpathName: "/Settings/policy/policy",
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
              subMenuDropdownpathName:
                "/Settings/device-settings/credential-profile",
            },
            {
              subMenuDropdownname: "Site Management",
              subMenuDropdownpathName:
                "/Settings/device-settings/site-management",
            },
            {
              subMenuDropdownname: "Profiles",
              subMenuDropdownpathName: "/Settings/device-settings/profiles",
            },
          ],
        },
        {
          subMenuName: "Catalogue",
          subMenuIcon: <BookIcon />,
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "SNMP",
              subMenuDropdownpathName: "/Settings/catalogue/snmp",
            },
          ],
        },
        {
          subMenuName: "Template",
          subMenuIcon: <ArticleIcon />,
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "SNMP",
              subMenuDropdownpathName: "/Settings/template/snmp",
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
              subMenuDropdownpathName: "/Settings/traffic/flow",
            },
            {
              subMenuDropdownname: "Trap",
              subMenuDropdownpathName: "/Settings/traffic/trap",
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
              subMenuDropdownpathName:
                "/Settings/schedular/discovery-schedular",
            },
            {
              subMenuDropdownname: "Report Schedular",
              subMenuDropdownpathName: "/Settings/schedular/report-schedular",
            },
          ],
        },
      ],
    },
  ];

  // console.log("idejbd", sidebarOpen);
  return (
    <>
      {menuItems.map((menuItem, index) =>
        pathname.includes(menuItem.name) && menuItem.subMenu ? (
          <div
            key={index}
            className={`relative mt-12 flex flex-col overflow-y-hidden bg-white border-textColor dark:border-dark-border dark:bg-dark-container duration-300 ease-linear translate-x-0 ${
              sidebarOpen ? "w-0 " : ""
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
                                <Link
                                  href={submenuItem.subMenuPathName || "#"}
                                  className={`w-full mx-1 py-2 text-decoration-none flex justify-between cursor-pointer transition duration-300 ease-in-out rounded-lg dark:hover:bg-[#282828] hover:bg-[#F0F0F0] hover:text-textColor p-2 subMenuLink ${
                                    openSubmenu == subIndex
                                    // "dark:bg-[#282828] bg-[#D8D8D8]"
                                  }`}
                                  onClick={() => handleSubmenuClick(subIndex)}
                                >
                                  <div className="flex ">
                                    {submenuItem.subMenuIcon &&
                                      React.cloneElement(
                                        submenuItem.subMenuIcon,
                                        {
                                          fontSize: "small",
                                          className: `${
                                            openSubmenu === subIndex ? "" : ""
                                          }`,
                                        }
                                      )}
                                    <p
                                      className={`mx-2 text-[14px]  ${
                                        openSubmenu === subIndex ? "" : ""
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
                                          ? "rotate-90 "
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Link>

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
                                          <Link
                                            href={
                                              dropdownItem.subMenuDropdownpathName
                                            }
                                          >
                                            <li
                                              key={dropdownIndex}
                                              className={`relative mr-3 py-1 my-[2px] text-[14px] items-center !text-black dark:!text-textColor hover:bg-[#D8D8D8] dark:hover:bg-[#282828] cursor-pointer font-light rounded ${
                                                // selectedDropdown === dropdownIndex
                                                selectedDropdown[
                                                  `submenu${subIndex}`
                                                ] === dropdownIndex
                                                  ? "border-l-4 px-1 bg-[#D8D8D8] border-primary3 dark:bg-[#282828]" // Add your selected background color
                                                  : ""
                                              }
                                              ${
                                                path.includes(
                                                  dropdownItem.subMenuDropdownpathName
                                                ) &&
                                                "border-l-4 px-1 bg-[#D8D8D8] border-primary3 dark:bg-[#282828]"
                                              }
                                              `}
                                              onClick={() => {
                                                handleDropdownClick(
                                                  subIndex,
                                                  dropdownIndex
                                                );
                                              }}
                                            >
                                              <div
                                                className={` ${
                                                  // selectedDropdown === dropdownIndex
                                                  selectedDropdown[
                                                    `submenu${subIndex}`
                                                  ] === dropdownIndex
                                                    ? "pl-[.75rem]"
                                                    : "pl-[1.3rem]"
                                                }`}
                                              >
                                                {
                                                  dropdownItem.subMenuDropdownname
                                                }
                                              </div>
                                              {/* {dropdownIndex !==
                                              dropdownItem.subMenuDropdownname
                                                .length -
                                                1 && (
                                              <div className="absolute top-0 bottom-0 left-0 bg-[#B9B9B9] dark:bg-[#464646] w-[1px]" />
                                            )} */}
                                            </li>
                                          </Link>
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
