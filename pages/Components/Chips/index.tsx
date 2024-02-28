import React from "react";

const Chips = (props: any) => {
  const {value} = props;
  return (
    <div className=" items-center h-[22px] w-[30px] border border-primary2 dark:text-primary2  rounded-full">
      <p className="mt-[2px]">{value}</p>
    </div>
  );
};

export default Chips;
