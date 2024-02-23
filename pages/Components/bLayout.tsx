import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const BLayout: React.FC<LayoutProps> = ({ children }: any) => {
  
  return (
    
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <title>IMS</title>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: 'url("/grayBG.jpg")',

          backgroundSize: "cover",
          opacity: 0.2,
        }}
      ></div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          height: "100%",
        }}
      >
        <div className="flex-1 overflow-x-hidden overflow-y-auto z-10 h-[100vh]">
          {/* Page content */}
          <main className=" p-6 h-[100%]">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default BLayout;
