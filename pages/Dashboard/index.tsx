import React, { useState, useRef, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Button, Drawer, InputBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ClearIcon from "@mui/icons-material/Clear";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import AddWidgetDrawer from "../Components/SideDrawers/AddWidgetDrawer";
import { useWebSocketContext } from "../Components/WebSocketContext";
interface Widget {
  widget_name: string;
  widget_type: string;
}
const ITEMS_PER_PAGE = 10;
const index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const open = Boolean(anchorEl);
  const { Subscribe, emit, unsubscribe, connection } = useWebSocketContext();

  // function renderer(payload: any) {
  //   console.log("payload", payload);
  // }

  // useEffect(() => {
  //   if (connection) {
  //     Subscribe("1", "get.all", renderer);
  //     return () => {
  //       unsubscribe("1", "get.all");
  //     };
  //   }
  // }, [connection]);

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
    setSearch(event.target.value);
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
  const handleAddDrawerOpen = () => {
    setIsAddDrawerOpen(true);
    // handleDrawerClose();
  };

  const handleAddDrawerClose = () => {
    setIsAddDrawerOpen(false);
    //  setIsDrawerOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleButtonClick}
        className="rounded-2xl border-2 border-primary2 p-2 bottom-2 right-4 fixed cursor-pointer "
      >
        <AddIcon fontSize="medium" className="dark:text-textColor" />
      </div>

      <Drawer anchor="right" open={isDrawerOpen} variant="persistent">
        <div className="container h-full bg-light-container dark:bg-dark-container">
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
          <div className="px-4">
            <div className="flex  my-6 mr-2 justify-between items-center ">
              <div className="border items-center rounded-lg h-[2.3rem] dark:border-[#3C3C3C] border-[#CCCFD9] flex justify-end w-fit m-2 mt-3 dark:text-white">
                <IconButton>
                  <SearchIcon
                    className="dark:text-[#3C3C3C] text-[#CCCFD9] "
                    fontSize="small"
                  />
                </IconButton>
                <InputBase
                  className="dark:text-textColor"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                />
                {search != "" && (
                  <ClearIcon
                    className="dark:text-white border rounded-2xl"
                    fontSize="small"
                    sx={{ fontSize: "13px", marginRight: "3px" }}
                  />
                )}
              </div>

              <Tooltip
                className="text-lg font-bold"
                title="Create Widget"
                placement="top"
              >
                <Button
                  onClick={handleAddDrawerOpen}
                  variant="contained"
                  className="bg-primary3 capitalize h-fit items-center"
                  size="small"
                >
                  <AddIcon fontSize="small" className="mr-2" /> Widget
                </Button>
              </Tooltip>
            </div>
            <AddWidgetDrawer
              open={isAddDrawerOpen}
              handleAddDrawerClose={handleAddDrawerClose}
            />
            <div className="relative  min-w-[34.375rem] px-4 py-1 overflow-x-auto ">
              <div className="min-h-[450px] ">
                <table className="w-full border-collapse overflow-x-scroll">
                  <thead>
                    <tr className="bg-textColor  dark:bg-tabel-header dark:text-textColor">
                      <th scope="col" className="px-6 py-2 w-1/2">
                        Widget Name
                      </th>

                      <th scope="col" className="px-6 py-2 w-3/10">
                        Widget Type
                      </th>

                      <th scope="col" className="px-6 py-2 w-1/5">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedWidgets.map((Widget, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:bg-dark-container dark:text-textColor"
                      >
                        <td
                          scope="row"
                          className="bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border "
                        >
                          {Widget.widget_name}
                        </td>

                        <td className="bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ">
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
        </div>
      </Drawer>
    </div>
  );
};
export default index;
