import React, { useState, useEffect } from "react";
import {
  replaceDotsWithUnderscores,
  replacePeriodsWithUnderscores,
} from "@/functions/genericFunctions";
import CustomPagination from "@/pages/Components/CustomePagination";
import { getAllDevice } from "../api/api/DeviceManagementAPI";
import AllDeviceTabel from "../Components/Tabels/AllDeviceTabel";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "../Components/AppContext";
import "react-toastify/dist/ReactToastify.css";
import AlertTable from "../Components/Tabels/AlertTable";
import { useWebSocketContext } from "../Components/WebSocketContext";
const Alerts = () => {
  const { deviceTabelState, activeButton, toggleActiveButton } =
    useAppContext();
  const { Subscribe, emit, connection } = useWebSocketContext();

  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = useState<any>([]);
  const [receivedData, setReceivedData] = React.useState<any>({
    result: {
      "P1225151828844040-D641660281176464-O21": {
        _id: 1225151828844075,
        severity: "critical",
        policy: 1225151828844040,
        device: 641660281176464,
        object: "21",
        indicator: "cpu.5sec.avg.percentage",
        "triggered.value": 19,
        status: "active",
        message:
          "critical! 641660281176464's 21 [cpu.5sec.avg.percentage] has 2 occurrences in 300 seconds",
        timestamp: 1710851085,
        "previous.status": "warning",
        "event.type": "notify.alert.state.change",
      },
      "P1225151828844040-D641660281176464-O22": {
        _id: 1225151828844081,
        severity: "critical",
        policy: 1225151828844040,
        device: 641660281176464,
        object: "22",
        indicator: "cpu.5sec.avg.percentage",
        "triggered.value": 28,
        status: "active",
        message:
          "critical! 641660281176464's 22 [cpu.5sec.avg.percentage] has 2 occurrences in 300 seconds",
        timestamp: 1710851175,
      },
    },
    "event.type": "ws.alert.live",
  });

  const [currentPage, setCurrentPage] = useState(1) as any;
  const [rowsPerPage, setRowsPerPage] = useState(10) as any;

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

  useEffect(() => {
    if (activeButton == "live") {
      emit("ws.alert.live", {});
    }
  }, [activeButton]);

  console.log("activbutton", activeButton);

  function render(payload: any) {
    // console.log("live alert", payload.result);
    console.log("recieved data", payload);
    setReceivedData(payload.result);
  }

  useEffect(() => {
    if (connection && activeButton == "historic") {
      Subscribe("history1", "ws.alert.explorer", render);
    } else if (connection && activeButton == "live") {
      Subscribe("liveData1", "ws.alert.live", render);
    }
  }, [connection, activeButton]);
  function convertKeys(obj: any) {
    const newObj: any = {};
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey: any = key.replace(/\./g, "_");
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          newObj[newKey] = convertKeys(obj[key]);
        } else {
          newObj[newKey] = obj[key];
        }
      }
    }
    return newObj;
  }
  function collectUniqueKeys(data: any) {
    const uniqueKeys = new Set();

    // Iterate over each object in the result
    for (const objKey in data.result) {
      const nestedObj = data.result[objKey];
      for (const key in nestedObj) {
        if (!key.startsWith("_")) {
          uniqueKeys.add(key);
        }
      }
    }

    return Array.from(uniqueKeys);
  }
  useEffect(() => {
    try {
      const getData = async () => {
        let cols: any = [];
        // let response = await getAllDevice();
        const modifiedData = convertKeys(receivedData);
        // console.log("modified 1", modifiedData);
        // const indexOfObjectWithAvailabilityContext =
        //   modifiedData &&
        //   modifiedData.result.findIndex(
        //     (obj: any) => obj.availability_context !== undefined
        //   );
        // let col = [] as any;
        // console.log("index value", indexOfObjectWithAvailabilityContext);
        // if (
        //   indexOfObjectWithAvailabilityContext == -1 &&
        //   modifiedData.length != 0
        // ) {
        //   // console.log("modified 2", modifiedData);
        //   col = Object.keys(modifiedData[0]);
        // } else {
        //   col =
        //     modifiedData.length != 0 &&
        //     Object.keys(modifiedData[indexOfObjectWithAvailabilityContext]);
        // }
        let col = [] as any;
        // col = Object.keys(modifiedData["result"]);
        let collectedKeys = collectUniqueKeys(modifiedData);
        // console.log("------------------------keys", collectedKeys);

        // filteredCols = col && col.filter((key: any) => key !== "flow_enabled");

        // console.log("columns-------------", cols);
        // console.log("filtercolumns-------------", modifiedData.result);
        const resultArray = [];

        for (const key in modifiedData.result) {
          resultArray.push(modifiedData.result[key]);
        }

        // console.log("final data-----------", resultArray);
        collectedKeys &&
          collectedKeys.filter((key: any) => {
            // if (!key.startsWith("_")) {

            cols.push({
              field: key.replace(/\./g, "_"),
              headerName: key.replace(/\./g, " "),
              minWidth: 150,
            });
            // }
            // }
          });

        // }

        // console.log("cols------", cols);
        setColumns(cols);
        // console.log("rows", modifiedData);
        const hiddenColumnsValues = [
          // "alias",
          "discovery_schedulers",
          "country",
          // "groups",
          "profile_type",
          "port",
          "credential_profiles",
          // "hostname",
          "availability_interval",
          // "flow_enabled",
          "auto_provision",
          "location",
          "site",
          "site_code",
          "device_name",
          "service",
          "latitude",
          "oem",
          "os",
          "os_version",
          "vendor",
          "check_without_save",
          "device_list",
          "longitude",
          "created_by",
          "created_on",
          "updated_by",
          "updated_on",
          "timestamp",
          "timezone",
          "valid_credential_profile",
          // "last_discovered_on",
        ];

        setVisibleColumns(
          cols
            .map((column: any) => column.field)
            .filter((field: any) => !hiddenColumnsValues.includes(field))
        );

        setData(resultArray);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [activeButton, receivedData]);

  const totalCount = data && data.length;
  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full ">
        {/* <PageHeading heading="Credential Profile" /> */}
        <AlertTable
          data={data}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
        />
        <div
          style={{
            position: "fixed",
            bottom: 0,
            backgroundColor: "#fff", // Set your desired background color
            zIndex: 0, // Adjust the z-index as needed
          }}
        >
          <CustomPagination
            totalCount={totalCount}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
          {/* <TablePagination
            className="bg-light-container dark:bg-dark-container dark:text-textColor pt-12"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data && data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Alerts;
