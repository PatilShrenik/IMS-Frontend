import React, { useState, useRef, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Button, Drawer, InputBase, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import ClearIcon from "@mui/icons-material/Clear";

import SearchIcon from "@mui/icons-material/Search";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import SpeedIcon from "@mui/icons-material/Speed";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import AddWidgetDrawer from "../Components/SideDrawers/AddWidgetDrawer";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useAppContext } from "../Components/AppContext";
import { useWebSocketContext } from "../Components/WebSocketContext";
import {
  CreateDashboard,
  EditDashboard,
  GetAllDashboard,
  GetDashboardWidgetsData,
  UpdateWidgetsData,
  deleteDashboard,
  getAllWidget,
} from "../api/api/DashboardWidgetsAPI";
import {
  replacePeriodsWithUnderscores,
  replaceUnderscoresWithDots,
} from "@/functions/genericFunctions";
import { ToastContainer, toast } from "react-toastify";
import { WidthProvider, Responsive } from "react-grid-layout";
import DashboardGaugeWidget from "./DashboardWidgets/GaugeWidget";
import DashboardGridWidget from "./DashboardWidgets/GridWidget";
import LineChartDashboardComponent from "./DashboardWidgets/LineChart";
import PieChartDashboardComponent from "./DashboardWidgets/PieChart";
import "../../node_modules/react-resizable/css/styles.css";
import "../../node_modules/react-grid-layout/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import WidgetMenu from "../Components/ActionMenu/WIdgetsMenu";
import CustomPagination from "../Components/CustomePagination";
import TimeRangePicker from "../Components/TimeRnangePicker";
import SingleSelect from "../Components/Selects";
import SecSingleSelect from "../Components/Selects/secSelect";
import CustomeInput from "../Components/Inputs";
import CustomeButton, { CustomeCancelButton } from "../Components/Buttons";
import SecSingleSelectForDashboard from "../Components/Selects/secSelectForDashboard";
import DeleteModal from "../Components/Modals/DeleteModal";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface Widget {
  widget_name: string;
  widget_type: string;
}
const ITEMS_PER_PAGE = 10;
const index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1) as any;
  const [rowsPerPage, setRowsPerPage] = useState(10) as any;
  const [page, setPage] = React.useState(0);
  const { Subscribe, emit, unsubscribe, connection } = useWebSocketContext();
  const { getWidgetApiState } = useAppContext();
  const [widgets, setWidgets] = useState<any>();
  const [data, setData] = useState({});
  const [editable, setEditable] = useState(false);
  const [layouts, setLayouts] = useState<any>([]);
  const [isModalopen, setIsModalOpen] = React.useState(false);
  const [isEditModalopen, setIsEditModalopen] = React.useState(false);
  const [layoutsCurrent, setLayoutsCurrent] = useState<any>([]);
  const [layoutsWholeData, setLayoutsWholeData] = useState<any>({});
  const [addToDashboard, setAddToDashboard] = useState<any>(0);
  const [dashboards, setDashboards] = useState<any>([]);
  const [dashboardId, setDashboardId] = useState<any>(1000000000001);
  const [dashboardDeleteId, setDashboardDeleteId] = useState<any>();
  const [dashboardName, setDashBoardName] = useState("") as any;
  const [editdashboardName, setEditDashBoardName] = useState("") as any;
  const [editdashboardIID, setEditDashBoardID] = useState("") as any;
  const [isDeleteModalopen, setIsDeleteModalOpen] = React.useState(false);
  const [isContextModalopen, setIsContextModalOpen] = React.useState(false);
  const handleDeleteModalOpen = (value: any) => {
    setIsDeleteModalOpen(true);
    setDashboardDeleteId(value);
    // console.log("value$$$$$$$", value);
  };
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);
  useEffect(() => {
    try {
      const getData = async () => {
        let response = await getAllWidget();
        const modifiedData =
          response &&
          replacePeriodsWithUnderscores(response && response.result);
        setWidgets(modifiedData);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [getWidgetApiState]);

  useEffect(() => {
    try {
      const getDashboards = async () => {
        let response = await GetAllDashboard();
        const modifiedData =
          response &&
          replacePeriodsWithUnderscores(response && response.result);
        setDashboards(modifiedData);
      };
      getDashboards();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const dashboardValues =
  //   dashboards &&
  //   dashboards.map((item: any) => ({
  //     name: item.name,
  //     id: item._id,
  //   }));
  const dashboardValues =
    dashboards &&
    dashboards.flatMap((item: any) => ({
      name: item.name,
      id: item._id,
    }));

  useEffect(() => {
    async function getWidgetData() {
      // let id = "1000000000001";
      return await GetDashboardWidgetsData(dashboardId);
    }
    getWidgetData().then((res: any) => {
      setLayouts(res && res.result && res.result.widgets && res.result.widgets);
      setLayoutsCurrent(
        res && res.result && res.result.widgets && res.result.widgets
      );
      setLayoutsWholeData(res.result);
    });
  }, [addToDashboard, dashboardId]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    // handleClose();
  };
  const handleModalClose = () => setIsModalOpen(false);

  const handleEditModalOpen = (id: any, name: any) => {
    setIsEditModalopen(true);
    // console.log("value&&&&&&&edit", id, name);
    setEditDashBoardID(id);
    setEditDashBoardName(name);
  };

  const handleEditModalClose = () => setIsEditModalopen(false);

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setDashBoardName(value);
  };

  const handleEditInputChange = (event: any) => {
    const { value } = event.target;
    setEditDashBoardName(value);
  };
  // console.log("layout dummy", layoutsDummy);
  const handleButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handlePageChange = (newPage: any) => {
    setPage(newPage - 1);
    setCurrentPage(newPage);
    setPage(newPage - 1);
    // Fetch data for the new page if needed
  };
  // console.log("current page", currentPage);
  const handleRowsPerPageChange = (newRowsPerPage: any) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when changing rows per page
    setPage(0);
    // Fetch data for the new rowsPerPage if needed
  };

  const handleAddDrawerOpen = () => {
    setIsAddDrawerOpen(true);
    // handleDrawerClose();
  };

  const handleAddDrawerClose = () => {
    setIsAddDrawerOpen(false);
    //  setIsDrawerOpen(false);
  };

  function onLayoutChange(layout: any, currentLayout: any) {
    console.log("current layout event", currentLayout);
    setLayouts(currentLayout);
  }

  function deleteReport(index: any) {
    let currentLayout = layouts;
    delete currentLayout[index];
    currentLayout = currentLayout.filter(Boolean);
    setLayouts(currentLayout);
  }
  function saveLayout() {
    setLayoutsCurrent(layouts);
    async function updateWidgetData() {
      // let id = "1000000000001";
      let body = { ...layoutsWholeData, widgets: layouts };
      // body = { ...layoutsWholeData, widgets: data };
      // console.log("body data", body);
      await UpdateWidgetsData(dashboardId, body);
    }
    updateWidgetData();
  }
  useEffect(() => {
    console.log("dashboard saved");
    saveLayout();
  }, [layouts, data]);

  function discardLayout() {
    setLayouts(layoutsCurrent);
  }

  const handleDashChange = (event: any) => {
    console.log("value######", event);
    if (event.target.value == "Add Dashboard") {
      handleModalOpen();
    } else {
      setDashboardId(event?.target.value);
    }
  };

  const handleDelete = () => {
    console.log("value in delete", dashboardDeleteId);
    try {
      const DeleteDashboard = async () => {
        let response = await deleteDashboard(dashboardDeleteId);
        if (response.status === "success") {
          toast.success(response.status, {
            position: "bottom-right",
            autoClose: 1000,
          });
          handleDeleteModalClose();
        } else {
          toast.error(response.message, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
        // toggleWidgetApiState();
      };
      DeleteDashboard();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (value: any) => {
    console.log("value in Edit", value);
  };

  const handleDate = (event: any) => {
    // console.log("date event", event);
    let updatedPayload: any = { ...data };

    if (event.label !== "custom") {
      delete updatedPayload.start_timestamp;
      delete updatedPayload.end_timestamp;
      updatedPayload = {
        ...updatedPayload,
        time_range: event.text,
      };
    } else {
      const startdate = new Date(event.value[0]);
      const startepochTime = startdate.getTime() / 1000;
      const enddate = new Date(event.value[1]);
      const endepochTime = enddate.getTime() / 1000;
      updatedPayload = {
        ...updatedPayload,
        time_range: event.text,
        start_timestamp: startepochTime,
        end_timestamp: endepochTime,
      };
    }
    // console.log("updated payload", updatedPayload);
    setData(updatedPayload);
  };
  const totalCount = widgets && widgets.length;

  const handleSave = () => {
    const APIdata = {
      name: dashboardName,
    };
    try {
      const addDashboard = async () => {
        const modifiedData = replaceUnderscoresWithDots(APIdata);
        console.log("Dashboard Data", modifiedData);

        let response = await CreateDashboard(modifiedData);
        if (response.status === "success") {
          toast.success(response.status, {
            position: "bottom-right",
            autoClose: 1000,
          });
          handleModalClose();
        } else {
          toast.error(response.message, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
        // toggleWidgetApiState();
      };
      addDashboard();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditSave = () => {
    const APIdata = {
      name: editdashboardName,
    };
    try {
      const editDashboard = async () => {
        const modifiedData = replaceUnderscoresWithDots(APIdata);
        console.log("Dashboard Data", modifiedData);

        let response = await EditDashboard(modifiedData, editdashboardIID);
        if (response.status === "success") {
          toast.success(response.status, {
            position: "bottom-right",
            autoClose: 1000,
          });
          handleEditModalClose();
        } else {
          toast.error(response.message, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
        // toggleWidgetApiState();
      };
      editDashboard();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div>
        <div className="text-xl border-b-2 border-slate-400 pb-2 px-2 mb-2 flex justify-between w-full items-center">
          <div className="-ml-2">
            <SecSingleSelectForDashboard
              label="Select Dashboard"
              value={dashboardId}
              selectData={dashboardValues}
              onChange={handleDashChange}
              require={true}
              onDash={true}
              handleEdit={handleEditModalOpen}
              handleDelete={handleDeleteModalOpen}
            />
          </div>
          <div>
            <div className="flex space-x-4">
              <div className="mx-8">
                <TimeRangePicker onTimeRangeChange={handleDate} />
              </div>

              {!editable && (
                <button
                  className="bg-blue-500 rounded p-2 ml-2 text-sm text-white"
                  onClick={() => setEditable(!editable)}
                >
                  <LockOpenOutlinedIcon />
                </button>
              )}
              {editable && (
                <button
                  className="bg-blue-500 rounded p-2 ml-2 text-sm text-white"
                  onClick={() => {
                    saveLayout();
                    setEditable(!editable);
                  }}
                >
                  <LockOutlinedIcon />
                </button>
              )}
			  
            </div>
            <DeleteModal
              open={isDeleteModalopen}
              handleModalClose={handleDeleteModalClose}
              deleteRow={handleDelete}
            />
            {/* {editable && (
              <button
                className="bg-red-500 rounded p-2 ml-2 text-sm text-white"
                onClick={() => {
                  discardLayout();
                  setEditable(!editable);
                }}
              >
                Discard Layout
              </button>
            )} */}
          </div>
        </div>
        <div className="mt-[2rem]">
          <ResponsiveReactGridLayout
            className="layout"
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            isDraggable={editable}
            isResizable={editable}
            layouts={{ layouts }}
            onLayoutChange={(currentLayout, currentLayoutResponsive) =>
              onLayoutChange(currentLayout, currentLayout)
            }
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
          className="rounded-[50%] shadow-sm border-2 border-primary2 bg-primary2 p-1 bottom-2 right-4 fixed cursor-pointer "
        >
          <AddIcon fontSize="large" className="text-textColor" />
        </div>

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          variant="persistent"
          className="dark:border-l-0"
        >
          <div className="container h-full bg-white dark:bg-dark-container">
            <div className="flex border-b  justify-between py-3">
              <span className="px-4 font-bold  text-primary2"> Add Widget</span>

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
              <div className="relative  px-4 py-1 overflow-x-auto ">
                <div className="min-h-[450px] ">
                  <table className="w-full border-collapse overflow-x-scroll">
                    <thead>
                      <tr className="bg-textColor  dark:bg-tabel-header dark:text-textColor">
                        <th scope="col" className="px-2 py-2 ">
                          Widget Name
                        </th>

                        <th scope="col" className="px-2 py-2 0">
                          Widget Description
                        </th>
                        <th scope="col" className="px-2 py-2 0">
                          Widget Type
                        </th>

                        <th scope="col" className="px-2 py-2 ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {widgets &&
                        widgets
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row: any, index: any) => (
                            <tr
                              key={index}
                              className="bg-white dark:bg-dark-container dark:text-textColor"
                            >
                              <td
                                scope="row"
                                className="bg-white text-center dark:bg-dark-container dark:text-textColor dark:border-dark-border "
                              >
                                {row.name}
                              </td>

                              <td className="bg-white text-center dark:bg-dark-container dark:text-textColor dark:border-dark-border ">
                                {row.description ? row.description : "-"}
                              </td>
                              <td className="bg-white text-center dark:bg-dark-container dark:text-textColor dark:border-dark-border ">
                                {row.widget_type == "chart" ? (
                                  <SsidChartIcon />
                                ) : row.widget_type == "topN" ||
                                  row.widget_type == "grid" ? (
                                  <TableChartOutlinedIcon />
                                ) : (
                                  <SpeedIcon />
                                )}
                              </td>

                              <td className="px-6 py-1 text-gray-900 whitespace-nowrap">
                                <WidgetMenu
                                  setAddToDashboard={setAddToDashboard}
                                  id={row._id && row._id}
                                  widget_type={
                                    row.widget_type && row.widget_type
                                  }
                                  dahboardID={dashboardId}
                                />
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
                <div className="fixed bottom-0 ">
                  <CustomPagination
                    totalCount={totalCount}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
      <Modal open={isModalopen} onClose={handleModalClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 max-w-md text-center rounded-md dark:bg-tabel-row">
          <div className="flex w-full">
            <p className="text-xl">Create New Dashboard</p>
          </div>
          <div>
            <CustomeInput
              label="Name"
              name="name"
              value={dashboardName}
              onChange={handleInputChange}
              type="text"
              require={true}
            />
          </div>
          <div className="right-0 flex justify-end mt-6">
            <div onClick={handleSave}>
              <CustomeButton title="Create" />
            </div>
            <div onClick={handleModalClose}>
              <CustomeCancelButton title="Cancel" />
            </div>
          </div>
          {/* <button
            onClick={handleModalClose}
            className=" border border-light3 font-normal py-1 px-4 rounded mb-2  dark:text-textColor"
          >
            Cancel
          </button> */}
        </div>
      </Modal>
      <Modal open={isEditModalopen} onClose={handleEditModalClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 max-w-md text-center rounded-md dark:bg-tabel-row">
          <div className="flex w-full">
            <p className="text-xl">Edit Dashboard</p>
          </div>
          <div>
            <CustomeInput
              label="Name"
              name="name"
              value={editdashboardName}
              onChange={handleEditInputChange}
              type="text"
              require={true}
            />
          </div>
          <div className="right-0 flex justify-end mt-6">
            <div onClick={handleEditSave}>
              <CustomeButton title="Update" />
            </div>
            <div onClick={handleEditModalClose}>
              <CustomeCancelButton title="Cancel" />
            </div>
          </div>
          {/* <button
            onClick={handleModalClose}
            className=" border border-light3 font-normal py-1 px-4 rounded mb-2  dark:text-textColor"
          >
            Cancel
          </button> */}
        </div>
      </Modal>
    </div>
  );
};
export default index;
