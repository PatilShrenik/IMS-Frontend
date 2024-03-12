import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { getDeviceDetailsByID } from "@/pages/api/api/DeviceManagementAPI";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {
  replaceDotsWithUnderscores,
  replacePeriodsWithUnderscoresArrayOfObjects,
} from "@/functions/genericFunctions";
import DeviceDetailsObjectTable from "../Tabels/DeviceDetailsTable";
import CustomPagination from "../CustomePagination";
const DiscoveryContext = (props: any) => {
  const { open, handleModalClose, deviceIds } = props;
  const [data, setData] = useState() as any;
  //   console.log("device ids in modal", deviceIds);

  const [value, setValue] = React.useState(0) as any;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    const handlePageChange = (newPage: any) => {
      setCurrentPage(newPage);
      // Fetch data for the new page if needed
    };

    const handleRowsPerPageChange = (newRowsPerPage: any) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1); // Reset to the first page when changing rows per page
      // Fetch data for the new rowsPerPage if needed
    };

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  useEffect(() => {
    const getContext = async () => {
      let response = await getDeviceDetailsByID(deviceIds);
      const modifiedData = replaceDotsWithUnderscores(response.result);
      //   console.log("context data", response.result);
      setData(modifiedData);
    };
    getContext();
  }, [deviceIds, open]);

  const valuesArray = Object.values((data && data.objects) || {});

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [page, setPage] = React.useState(0);

  const [currentPage, setCurrentPage] = useState(1) as any;
  const [rowsPerPage, setRowsPerPage] = useState(10) as any;

  const totalCount = data && data.length;

  const handlePageChange = (newPage: any) => {
    setPage(newPage - 1);
    setCurrentPage(newPage);
    // Fetch data for the new page if needed
  };

  const handleRowsPerPageChange = (newRowsPerPage: any) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when changing rows per page
    setPage(0);
    // Fetch data for the new rowsPerPage if needed
  };

  return (
    <Dialog open={open} onClose={handleModalClose} fullScreen maxWidth="xl">
      <DialogTitle className="dark:bg-dark-container dark:text-textColor border-b border-b-dark-border">
        <div className="flex justify-between">
          <p>Device Details</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleModalClose}
          />
        </div>
      </DialogTitle>
      <DialogContent className="relative dark:bg-dark-container w-full h-full dark:text-textColor">
        <div className="w-full h-full bg-white py-4 text-center rounded-md dark:bg-dark-container">
          <div className="w-full flex mb-4 min-h-full">
            <div className="flex flex-col justify-start w-[27%] border-r-[1px] border-dark-border ">
              <div className="flex items-center  mx-2">
                <p className="flex text-lg  w-[11rem]">System Name</p>
                <p className="ml-2">:</p>
                <p className="ml-4">
                  {data && data.system_name ? data.system_name : "-"}
                </p>
              </div>
              <div className="flex items-center  mx-2">
                <p className="flex text-lg  w-[11rem]">System OID</p>
                <p className="ml-2">:</p>
                <p className="ml-4">
                  {data && data.system_oid ? data.system_oid : "-"}
                </p>
              </div>
              <div className="flex items-center mx-2">
                <p className="flex text-lg  w-[11rem]">System Location</p>
                <p className="ml-2">:</p>
                <p className="ml-4">
                  {data && data.system_location ? data.system_location : "-"}
                </p>
              </div>
              <div className="flex items-center mx-2">
                <p className="flex text-lg  w-[11rem]">System Description</p>
                <p className="ml-2">:</p>
                <Tooltip
                  placement="bottom"
                  title={
                    data && data.system_description
                      ? data.system_description
                      : "-"
                  }
                  arrow
                >
                  <p className="ml-4">
                    {/* {data && data.system_description} */}
                    {data && data.system_description
                      ? data.system_description.length > 25
                        ? `${data.system_description.slice(0, 25)}...`
                        : data.system_description
                      : "-"}
                  </p>
                </Tooltip>
              </div>
            </div>
            <div className="w-[73%] px-2">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  {valuesArray && (
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      {valuesArray.map((item: any, index: number) => {
                        return (
                          <Tab label={item} {...a11yProps(index)} key={index} />
                        );
                      })}
                    </Tabs>
                  )}
                </Box>
                {valuesArray &&
                  valuesArray.map((item: any, index: number) => {
                    // console.log(props.data[item]);
                    const valuesArray2 = Object.values(data[item]);

                    const modifiedData =
                      replacePeriodsWithUnderscoresArrayOfObjects(valuesArray2);
                    return (
                      <CustomTabPanel value={value} index={index} key={index}>
                        <DeviceDetailsObjectTable
                          data={modifiedData}
                          //   visibleColumns={visibleColumns}
                          //   setVisibleColumns={setVisibleColumns}
                          //   columns={columns}
                          page={page}
                          rowsPerPage={rowsPerPage}
                        />
                        {/* <div className="absolute bottom-0">
                          <CustomPagination
                            totalCount={totalCount}
                            rowsPerPage={rowsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                          />
                        </div> */}
                      </CustomTabPanel>
                    );
                  })}
              </Box>

              <button
                onClick={handleModalClose}
                className=" m-3 absolute right-0 bottom-0 border border-light3 font-normal py-1 px-4 rounded mb-2  dark:text-textColor"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscoveryContext;
