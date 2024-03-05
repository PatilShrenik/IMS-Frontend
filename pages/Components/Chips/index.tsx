import React from "react";

const Chips = (props: any) => {
  const { value } = props;
 // console.log("chip value", value);
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
      className={`items-center h-[22px] w-[110px] border ${
        value == "new"
          ? "border-black text-black dark:border-white dark:text-white"
          : value == "discovered"
          ? "border-primary2 text-primary2"
          : value == "monitoring"
          ? "border-success text-textColor bg-success dark:bg-transparent dark:text-success"
          : value == "discovery failed"
          ? "border-danger text-danger"
          : value == "disabled"
          ? "border-gray-600 text-gray-600"
          : ""
      }  rounded-full`}
    >
      <p className="capitalize">{value}</p>
    </div>
  );
};
