import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
const SingleSelect = (props: any) => {
  const { label, selectData, onChange, require, value, isMulti } = props;
  const [selectFocused, setSelectFocused] = useState(false);

  const handleSelectChange = (data: any) => {
    const selectedValue = Array.isArray(data)
      ? data.map((item: any) => item.value)
      : data.value;

    onChange(selectedValue);
   // console.log("============", selectData, selectedValue, value);
  };

  return (
    <Select
      onChange={handleSelectChange}
      closeMenuOnSelect={isMulti ? false : true}
      value={value && value}
      isMulti={isMulti && isMulti}
      required={require && true}
      placeholder={label}
      options={selectData}
      className="my-react-select-container w-[18rem]  rounded-lg  mx-4 my-4 z-999"
      classNamePrefix="my-react-select"
    />
    // <div className="flex items-center mx-4 my-4">
    //   <div className="relative bg-white dark:bg-dark-menu-color ">
    //     <select
    //       // ref={selectRef}
    //       className={`relative z-20 w-[18rem]  border-[1px] rounded-lg dark:border-dark-border text-gray-400 py-3.5 pr-12 pl-1 outline-none transition focus:border-primary2 active:border-primary2 dark:bg-dark-menu-color  ${
    //         selectFocused || value ? "select-focused" : ""
    //       }`}
    //       placeholder={label}
    //       onChange={handleSelectChange}
    //       value={value && value}
    //       multiple={false}
    //       onFocus={() => setSelectFocused(true)}
    //       onBlur={() => setSelectFocused(false)}
    //     >
    //       <option>{label && label}</option>

    //       {selectData &&
    //         selectData.map((item: any, index: any) => {
    //           // console.log(item.id);
    //           return (
    //             <option
    //               className="dark:text-textColor"
    //               key={index}
    //               value={item.id ? item.id : item}
    //             >
    //               {item.name ? item.name : item}
    //             </option>
    //           );
    //         })}
    //     </select>
    //     {/* <div className="custom-arrow" /> */}
    //     {label && (
    //       <label
    //         className={`absolute transition-all pointer-events-none left-1 opacity-0 ${
    //           selectFocused || value ? "label-focused" : ""
    //         }`}
    //       >
    //         {label} {require && "*"}
    //       </label>
    //     )}
    //     {/* <ArrowDropDownIcon
    //       style={{ fontSize: "8px" }}
    //       className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-textColor dark:text-textColor"
    //     /> */}
    //     <style jsx>{`
    //       .select-focused {
    //         border-color: #0078d4; /* Hide the border when focused */
    //       }

    //       .label-focused {
    //         top: -20px; /* Adjust the top position as needed */
    //         font-size: 0.9rem;
    //         font-weight: 600;
    //         color: #0078d4;
    //         opacity: 1;
    //         transition: opacity 0.8s ease;
    //       }
    //     `}</style>
    //   </div>
    // </div>
  );
};

export default SingleSelect;
