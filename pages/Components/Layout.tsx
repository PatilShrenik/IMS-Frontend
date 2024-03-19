import React, { ReactNode, useEffect, useState } from "react";

import { useAppContext } from "./AppContext";

interface LayoutProps {
  children: ReactNode;
}
import { useRouter } from "next/router";
import { memo } from "react";
import Header from "./Header";
import MenuIcon from "@mui/icons-material/Menu";
import NewSidebar from "./NewSidebar";
import SidebarMenu from "./SidebarMenu";
import CloudGateway from "../page/FinOps/Settings";
import { usePathname } from "next/navigation";
import Breadcrumb from "./BreadCrumbs";
// import router from "next/router";

const Footer = memo(() => (
  <footer
    className={`px-4 h-12 footer items-center text-center bg-light-container bottom-0 text-neutral-content w-full z-10 dark:bg-dark-container`}
  >
    <p className="text-black text-center dark:text-textColor">
      <span className="text-xs">&copy; RevDau 2024</span>{" "}
      {/* <strong className="text-red-800 text-xs">
        Birla Management Centre Services Private Limited (BMCSPL).
      </strong>{" "} */}
      <span className="text-xs">All Rights Reserved.</span>
    </p>
    {/* <p className="text-xs text-center">
      All content, trademarks, logos, and intellectual property on this portal
      are the property of the Aditya Birla Group and its entities. Any
      unauthorized use, reproduction, or distribution is strictly prohibited.
    </p> */}
  </footer>
));
Footer.displayName = "Footer";
const Layout: React.FC<LayoutProps> = ({ children }: any) => {
  const { sidebarOpen, toggleSideBarState, toggleSideBarStateWithArgu } =
    useAppContext();
  // const [uEmail, setEmail] = useState<any>(false);
  const router = useRouter();
  // const currentUrl = router.asPath;
  // const isPageIncluded = currentUrl.includes('/page');
  const { authenticated, toggleAuthenticated } = useAppContext();

  const pathname = usePathname();
  const path = pathname.substring(1);
  useEffect(() => {
    if (
      path == "Dashboard" ||
      path == "Assets" ||
      path == "Alerts" ||
      path == "Topology" ||
      path == "Reports" ||
      path == "NCM" ||
      path == "Audit"
    ) {
      toggleSideBarStateWithArgu(true);
    }
  }, [path]);
  const transformedString = path
    .replace(/\//g, " > ")
    .replace(/-/g, " ")
    .split("/")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" > ");
  return (
    <div
      id="appLayout"
      className="flex text-black bg-gray-100 h-screen"
      // style={{ backgroundColor: "rgba(254, 241, 235, 0.40)" }}
    >
      <title>IMS</title>
      <NewSidebar />

      <div
        className="flex-auto relative h-[100vh] bg-gray-100  overflow-y-auto overflow-x-hidden"
        // style={{ backgroundColor: "rgba(254, 241, 235, 0.40)" }}
        style={{
          width: "-webkit-fill-available",
          background:
            "linear-gradient(180deg, rgb(214, 219, 220), rgb(255, 255, 255))",
        }}
      >
        <Header />
        <main className="flex min-h-[calc(100vh)] bg-white dark:bg-dark-container">
          <div
            className={
              sidebarOpen
                ? ""
                : " transition duration-300 border-r ease-linear translate-x-0 border-textColor dark:border-dark-border min-w-[15%]"
            }
          >
            <SidebarMenu />
          </div>
          <div className={`${sidebarOpen ? "w-full" : "w-[85%]"} p-2`}>
            <div className="flex">
              {/* {pathname.includes("Explorer") ||
                pathname.includes("Diagnostics") ||
                (pathname.includes("Settings") && (
                  <div
                    className=" flex cursor-pointer items-center"
                    onClick={() => {
                      toggleSideBarState();
                      // toggleSideBarClickState();
                    }}
                  >
                    <MenuIcon
                      className={` ${
                        sidebarOpen
                          ? "text-primary2 dark:text-primary2"
                          : "text-black dark:text-white"
                      }`}
                    />
                  </div>
                ))} */}
              {/* <div className="ml-4">
                <Breadcrumb />
              </div> */}
            </div>
            <div className="mt-12">{children}</div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
