import React, { useState, useEffect } from "react";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";
import CustomPagination from "@/pages/Components/CustomePagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "@/pages/Components/AppContext";
import { getAllSNMPTemp } from "@/pages/api/api/SNMPTemplateAPI";
import SNMPTemplateTabel from "@/pages/Components/Tabels/SNMPTemplateTabel";
const SNMPTemp = () => {
  const { getSNMPTempApiState } = useAppContext();

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
  console.log("current page", currentPage);
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
        let response = await getAllSNMPTemp();
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        console.log("modified 1", modifiedData);
        // const col = Object.keys(modifiedData[0]);
        const indexOfObjectWithName =
          modifiedData &&
          modifiedData.findIndex((obj: any) => obj.description !== undefined);
        let col = [] as any;
        console.log("index value", indexOfObjectWithName);
        if (indexOfObjectWithName == -1 && modifiedData.length != 0) {
          console.log("modified 2", modifiedData);
          col = Object.keys(modifiedData[0]);
        } else {
          col =
            modifiedData.length != 0 &&
            Object.keys(modifiedData[indexOfObjectWithName]);
        }
        let filteredCols =
          col &&
          col.filter(
            (key: any) =>
              key !== "scalar_oid" && key !== "objects" && key != "_id"
          );

        console.log("filtered cols", filteredCols);
        filteredCols.filter((key: any) => {
          if (key) {
            if (key == "name") {
              cols.push({
                field: "name",
                headerName: "Name",
                minWidth: 110,
              });
            } else if (key == "description") {
              cols.push({
                field: "description",
                headerName: "Description",
                minWidth: 110,
              });
            } else {
              cols.push({
                field: key.replace(/\./g, "_"),
                headerName: key.replace(/\./g, " "),
                minWidth: 110,
              });
            }
          }
        });

        console.log("cols", filteredCols);
        setColumns(cols);
        console.log("rows", modifiedData);
        const hiddenColumnsValues = [
          "id",
          "created_by",
          "created_on",
          "_type",
          "updated_on",
          "updated_by",
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
  }, [getSNMPTempApiState]);
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
        <SNMPTemplateTabel
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

export default SNMPTemp;
