import React, { useState, useRef, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Button, Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Pagination } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
interface Widget {
  widget_name: string;
  widget_type: string;
}
const ITEMS_PER_PAGE = 7;
const index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const open = Boolean(anchorEl);
  const handleButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
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
  ];
  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleFormSubmit = () => {
    // Perform search logic here based on the searchValue
    // For example, you can filter the rows array
    // For simplicity, let's just log the searchValue for now
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

  return (
    <div>
      <svg
        className="fixed cursor-pointer w-[50px] h-[50px] bottom-20 right-40 "
        onClick={handleButtonClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
          fill="#3C50E0"
        />
      </svg>

      <Drawer anchor="right" open={isDrawerOpen} variant="persistent">
        <div className="container mx-auto sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl ">
          <div className="flex border-b-2  justify-between py-2">
            <span className="px-4 font-bold"> Create Widget</span>

            <CloseSharpIcon
              className="cursor-pointer mr-3"
              onClick={handleDrawerClose}
            />
          </div>

          <div className="flex flex-col mt-6 mr-2 sm:flex-row justify-between p-4">
            <div className="mb-4 sm:mb-0 sm:mr-4 flex items-center">
              <form onSubmit={handleFormSubmit} className="relative">
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
            <div>
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
          </div>

          <div className="relative  min-w-[34.375rem] px-4  overflow-x-auto shadow-md sm:rounded-lg ">
          <div className="min-h-[450px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-blue-400 font-semibold">
                  <th scope="col" className="px-6 py-4" style={{ width: '50%' }}>
                    widget Name
                  </th>

                  <th scope="col" className="px-6 py-4"  style={{ width: '30%' }}>
                    widget Type
                  </th>

                  <th scope="col" className="px-6 py-4" style={{ width: '20%' }}>
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

                        ? "even:bg-gray-200 even:dark:bg-gray-800"
                        : "odd:bg-white odd:dark:bg-gray-900"
                    } border-b dark:border-gray-700`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {Widget.widget_name}
                    </th>

                    <td className="px-6 py-2">{Widget.widget_type}</td>

                    <td className=" px-6 py-2">
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
                            width: "18ch",
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
                         Delete</MenuItem>
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
            <div className="flex flex-row-reverse mb-[1rem]">
              <Pagination
                count={Math.ceil(widgets.length / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default index;
