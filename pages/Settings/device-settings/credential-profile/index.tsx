import React, { useState, useEffect } from "react";
import PageHeading from "@/pages/Components/PageHeading";
import CredntialProfileTable from "@/pages/Components/Tabels/CredentialProfileTabel";
import TablePagination from "@mui/material/TablePagination";
import { getAllCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";

const CredentialProfile = () => {
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleColumns, setVisibleColumns] = useState<any>([]);
  useEffect(() => {
    try {
      const getData = async () => {
        let cols: any = [];
        let response = await getAllCredsProfile();
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        console.log("modifidData", modifiedData);
        const col = Object.keys(modifiedData[0]);
        const filteredCols = col.filter((key: any) => !key.startsWith("_"));
        console.log("filtered cols", filteredCols);
        filteredCols.filter((key: any) => {
          if (!key.startsWith("_")) {
            if (key == "credential_context") {
              cols.push({
                field: "snmp_community",
                headerName: "SNMP Comm.",
                minWidth: 80,
              });
              cols.push({
                field: "snmp_version",
                headerName: "SNMP Version",
                minWidth: 80,
              });
            } else if (key == "device_ids") {
              cols.push({
                field: "device_ids",
                headerName: "Devices",
                minWidth: 150,
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

        console.log("cols", cols);
        setColumns(cols);
        console.log("rows", modifiedData);
        const hiddenColumnsValues = [
          "snmp_community",
          "snmp_version",
          "created_by",
          "created_on",
          "updated_by",
          "updated_on",
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
  }, []);
  
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
      <div className="w-full">
        {/* <PageHeading heading="Credential Profile" /> */}
        <CredntialProfileTable
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
            // left: 0,
            right: 0,
            backgroundColor: "#fff", // Set your desired background color
            zIndex: 1000, // Adjust the z-index as needed
          }}
        >
          <TablePagination
            className="bg-light-container dark:bg-dark-container dark:text-textColor pt-12"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data && data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default CredentialProfile;
