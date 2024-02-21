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
import CreateWidgetTable from "../Components/Tabels/CreateWidgetTable";
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

  return (
    <div>
      <div
        onClick={handleButtonClick}
        className="rounded-2xl border-2 border-primary2 p-2 bottom-2 right-4 fixed cursor-pointer "
      >
        <AddIcon fontSize="medium" className="dark:text-textColor" />
      </div>
   

      <Drawer  anchor="right" open={isDrawerOpen} variant="persistent">
        <div className="container mx-auto h-[100%] sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl bg-light-container dark:bg-dark-container">
          <div className="flex border-b-2  justify-between py-3">
            <span className="px-4 font-bold dark:text-textColor">
              {" "}
              Add Widget
            </span>

            <CloseSharpIcon
              className="cursor-pointer mr-3 dark:text-textColor"
              onClick={handleDrawerClose}
            />
          </div>

          <div className="mt-6 pr-3 flex flex-row-reverse">         
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

          <div className="relative  min-w-[34.375rem] px-4 py-1  overflow-x-auto  rounded-lg ">
            {/* <div className="min-h-[450px] ">
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
                            Edit
                          </MenuItem>
                          <MenuItem>
            
                            Delete
                          </MenuItem>
                          <MenuItem>
                            {" "}
                 
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
            </div> */}
            <div className="w-full">
              <CreateWidgetTable />
              
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default index;
