import React, { useState, useRef, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Button, Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Pagination } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import Select from "react-select";
import MultiSelectDropdown from "../Components/Selects/Multiselect";
import { useAppContext } from "../Components/AppContext";
import { CustomProvider, DatePicker, DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import moment from "moment";

interface Widget {
  widget_name: string;
  widget_type: string;
}
const ITEMS_PER_PAGE = 10;
const index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const open = Boolean(anchorEl);

  //--------------------------------------code required for DateRangePicker-----------------------------
  const { time, toggleTime } = useAppContext();
  const { timeEnd, toggleTimeEnd } = useAppContext();
  const [timePeriod, setTimePeriod] = React.useState<any>([
    new Date(time),
    new Date(timeEnd),
  ]);
  const today = moment();
  const financialYearStartMonth = 3;
  let financialYearStart;
  let financialYearEnd;
  if (today.month() < financialYearStartMonth) {
    financialYearStart = moment()
      .subtract(1, "year")
      .month(financialYearStartMonth)
      .startOf("month")
      .hour(15)
      .minute(30)
      .second(0)
      .millisecond(0);
    financialYearEnd = today.hour(15).minute(30).second(0).millisecond(0);
  } else {
    financialYearStart = moment()
      .month(financialYearStartMonth)
      .startOf("month")
      .hour(15)
      .minute(30)
      .second(0)
      .millisecond(0);
    financialYearEnd = today.hour(15).minute(30).second(0).millisecond(0);
  }
  const predefinedRanges: any = [
    {
      label: "Last day",

      value: [
        new Date(moment().subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 7 days",

      value: [
        new Date(moment().subtract(7, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 15 days",

      value: [
        new Date(moment().subtract(15, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 30 days",

      value: [
        new Date(moment().subtract(30, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 90 days",

      value: [
        new Date(moment().subtract(90, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },
    {
      label: "Last 120 days",

      value: [
        new Date(moment().subtract(120, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },
    {
      label: "Last 180 days",

      value: [
        new Date(moment().subtract(180, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },
    {
      label: "Current FY",
      value: [
        new Date(financialYearStart.format("YYYY-MM-DDTHH:mm:ss")),
        new Date(financialYearEnd.format("YYYY-MM-DDTHH:mm:ss")),
      ],
      placement: "left",
    },
  ];
  const { afterToday }: any = DateRangePicker;

  //-----------------------------code required for DateRangePicker ENDS-----------------------------

  const widgets: Widget[] = [
    {
      widget_name: "Apple MacBook Pro 17",

      widget_type: "Laptop",
    },
    {
      widget_name: "Microsoft Surface Pro",

      widget_type: "Laptop PC",
    },
    {
      widget_name: "Mag",
      widget_type: "ds",
    },
    {
      widget_name: "Google ",
      widget_type: "ds",
    },

    {
      widget_name: "A",
      widget_type: "hdf",
    },
    {
      widget_name: "Afd",
      widget_type: "hdf",
    },
    {
      widget_name: "Adfgg",
      widget_type: "hdf",
    },
    {
      widget_name: " Pro 17",
      widget_type: "Bag",
    },
    {
      widget_name: "Surface Pro",
      widget_type: "chair",
    },
    {
      widget_name: "Mag",
      widget_type: "ds",
    },
    {
      widget_name: "Afd",
      widget_type: "hdf",
    },
  ];

  const handleButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
    console.log("Search Value:", searchValue);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginatedWidgets = widgets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const options: any[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "kiwi", label: "Kiwi" },
    { value: "orange", label: "Orange" },
  ];

  const { themeSwitch, toggleThemeSwitch } = useAppContext();

  // Effect to update the color theme when it changes in localStorage

  // console.log("colotheme", { colorTheme });

  const isBrowser = typeof window !== "undefined";

  // State to store the color theme
  const [colorTheme, setColorTheme] = useState<any>(
    isBrowser ? localStorage.getItem("color-theme") : null
  );
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage change detected");
      const newColorTheme = localStorage.getItem("color-theme");
      console.log("New color theme:", newColorTheme);
      setColorTheme(newColorTheme);
    };
    handleStorageChange();
  }, [themeSwitch]);

  return (
    <div>
      {/* <div>
        <Select
          // onChange={(val: any) => setSelectedReportsDropDown(val)}
          closeMenuOnSelect={false}
          // value={selectedReportsDropDown}
          // defaultValue={selectedReportsDropDown}
          isMulti
          options={options}
          className="my-react-select-container w-[20rem] ml-4 z-10"
          classNamePrefix="my-react-select"
        />
      </div> */}
      {/* <div className="container mx-auto p-4">
        <MultiSelectDropdown options={options} />
      </div> */}
      {/* <div className="w-[20rem] ml-4 mt-4"> */}
        {/* <CustomProvider theme="dark"> */}
        {/* <label className="dark:text-textColor">Select Date Range : </label>
        <DateRangePicker
          placement="auto"
          value={timePeriod}
          onChange={setTimePeriod}
          ranges={predefinedRanges}
          // showOneCalendar
          style={{ width: "100%" }}
          shouldDisableDate={afterToday()}
          placeholder="Select Date Range"
          format="yyyy-MM-dd"
          className="hover:bg-gray-50 focus:bg-gray-50 dark:bg-card-color"
        /> */}
        {/* </CustomProvider> */}
      {/* </div> */}
      <div
        onClick={handleButtonClick}
        className="rounded-2xl border-2 border-primary2 p-2 bottom-2 right-4 fixed cursor-pointer "
      >
        <AddIcon fontSize="medium" className="dark:text-textColor" />
      </div>
      {/* <svg
        className="fixed cursor-pointer w-[50px] h-[50px] bottom-2 right-4 "
        onClick={handleButtonClick}
        xmlns="http://www.w3.org/00/svg"
       viewBox="0 0 512 512"
      >
        <path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
          fill="#171A22"
        />
      </svg> */}

      <Drawer anchor="right" open={isDrawerOpen} variant="persistent">
        <div className="container mx-auto sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl bg-light-container dark:bg-dark-container">
          <div className="flex border-b-2  justify-between py-2">
            <span className="px-4 font-bold dark:text-textColor">
              {" "}
              Add Widget
            </span>

            <CloseSharpIcon
              className="cursor-pointer mr-3 dark:text-textColor"
              onClick={handleDrawerClose}
            />
          </div>

          <div className="flex  mt-6 mr-2 justify-between p-4">
            <div className="mb-4 sm:mb-0 sm:mr-4 flex items-center">
              <form className="relative">
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="w-full bg-transparent border-b-2 pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                />
                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                  <svg
                    className="fill-gray-500 hover:fill-blue-400 "
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                      fill=""
                    />
                  </svg>
                </button>
              </form>
            </div>

            <Tooltip
              className="text-lg font-bold"
              title="Create Widget"
              placement="left"
            >
              <svg
                className="cursor-pointer w-[40px] h-[40px] "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                  fill="#3C50E0"
                />
              </svg>
            </Tooltip>
          </div>

          <div className="relative  min-w-[34.375rem] px-4 py-1  overflow-x-auto shadow-md rounded-lg ">
            <div className="min-h-[450px] ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="bg-primary2 dark:bg-tabel-header dark:text-textColor font-semibold">
                    <th scope="col" className="px-6 py-4 w-1/2">
                      widget Name
                    </th>

                    <th scope="col" className="px-6 py-4 w-3/10">
                      widget Type
                    </th>

                    <th scope="col" className="px-6 py-4 w-1/5">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedWidgets.map((Widget, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "bg-gray-200 dark:bg-gray-800"
                          : "bg-white dark:bg-gray-900"
                      } border-b dark:border-gray-700`}
                    >
                      <th
                        scope="row"
                        className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {Widget.widget_name}
                      </th>

                      <td className="px-6 py-1 text-gray-900 whitespace-nowrap">
                        {Widget.widget_type}
                      </td>

                      <td className=" px-6 py-1  text-gray-900 whitespace-nowrap">
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>

                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              width: "16ch",
                            },
                          }}
                        >
                          <MenuItem>
                            {" "}
                            {/* <EditRoundedIcon className=" text-blue-400  mr-3" />{" "} */}
                            Edit
                          </MenuItem>
                          <MenuItem>
                            {/* <DeleteForeverIcon  className="  text-blue-400 mr-3" /> */}
                            Delete
                          </MenuItem>
                          <MenuItem>
                            {" "}
                            {/* <DashboardCustomizeRoundedIcon className="  text-blue-400 mr-3" />{" "} */}
                            Visit Dashboard
                          </MenuItem>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-row-reverse ">
              <Pagination
                count={Math.ceil(widgets.length / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                className="mt-4 mb-4"
              />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default index;
