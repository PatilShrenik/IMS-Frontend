import React, { useState, useEffect } from "react";
import PageHeading from "@/pages/Components/PageHeading";
import CredntialProfileTable from "@/pages/Components/Tabels/CredentialProfileTabel";
import TablePagination from "@mui/material/TablePagination";
import { getAllCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";
import CustomPagination from "@/pages/Components/CustomePagination";
import { useAppContext } from "@/pages/Components/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PoliciesTable from "@/pages/Components/Tabels/PoliciesTable";
import { getAllPolicy } from "@/pages/api/api/PolicyApi";

const Policy = () => {
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1) as any;
  const [rowsPerPage, setRowsPerPage] = useState(10) as any;
  const { getPolicyApiState } = useAppContext();
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

  useEffect(() => {
    try {
      const getData = async () => {
        let cols: any = [];
        let response = await getAllPolicy();
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        // console.log("modifidData", modifiedData);
        const col =
          modifiedData && modifiedData[0] && Object.keys(modifiedData[0]);
        // const filteredCols = col.filter((key: any) => !key.startsWith("_"));
        console.log("col in table", col);
        col &&
          col.filter((key: any) => {
            if (key != "_type") {
              if (key == "alert_context") {
                cols.push({
                  field: "occurrence",
                  headerName: "Occurences",
                  minWidth: 80,
                });
              } else if (key == "policy_context") {
                cols.push({
                  field: "indicator",
                  headerName: "Indicator",
                  minWidth: 150,
                });
                cols.push({
                  field: "operator",
                  headerName: "Operator",
                  minWidth: 150,
                });
              } else if (key == "threshold") {
                cols.push({
                  field: "threshold",
                  headerName: "Threshold",
                  minWidth: 150,
                });
              } 
              // else if (key == "notification_context") {
              //   cols.push({
              //     field: "email.recipients",
              //     headerName: "Email",
              //     minWidth: 150,
              //   });
              // } 
              else {
                cols.push({
                  field: key.replace(/\./g, "_"),
                  headerName: key.replace(/\./g, " "),
                  minWidth: 110,
                });
              }
            }
          });

        // console.log("cols", cols);
        setColumns(cols);
        // console.log("rows", modifiedData);
        const hiddenColumnsValues = [
          "entity_type",
          "notification_context",
          "Email",
          "auto_clear_unit",
          "auto_clear_sec",
          "time_frame_unit",
          "time_frame_sec",
          "object_type",
          "created_by",
          "created_on",
          "updated_by",
          "updated_on",
        ];

        cols &&
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
  }, [getPolicyApiState]);
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
      <div className="w-full">
        {/* <PageHeading heading="Credential Profile" /> */}
        <PoliciesTable
          data={data}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
        />
        <div
          style={{
            // width: "100%",
            position: "fixed",
            bottom: 0,
            // left: 0,
            // right: 0,
            // marginRight : "17rem",
            // borderTop: "1px solid",
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

export default Policy;
