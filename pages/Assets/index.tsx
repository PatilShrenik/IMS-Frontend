import React, { useState, useEffect } from "react";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";
import CustomPagination from "@/pages/Components/CustomePagination";
import { getAllDevice } from "../api/api/DeviceManagementAPI";
import AllDeviceTabel from "../Components/Tabels/AllDeviceTabel";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "../Components/AppContext";
import "react-toastify/dist/ReactToastify.css";
const Assets = () => {
  const { deviceTabelState } = useAppContext();

  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = useState<any>([]);

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
    try {
      const getData = async () => {
        let cols: any = [];
        let response = await getAllDevice();
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        console.log("modified 1", modifiedData);
        const indexOfObjectWithAvailabilityContext =
          modifiedData &&
          modifiedData.findIndex(
            (obj: any) => obj.availability_context !== undefined
          );
        let col = [] as any;
        // console.log("index value", indexOfObjectWithAvailabilityContext);
        if (
          indexOfObjectWithAvailabilityContext == -1 &&
          modifiedData.length != 0
        ) {
          // console.log("modified 2", modifiedData);
          col = Object.keys(modifiedData[0]);
        } else {
          col =
            modifiedData.length != 0 &&
            Object.keys(modifiedData[indexOfObjectWithAvailabilityContext]);
        }
        let filteredCols =
          col && col.filter((key: any) => !key.startsWith("_"));
        filteredCols =
          col &&
          col.filter(
            (key: any) => key !== "flow_enabled" && key != "last_discovered_on"
          );

        // console.log(filteredCols);
        filteredCols &&
          filteredCols.filter((key: any) => {
            if (!key.startsWith("_")) {
              if (key == "availability_context") {
                // cols.unshift({
                //   field: "icmp_availability",
                //   headerName: "icmp_Avl.",
                //   minWidth: 120,
                // });
                // cols.unshift({
                //   field: "plugin_availability",
                //   headerName: "plugin_Avl.",
                //   minWidth: 120,
                // });
                // cols.push({
                //   field: "timestamp",
                //   headerName: "timestamp",
                //   minWidth: 120,
                // });
              } else if (key == "hostname") {
                cols.unshift({
                  field: key.replace(/\./g, "_"),
                  headerName: "Hostname",
                  minWidth: 150,
                });
              }
              
              else if (key == "ip_address") {
                cols.push({
                  field: key.replace(/\./g, "_"),
                  headerName: "IP Address",
                  minWidth: 150,
                });
              }
              else if (key == "plugin_type") {
                cols.push({
                  field: key.replace(/\./g, "_"),
                  headerName: "plugin type",
                  minWidth: 150,
                });
              }
              
              else if (key == "device_status") {
                cols.push({
                  field: key.replace(/\./g, "_"),
                  headerName: "Status",
                  minWidth: 150,
                });
              }  else if (key == "alias") {
                cols.push({
                  field: key.replace(/\./g, "_"),
                  headerName: "Alias",
                  minWidth: 150,
                });
              } else if (key == "port") {
                cols.push({
                  field: key.replace(/\./g, "_"),
                  headerName: key.replace(/\./g, " "),
                  minWidth: 80,
                });
              } else if (key == "credential_profiles") {
                cols.push({
                  field: key.replace(/\./g, "_"),
                  headerName: key.replace(/\./g, " "),
                  minWidth: 200,
                });
              } else {
                cols.push({
                  field: key.replace(/\./g, "_"),
                  headerName: key.replace(/\./g, " "),
                  minWidth: 150,
                });
              }
            }
          });
          
        cols.push({
          field: "last_availability_checked_on",
          headerName: "Last Availability",
          minWidth: 250,
        });
        cols.push({
          field: "last_discovered_on",
          headerName: "Last Discovered On",
          minWidth: 250,
        });
        // const x = filteredCols && filteredCols.includes("availabilty_context");
        // if (x) {
        cols.unshift({
          field: "plugin_availability",
          headerName: "plugin_Avl.",
          minWidth: 120,
        });
        cols.unshift({
          field: "icmp_availability",
          headerName: "icmp_Avl.",
          minWidth: 120,
        });
        cols.push({
          field: "timestamp",
          headerName: "timestamp",
          minWidth: 120,
        });
        // }

        console.log("cols", cols);
        setColumns(cols);
        console.log("rows", modifiedData);
        const hiddenColumnsValues = [
           "alias",
          "discovery_schedulers",
          "country",
           "groups",
          "profile_type",
          "port",
          "credential_profiles",
          // "hostname",
          "availability_interval",
           "device_type",
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

        setData(modifiedData);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [deviceTabelState]);
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
        <AllDeviceTabel
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

export default Assets;
