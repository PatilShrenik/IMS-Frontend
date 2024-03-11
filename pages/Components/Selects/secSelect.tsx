import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SecSingleSelect = (props: any) => {
  const { label, selectData, onChange, require, value } = props;
  const [selectFocused, setSelectFocused] = useState(false);
//console.log("val",value)
  // useEffect(() => {
  //   if(value) {

  //   }
  // },[value])
  const selectRef = useRef(null) as any;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    onChange(selectedValue);
  };

  const handleClickOutside = (event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setSelectFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 // console.log("============", selectFocused, value);
  return (
    <div className="flex items-center mx-4 my-4">
      <div className="relative bg-white dark:bg-dark-menu-color dark:text-textColor">
        <select
          // ref={selectRef}
          className={`relative z-20 w-[18rem] text-gray-400  border-[1px] rounded-lg dark:border-dark-border py-3.5 pr-12 pl-1 outline-none transition focus:border-primary2 active:border-primary2 dark:bg-dark-menu-color  ${
            selectFocused || value ? "select-focused" : ""
          }`}
          // placeholder={label}
          onChange={handleSelectChange}
          value={value && value}
          multiple={false}
          onFocus={() => setSelectFocused(true)}
          onBlur={() => setSelectFocused(false)}
        >
         {/* <option >{label && label}</option> */}

          {selectData &&
            selectData.map((item: any, index: any) => (
              <option
                className="dark:text-textColor"
                key={index}
                value={item.id ? item.id : item}
              >
                {item.name ? item.name : item}
              </option>
            ))}
        </select>
        {/* <div className="custom-arrow" /> */}
        {label && (
          <label
            className={`absolute transition-all pointer-events-none left-1 opacity-0 ${
              selectFocused || value ? "label-focused" : ""
            }`}
          >
            {label} {require && "*"}
          </label>
        )}
        {/* <ArrowDropDownIcon
          style={{ fontSize: "8px" }}
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-textColor dark:text-textColor"
        /> */}
        <style jsx>{`
          .select-focused {
            border-color: #0078d4; /* Hide the border when focused */
          }

          .label-focused {
            top: -20px; /* Adjust the top position as needed */
            font-size: 0.9rem;
            font-weight: 600;
            color: #0078d4;
            opacity: 1;
            transition: opacity 0.8s ease;
          }
        `}</style>
      </div>
      {/* <div className="relative bg-white dark:bg-dark-container dark:text-textColor">
        <select
          className="relative z-20 w-[18rem]  border-b-[3px] dark:border-dark-border  py-3.5 pr-12 pl-1 outline-none transition focus:border-primary2 active:border-primary2  dark:bg-dark-container dark:text-textColor"
          onChange={handleSelectChange}
          value={value && value}
          multiple={false}
        >
          {selectData &&
            selectData.map((item: any, index: any) => {
              return (
                <option key={index} value={item.id ? item.id : item}>
                  {item.name ? item.name : item}
                </option>
              );
            })}
        </select>
        <KeyboardArrowDownIcon
          style={{ fontSize: "8px" }}
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-textColor dark:text-textColor"
        />
      </div> */}
    </div>
  );
};

export default SecSingleSelect;