import React, { useState } from "react";
import Link from "next/link";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
 

  const handleSubmenuClick = (index: any) => {
    console.log("=-=", index);
    setOpenSubmenu((prevOpen) => (prevOpen === index ? null : index));
  };

  const menuItems: MenuItem[]  = [
    {
      name: "Dashboard",
      pathName: "/page/FinOps/reports",
      
    },

    {
      name: "Assets",
      pathName: "/page/FinOps/Settings",
    },

    {
      name: "Alert",
      pathName: "/page/Alert",
    },

    {
      name: "Topology",
      pathName: "/page/Topology",
    },
    {
      name: "Explorer",
      pathName: "/page/Explorer",
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
      name: "Report",
      pathName: "/page/Report",
    },

    {
      name: "Diagnostics",
      pathName: "/page/Diagnostics",
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
      pathName: "/page/NCM",
    },
    {
      name: "Audit",
      pathName: "/page/Audit",
    },

    {
      name: "Settings",
      pathName: "/page/Settings",
      subMenu: [
        {
          subMenuName: "User Settings",
          // subMenuPathName: "/page/changeSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "- User",
              subMenuDropdownpathName: "/page/user",
            },
            {
              subMenuDropdownname: "- Role",
              subMenuDropdownpathName: "/page/role",
            },
            {
              subMenuDropdownname: "- Group",
              subMenuDropdownpathName: "/page/role",
            },
            {
              subMenuDropdownname: "- Password Settings",
              subMenuDropdownpathName: "/page/role",
            },
            {
              subMenuDropdownname: "- LDPA",
              subMenuDropdownpathName: "/page/role",
            },

          ],
        },
        {
          subMenuName: "System Settings",
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "- Global Settings",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "- Mail Server",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "- SMS Server",
              subMenuDropdownpathName: "/page/flow",
            },

          ],
        },
        {
          subMenuName: "System Settings",
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "- Global Settings",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "- Mail Server",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "- SMS Server",
              subMenuDropdownpathName: "/page/flow",
            },

          ],
        },

        {
          subMenuName: "Policy",
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
            {
              subMenuDropdownname: "- Alarm",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "- Policy",
              subMenuDropdownpathName: "/page/flow",
            },

           

          ],
        },

        {
          subMenuName: "Device Settingd",
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
           
            {
              subMenuDropdownname: "- Credential Profile",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "- Site Management",
              subMenuDropdownpathName: "/page/flow",
            },
            
           

          ],
        },

        {
          subMenuName: "Catalog",
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
           
            {
              subMenuDropdownname: "- SNMP",
              subMenuDropdownpathName: "/page/flow",
            },

          ],
        },
        {
          subMenuName: "Traffic",
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
           
            {
              subMenuDropdownname: "- Flow",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "- Trap",
              subMenuDropdownpathName: "/page/flow",
            },
            
           

          ],
        },
        {
          subMenuName: "Schedular",
          // subMenuPathName: "/page/systemSetting",
          subMenuDropdown: [
           
            {
              subMenuDropdownname: "- Discovery Schedular",
              subMenuDropdownpathName: "/page/flow",
            },
            {
              subMenuDropdownname: "- Report Schedular",
              subMenuDropdownpathName: "/page/flow",
            },
            
           

          ],
        },
      ],
    },


   




  ];

  return (
    <div className="left-0 top-0 w-[17.5rem] ml-[1px] z-9999 flex  flex-col overflow-y-hidden bg-[#171A22] duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ">
      <div className="flex h-[2.5rem] px-3 items-center text-white   pt-1.3 border-b-2">
        {menuItems.map((menuItem, index) => (
          <span key={index}>
            {pathname.includes(menuItem.pathName) && menuItem.name}
          </span>
        ))}
      </div>

      <ul>
        {menuItems.map(
          (menuItem, index) =>
            pathname.includes(menuItem.pathName) && (
              <li className="w-full" key={index}>
                <div
                  
                  className="group relative flex items-center rounded-sm py-2 font-medium text-bodydark1 duration-300 ease-in-out  text-[#DEE4EE] hover:text-[#DEE4EE] dark:hover:bg-meta-4 "
                >
                  {menuItem.subMenu?.length  && (
                    <ul className="ml-3 p-0  py-[5px]">
                      {menuItem.subMenu.map((submenuItem, subIndex) => (
                        <li
                          key={subIndex}
                          className=" py-2.5 pl-4  items-center  text-[#DEE4EE] hover:text-[#DEE4EE] font-light"
                        >
                          <div
                            className="flex justify-between cursor-pointer transition duration-300 ease-in-out"
                            onClick={() => handleSubmenuClick(subIndex)}
                          >
                            {submenuItem.subMenuName}
                            {submenuItem.subMenuDropdown && (
                              <KeyboardArrowUpIcon
                                className={`transform ${
                                  openSubmenu === subIndex ? "-rotate-180" : ""
                                }`}
                              />
                            )}
                          </div>
                          {submenuItem.subMenuDropdown && (
                            <ul
                              className={`ml-3 p-0 mt-2 py-[5px] transition-opacity ${
                                openSubmenu === subIndex
                                  ? "hidden"
                                  : "inline-block"
                              }`}
                            >
                              {submenuItem.subMenuDropdown.map(
                                (dropdownItem, dropdownIndex) => (
                                  <li
                                    key={dropdownIndex}
                                    className="mr-3 py-1 items-center  text-[#DEE4EE] hover:text-[#DEE4EE] font-light"
                                  >
                                    {dropdownItem.subMenuDropdownname}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default SidebarMenu;
