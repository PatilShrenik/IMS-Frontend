import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";

const CustomeInput = (props: any) => {
  const { label, type, require, disable, value, name, onChange } = props;
  return (
    <div className=" flex items-center mx-4 my-4">
      {/* <label className=" mx-2 mb-1 text-sm block text-black dark:text-white">
        {label} {require == true && <span className="text-red-400">*</span>}
      </label> */}
      <input
        className=" w-[18rem] dark:text-textColor border-b-[3px] dark:border-dark-border bg-transparent py-1 px-2 font-medium outline-none transition focus:border-primary2 active:border-primary2 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary2"
        type={type ? type : "text"}
        placeholder={label}
        required={require ? true : false}
        disabled={disable ? true : false}
        value={value ? value : ""}
        name={name ? name : ""}
        onChange={onChange ? onChange : ""}
      />
    </div>
    // <div className="m-2">
    //   <TextField
    //     className="border-2-[#ffffff]"
    //     id="outlined-basic"
    //     label="Outlined"
    //     variant="outlined"
    //     size="small"
    //   />
    // </div>
  );
};

export default CustomeInput;
