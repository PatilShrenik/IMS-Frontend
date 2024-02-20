import React from "react";

const PageHeading = (props: any) => {
  return (
    <div className="w-full border-b pb-2">
      <p className="text-lg dark:text-textColor">{props.heading}</p>
    </div>
  );
};

export default PageHeading;
