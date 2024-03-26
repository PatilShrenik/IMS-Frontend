import React, { useState, useEffect } from "react";

import {
  replaceDotWithUnderscore2,
  replaceDotsWithUnderscores,
  replaceDotsWithUnderscoresSec,
  replacePeriodsWithUnderscores,
  replacePeriodsWithUnderscoresnested,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import CustomPagination from "@/pages/Components/CustomePagination";
import { useAppContext } from "@/pages/Components/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DiscoverySchedularTable from "@/pages/Components/Tabels/DiscoverySchedularTable";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
const DiscoverySchedular = () => {
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1) as any;
  const [rowsPerPage, setRowsPerPage] = useState(10) as any;
  const { themeSwitch, getDisSchedApiState } = useAppContext();

  useEffect(() => {
    try {
      const getData = async () => {
        let cols: any = [];
        let response = await getAllDiscoverySch();
        const modifiedData = replaceDotsWithUnderscores( response && response.result);
        

        //const col = modifiedData && modifiedData[0] && Object.keys(modifiedData[0]);
        const indexOfObjectWithEmail =
        modifiedData &&
        modifiedData.findIndex((obj: any) => obj.email !== undefined);
      let col = [] as any;
      if (indexOfObjectWithEmail == -1 && modifiedData.length != 0) {
        col = Object.keys(modifiedData[0]);
      } else {
        col =
          modifiedData.length != 0 &&
          Object.keys(modifiedData[indexOfObjectWithEmail]);
      }
        const filteredCols = col && col.filter((key: any) => !key.startsWith("_") && key !== "scheduler_context" && key !== "scheduler" && key !== "device_ids"  && key !== "entities");
   //     console.log("filtered cols----------------", filteredCols);

   filteredCols &&  filteredCols.filter((key: any) => {
          if (!key.startsWith("_")) {
            if (key == "entity_type") {
              cols.push({
                field: "entity_type",
                headerName: "Entity type",
                minWidth: 150,
              });
            } else if (key == "name") {
              cols.unshift({
                field: "name",
                headerName: "Name",
                minWidth: 80,
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
      //  console.log("cols", cols);
        setColumns(cols);

        const hiddenColumnsValues = [
          "entities",
          "scheduler",
          "created_by",
          "message",
          "created_on",
          "device_ids",
          "updated_on",
          "updated_by",
          "scheduler_context",
        ];

        setVisibleColumns(
        cols &&  cols
            .map((column: any) => column.field)
            .filter((field: any) => !hiddenColumnsValues.includes(field))
        );

        setData(modifiedData);
      
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [getDisSchedApiState]);
  const totalCount = data && data.length;
  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
    setPage(newPage - 1);
    // Fetch data for the new page if needed
  };

  const handleRowsPerPageChange = (newRowsPerPage: any) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    setPage(0); // Reset to the first page when changing rows per page
    // Fetch data for the new rowsPerPage if needed
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
        <DiscoverySchedularTable
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

export default DiscoverySchedular;
