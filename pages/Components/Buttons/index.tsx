import React from "react";

const CustomeButton = (props: any) => {
  return (
    <div className=" mx-2 inline-flex items-center justify-center rounded-md py-1 px-6 text-center font-medium text-white bg-primary2 hover:bg-opacity-90 lg:px-6 xl:px-6 cursor-pointer">
      {props.title}
    </div>
  );
};

export default CustomeButton;

export const CustomeCancelButton = (props: any) => {
  return (
    <div className=" mx-2 inline-flex items-center justify-center rounded-md py-1 px-6 text-center font-medium text-white bg-light3 dark:bg-light3 hover:bg-opacity-90 lg:px-6 xl:px-6 cursor-pointer">
      {props.title}
    </div>
  );
};
