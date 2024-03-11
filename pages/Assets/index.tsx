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
    setCurrentPage(newPage);
    // Fetch data for the new page if needed
  };

  const handleRowsPerPageChange = (newRowsPerPage: any) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when changing rows per page
    // Fetch data for the new rowsPerPage if needed
  };

  useEffect(() => {
    try {
      const getData = async () => {
        let cols: any = [];
        let response = await getAllDevice();
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        const indexOfObjectWithAvailabilityContext = modifiedData.findIndex(
          (obj: any) => obj.availability_context !== undefined
        );
        console.log("modifidData", indexOfObjectWithAvailabilityContext);
        const col = Object.keys(
          modifiedData[indexOfObjectWithAvailabilityContext]
        );
        let filteredCols = col.filter((key: any) => !key.startsWith("_"));
        filteredCols = col.filter((key: any) => key !== "flow_enabled");

        console.log(filteredCols);
        filteredCols.filter((key: any) => {
          if (!key.startsWith("_")) {
            if (key == "availability_context") {
              cols.unshift({
                field: "icmp_availability",
                headerName: "icmp_Avl.",
                minWidth: 120,
              });
              cols.unshift({
                field: "plugin_availability",
                headerName: "plugin_Avl.",
                minWidth: 120,
              });
              cols.push({
                field: "timestamp",
                headerName: "timestamp",
                minWidth: 120,
              });
            } else if (key == "hostname") {
              cols.unshift({
                field: key.replace(/\./g, "_"),
                headerName: "Host Name",
                minWidth: 150,
              });
            } else if (key == "ip_address") {
              cols.push({
                field: key.replace(/\./g, "_"),
                headerName: "IP Address",
                minWidth: 150,
              });
            } else if (key == "alias") {
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
        const x = filteredCols.includes("availabilty_context");
        if (x) {
          cols.unshift({
            field: "icmp_availability",
            headerName: "icmp_Avl.",
            minWidth: 120,
          });
          cols.unshift({
            field: "plugin_availability",
            headerName: "plugin_Avl.",
            minWidth: 120,
          });
          cols.push({
            field: "timestamp",
            headerName: "timestamp",
            minWidth: 120,
          });
        }
        cols.push({
          field: "last_availability_on",
          headerName: "Last Available On",
          minWidth: 120,
        });
        cols.push({
          field: "last_availability_checked_on",
          headerName: "Last Availability checked On",
          minWidth: 250,
        });
        console.log("cols", cols);
        setColumns(cols);
        console.log("rows", modifiedData);
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
