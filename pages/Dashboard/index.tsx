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
import {
  GetDashboardWidgetsData,
  UpdateWidgetsData,
  getAllWidget,
} from "../api/api/DashboardWidgetsAPI";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";
import { useAppContext } from "../Components/AppContext";
import { WidgetMenu } from "./WidgetMenu";
import { ToastContainer } from "react-toastify";
import { WidthProvider, Responsive } from "react-grid-layout";
import DashboardGaugeWidget from "./DashboardWidgets/GaugeWidget";
import DashboardGridWidget from "./DashboardWidgets/GridWidget";
import LineChartDashboardComponent from "./DashboardWidgets/LineChart";
import PieChartDashboardComponent from "./DashboardWidgets/PieChart";
import "../../node_modules/react-resizable/css/styles.css";
import "../../node_modules/react-grid-layout/css/styles.css";

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
  const { getWidgetApiState } = useAppContext();
  const [widgets, setWidgets] = useState<any>();
  const [addToDashboard, setAddToDashboard] = useState<any>(0);
  const [layouts, setLayouts] = useState<any>([]);
  const [layoutsDummy, setLayoutsDummy] = useState<any>([]);
  const [layoutsCurrent, setLayoutsCurrent] = useState<any>([]);
  const [layoutsWholeData, setLayoutsWholeData] = useState<any>({});
  const [editable, setEditable] = useState(false);
  const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
  useEffect(() => {
    try {
      const getData = async () => {
        let response = await getAllWidget();
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        // console.log("device data", response.result);
        // console.log("modifiedData", modifiedData);
        // setData(modifiedData);
        // console.log("-----------data-----------", modifiedData);
        setWidgets(modifiedData);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [getWidgetApiState]);

  useEffect(() => {
    // console.log(addToDashboard)
    async function getWidgetData() {
      let id = "1000000000001";
      return await GetDashboardWidgetsData(id);
    }
    getWidgetData().then((res: any) => {
      console.log("res", res);
      res &&
        res.result &&
        res.result.widgets &&
        setLayoutsDummy(res.result.widgets);
      // setLayouts(res.result?.widgets ?? []);
      // setLayoutsCurrent(res.result?.widgets ?? []);
      // setLayoutsWholeData(res.result);
    });
  }, [addToDashboard]);
  // const widgets: Widget[] = [
  //   {
  //     widget_name: "Apple MacBook Pro 17",

  //     widget_type: "Laptop",
  //   },
  //   {
  //     widget_name: "Microsoft Surface Pro",

  //     widget_type: "Laptop PC",
  //   },
  //   {
  //     widget_name: "Mag",
  //     widget_type: "ds",
  //   },
  //   {
  //     widget_name: "Google ",
  //     widget_type: "ds",
  //   },

  //   {
  //     widget_name: "A",
  //     widget_type: "hdf",
  //   },
  //   {
  //     widget_name: "Afd",
  //     widget_type: "hdf",
  //   },
  //   {
  //     widget_name: "Adfgg",
  //     widget_type: "hdf",
  //   },
  //   {
  //     widget_name: " Pro 17",
  //     widget_type: "Bag",
  //   },
  //   {
  //     widget_name: "Surface Pro",
  //     widget_type: "chair",
  //   },
  //   {
  //     widget_name: "Mag",
  //     widget_type: "ds",
  //   },
  //   {
  //     widget_name: "Afd",
  //     widget_type: "hdf",
  //   },
  // ];

  console.log("layout dummy", layoutsDummy);
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

  const paginatedWidgets =
    widgets &&
    widgets.slice(
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
  function saveLayout() {
    setLayoutsCurrent(layouts);
    async function updateWidgetData() {
      let id = "1000000000001";
      let body = { ...layoutsWholeData, widgets: layouts };
      await UpdateWidgetsData(id, body);
    }
    updateWidgetData();
  }

  function discardLayout() {
    setLayouts(layoutsCurrent);
  }

  function onLayoutChange(layout: any, currentLayout: any) {
    setLayouts(currentLayout);
    // console.log("layouts - ", layouts);
  }

  function deleteReport(index: any) {
    let currentLayout = layouts;
    delete currentLayout[index];
    currentLayout = currentLayout.filter(Boolean);
    setLayouts(currentLayout);
    // const { [`${index}`], ...layoutsNewData } = x;
    // const { a, ...newLayouts } = widgets;
    console.log("layouts", currentLayout, index);
    // console.log("newLayouts", newLayouts);
  }
  return (
    <div>
      <ToastContainer />
      <div>
        <div className="text-xl border-b-2 border-slate-400 pb-2 px-4 mb-2 flex justify-between w-full items-end">
          <div>Dashboards</div>
          <div>
            {/* <button
              className="bg-blue-500 rounded p-2 ml-2 text-sm text-white"
              onClick={() => emit("get.all", {})}
            >
              Emit
            </button> */}
            {!editable && (
              <button
                className="bg-blue-500 rounded p-2 ml-2 text-sm text-white"
                onClick={() => setEditable(true)}
              >
                Edit Layout
              </button>
            )}
            {editable && (
              <button
                className="bg-blue-500 rounded p-2 ml-2 text-sm text-white"
                onClick={() => {
                  saveLayout();
                  setEditable(false);
                }}
              >
                Save Layout
              </button>
            )}
            {editable && (
              <button
                className="bg-red-500 rounded p-2 ml-2 text-sm text-white"
                onClick={() => {
                  discardLayout();
                  setEditable(false);
                }}
              >
                Discard Layout
              </button>
            )}
          </div>
        </div>

        {/* Content of your dashboard */}
        <div>
          <ResponsiveReactGridLayout
            className="layout"
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            isDraggable={editable}
            isResizable={editable}
            layouts={{ layouts }}
            onLayoutChange={(
              currentLayout: any,
              currentLayoutResponsive: any
            ) => onLayoutChange(currentLayout, currentLayout)}
          >
            {/* <div className="w-auto h-auto relative"> */}
            {layouts &&
              layouts?.map((data: any, index: any) => {
                return (
                  <div
                    key={layouts[index]?.i}
                    className=" bg-white rounded h-auto p-2 shadow-lg relative"
                    data-grid={{
                      w: data?.w,
                      h: data?.h,
                      x: data?.x,
                      y: data?.y,
                      minW: 4,
                      minH: 10,
                    }}
                  >
                    {editable && (
                      <span
                        onClick={() => deleteReport(index)}
                        className="bg-slate-900 z-[1000] text-xs cursor-pointer rounded-full absolute -right-2 -top-2 text-white flex justify-center items-center w-5 h-5"
                      >
                        X
                      </span>
                    )}
                    <div className="h-full overflow-auto">
                      {data?.i.split("/")[2] == "chart" && (
                        <LineChartDashboardComponent
                          id={data?.i.split("/")[3]}
                          keys={data?.i}
                        />
                      )}
                      {data?.i.split("/")[2] == "topN" && (
                        <PieChartDashboardComponent
                          id={data?.i.split("/")[3]}
                          keys={data?.i}
                        />
                      )}
                      {data?.i.split("/")[2] == "grid" && (
                        <DashboardGridWidget
                          id={data?.i.split("/")[3]}
                          keys={data?.i}
                        />
                      )}
                      {data?.i.split("/")[2] == "gauge" && (
                        <DashboardGaugeWidget
                          id={data?.i.split("/")[3]}
                          keys={data?.i}
                        />
                      )}
                    </div>
                  </div>
                  // </>
                );
              })}
          </ResponsiveReactGridLayout>
        </div>
        <div
          onClick={handleButtonClick}
          className="rounded-2xl border-2 border-primary2 p-2 bottom-2 right-4 fixed cursor-pointer "
        >
          <AddIcon fontSize="medium" className="dark:text-textColor" />
        </div>

        <Drawer anchor="right" open={isDrawerOpen} variant="persistent">
          <div className="container h-full bg-light-container dark:bg-dark-container">
            <div className="flex border-b  justify-between py-3">
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
                      {paginatedWidgets &&
                        paginatedWidgets.map((Widget: any, index: any) => (
                          <tr
                            key={index}
                            className="bg-white dark:bg-dark-container dark:text-textColor"
                          >
                            <td
                              scope="row"
                              className="bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border "
                            >
                              {Widget.name}
                            </td>

                            <td className="bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ">
                              {Widget.widget_type}
                            </td>

                            <td className="px-6 py-1 text-gray-900 whitespace-nowrap">
                              {/* <WidgetMenu
                                setAddToDashboard={setAddToDashboard}
                                id={Widget._id}
                                widgetType={Widget.widget_type || ""}
                              /> */}
                              hi
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-row-reverse ">
                  {/* <Pagination
                    count={Math.ceil(
                      widgets && widgets.length / ITEMS_PER_PAGE
                    )}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    className="mt-4 mb-4"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
export default index;
