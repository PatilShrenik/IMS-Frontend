import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SingleSelect = (props: any) => {
  const { label, selectData, onChange, require, value } = props;

  // useEffect(() => {
  //   if(value) {

  //   }
  // },[value])
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    onChange(selectedValue);
  };

  return (
    <div className="flex items-center mx-4 my-4">
      {/* <label className=" mb-1 text-[12px] block text-black dark:text-white">
        {label} {require == true && <span className="text-red-400">*</span>}
      </label> */}
      <div className="relative bg-white dark:bg-dark-menu-color dark:text-textColor">
        <select
          className="relative z-20 w-[18rem]  border-b-[3px] dark:border-dark-border bg-transparent py-1 pr-12 pl-1 outline-none transition focus:border-primary2 active:border-primary2 dark:border-form-strokedark dark:bg-dark-menu-color dark:text-textColor"
          onChange={handleSelectChange}
          value={value && value}
          multiple={false}
          // style={{ fontSize: "12px" }}
        >
          {/* <option className="dark:text-[#9CA3AF]" disabled>
            --Select--
          </option> */}
          {selectData &&
            selectData.map((item: any, index: any) => {
              return (
                <option
                  key={index}
                  value={item.id ? item.id : item}
                  // className="text-[12px]"
                >
                  {item.name ? item.name : item}
                </option>
              );
            })}
        </select>
        <KeyboardArrowDownIcon
          style={{ fontSize: "8px" }}
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-textColor dark:text-textColor"
        />
        {/* <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span> */}
      </div>
    </div>
  );
};

export default SingleSelect;
