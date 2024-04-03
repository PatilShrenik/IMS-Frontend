import React from "react";

const Chips = (props: any) => {
  
  const { value } = props;
//console.log("chip value", value);
  return (
    <div className=" items-center h-[22px] w-[30px] border border-primary2 dark:text-primary2  rounded-full">
      <p className="mt-[2px] text-sm">{value}</p>
    </div>
  );
};

export default Chips;

export const StatusChips = (props: any) => {
  const { value } = props;
  // console.log("chip value", value);
  return (
    <div
      className={`items-center h-[25px] w-[110px] border-[3px] ${
        value == "new"
          ? "border-black text-black dark:border-textColor dark:text-white"
          : value == "discovered"
          ? "border-primary2 text-primary2 dark:text-primary2"
          : value == "monitoring"
          ? " border-success text-success dark:text-success"
          : value == "discovery failed"
          ? "border-danger text-danger dark:text-danger"
          : value == "disabled"
          ? "border-gray-600 text-gray-600 dark:text-gray-600"
          : ""
      }  rounded-full`}
    >
      <p className="capitalize">{value}</p>
    </div>
  );
};


export const DeviceProfileChip = (props: any) => {
  const { value } = props;
  // console.log("chip value", value);
  return (
    <div className=" items-center h-[22px] w-[30px] border border-primary2 dark:text-primary2 mx-8 rounded-full">
      <p className="mt-[2px] text-sm">{value}</p>
    </div>
  );
};

export const CustomChip = (props: any) => {
  const { label, onDelete } = props ;
  return (
    // <div
    //   className="inline-flex items-center dark:bg-[#4B5563] dark:text-textColor   bg-gray-200 text-gray-700 mr-2 rounded-md"
    //   style={{ cursor: "pointer" }}
    //   onClick={onDelete}
    // >
    //   <span className="px-2 ">{label}</span>
    //   <span className="bg-[#4B5563] text-textColor px-1.5 py-1 text-xs font-bold  hover:bg-red-400  ">&#x2715;</span> {/* Close icon */}
    // </div>
    <div className="inline-flex items-center dark:bg-[#4B5563] dark:text-textColor bg-gray-200 text-gray-700 mr-2 rounded-md" style={{ cursor: "pointer" }}>
    <span className="px-2">{label}</span>
    <span className="bg-[#4B5563] text-textColor px-1.5 py-1 text-xs font-bold  hover:bg-red-400" onClick={onDelete}>&#x2715;</span> {/* Close icon */}
  </div>
  );
};