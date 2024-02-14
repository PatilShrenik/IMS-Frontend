// // SidebarLinkGroup.js
// import React, { ReactNode, useState } from "react";

// interface SidebarLinkGroupProps {
//   children: (handleClick: () => any, open: boolean) => any;
//   activeCondition: boolean;
// }

// const SidebarLinkGroup = ({
//   children,
//   activeCondition,
// }: SidebarLinkGroupProps) => {
//   const [open, setOpen] = useState<boolean>(activeCondition);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return <li>{children(handleClick, open)}</li>;
// };

// export default SidebarLinkGroup;
import React from 'react'

const SidebarLinkGroup = () => {
  return (
    <div>SidebarLinkGroup</div>
  )
}

export default SidebarLinkGroup