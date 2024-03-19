import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const CustomeInput = (props: any) => {
  const { type, require, disable, name, onChange, onBlur, color } = props;
  // console.log("value.length", value && value.length);
  const [inputFocused, setInputFocused] = useState(false);
  // console.log("color", color);
  // useEffect(() => {
  //   if (!inputFocused && onBlur) {
  //     console.log("---------------in effect");
  //     onBlur();
  //   }
  // }, [inputFocused]);

  return (
    <div className="items-center mx-4 my-4">
      <div className="relative">
        <input
          className={`w-[18rem]  text-gray-400 ${
            color ? `border-${color}` : ""
          } border-[1px] rounded-lg dark:border-dark-border bg-transparent py-[0.9rem] px-2 font-medium outline-none transition focus:border-primary2 active:border-primary2 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input ${
            inputFocused ? "input-focused" : ""
          }`}
          type={type ? type : "text"}
          placeholder={
            !inputFocused ? `${props.label}${require ? " *" : ""}` : ""
          }
          required={require ? true : false}
          disabled={disable ? true : false}
          value={props.value ? props.value : ""}
          name={name ? name : ""}
          onChange={onChange ? onChange : ""}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        {props.label && (
          <label
            className={`absolute transition-all pointer-events-none left-2 opacity-0 ${
              inputFocused || props.value ? "label-focused" : ""
            }`}
          >
            {props.label}{" "}
            {require == true && <span className="text-red-400">*</span>}
          </label>
        )}
        <style jsx>{`
          .input-focused {
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
      {/* <label className=" mx-2 mb-1 text-sm block text-black dark:text-white">
        {label} {require == true && <span className="text-red-400">*</span>}
      </label> */}
      {/* <input
        className=" w-[18rem] dark:text-textColor border-[1px] rounded-lg dark:border-dark-border dark:bg-dark-container py-3 px-2 font-medium outline-none transition focus:border-primary2 active:border-primary2 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary2"
        type={type ? type : "text"}
        placeholder={label}
        required={require ? true : false}
        disabled={disable ? true : false}
        onClick={() => console.log("clicked")}
        value={value ? value : ""}
        name={name ? name : ""}
        onChange={onChange ? onChange : ""}
      /> */}
    </div>
  );
};

export default CustomeInput;

export const CustomeTextArea = (props: any) => {
  const { label, require, disable, value, name, onChange, rows } = props;
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <>
      <div className="items-center mx-4 my-4">
        <div className="relative">
          <textarea
            className={`w-[18rem] dark:text-textColor border-[1px] rounded-lg dark:border-dark-border bg-transparent py-3 px-2 font-medium outline-none transition focus:border-primary2 active:border-primary2 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input ${
              inputFocused || (value && value.length > 0) ? "input-focused" : ""
            }`}
            // type={type ? type : "text"}
            placeholder={!inputFocused ? `${label}${require ? " *" : ""}` : ""}
            required={require ? true : false}
            disabled={disable ? true : false}
            value={value ? value : ""}
            name={name ? name : ""}
            rows={rows}
            onChange={onChange ? onChange : ""}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          {label && (
            <label
              className={`absolute transition-all pointer-events-none left-2 opacity-0 ${
                inputFocused ? "label-focused" : ""
              }`}
            >
              {label}{" "}
              {require == true && <span className="text-red-400">*</span>}
            </label>
          )}
          <style jsx>{`
            .input-focused {
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
        {/* <label className=" mx-2 mb-1 text-sm block text-black dark:text-white">
        {label} {require == true && <span className="text-red-400">*</span>}
      </label> */}
        {/* <input
        className=" w-[18rem] dark:text-textColor border-[1px] rounded-lg dark:border-dark-border dark:bg-dark-container py-3 px-2 font-medium outline-none transition focus:border-primary2 active:border-primary2 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary2"
        type={type ? type : "text"}
        placeholder={label}
        required={require ? true : false}
        disabled={disable ? true : false}
        onClick={() => console.log("clicked")}
        value={value ? value : ""}
        name={name ? name : ""}
        onChange={onChange ? onChange : ""}
      /> */}
      </div>
    </>
  );
};

export function DateInput(props: any) {
  const [epochTime, setEpochTime] = React.useState(0);
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const Time = dayjs(date).unix();
      setEpochTime(Time);
    }
  };
  React.useEffect(() => {
    props.onChange(epochTime);
  }, [epochTime, props]);
  const dateObject = new Date(props.value * 1000);
  
  return (
    <>
      {/* <lable>Select Date</lable> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={props.label ? props.label : ""}
          value={props.value ? dateObject : props.value}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </>
  );
}
