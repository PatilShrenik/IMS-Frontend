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
  );
};

export default SingleSelect;
