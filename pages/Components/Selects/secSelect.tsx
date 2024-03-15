import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SecSingleSelect = (props: any) => {
  const { label, selectData, onChange, require, value, index, type } = props;

  // console.log(index, type);
  const [selectFocused, setSelectFocused] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("single select", event.target.value);
    const selectedValue = event.target.value;
    // console.log(index);
    if (index === undefined) {
      console.log("1");
      onChange(selectedValue);
    } else {
      console.log("3");
      onChange(index, type, selectedValue);
    }
  };

  return (
    <div className="flex items-center mx-4 my-4 z-0">
      <div className="relative bg-white dark:bg-dark-menu-color dark:text-textColor">
        <select
          // ref={selectRef}
          className={`relative z-20 w-[18rem] text-gray-400  border-[1px] rounded-lg dark:border-dark-border py-3.5 pr-12 pl-1 outline-none transition focus:border-primary2 active:border-primary2 dark:bg-dark-menu-color  ${
            selectFocused || value ? "select-focused" : ""
          }`}
          // placeholder={label}
          onChange={handleSelectChange}
          value={value ? value : label}
          multiple={false}
          onFocus={() => setSelectFocused(true)}
          onBlur={() => setSelectFocused(false)}
        >
          {selectFocused ? (
            <option>{label && label}</option>
          ) : (
            <option>{label && label}</option>
          )}

          {selectData &&
            selectData.map((item: any, index: any) => (
              <option
                className="dark:text-textColor"
                key={index}
                value={item.id ? item.id : item}
              >
                <p className="my-4">{item.name ? item.name : item}</p>
              </option>
            ))}
        </select>
        {label && (
          <label
            className={`absolute transition-all pointer-events-none left-1 opacity-0 ${
              selectFocused || value ? "label-focused" : ""
            }`}
          >
            {label} {require && "*"}
          </label>
        )}
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
    </div>
  );
};

export default SecSingleSelect;
