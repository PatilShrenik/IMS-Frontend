import { InputBase } from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "rsuite";

const DeviceDetailsObjectTable = (props: any) => {
  const {
    data,

    page,
    rowsPerPage,
  } = props;
  const visibleColumns = [
    "interface",
    "interface_address",
    "interface_alias",
    "interface_bit_type",
    "interface_description",
    "interface_name",
    "interface_speed_bytes_per_sec",
    "interface_type",
    "status",
  ];
  const [search, setSearch] = useState("");
  let columns: any = [];
  if (data && data.length > 0) {
    columns = Object.keys(data[0]);
    // Now you can use 'columns' in your code
  } else {
    // Handle the case when 'data' is undefined or empty
    console.error("Data is undefined or empty.");
  }

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };
  const filteredData =
    data &&
    data.filter((row: any) => {
      const matchesSearch = visibleColumns.some(
        (columnField: any) =>
          typeof row[columnField] === "string" &&
          row[columnField].toLowerCase().includes(search.toLowerCase())
      );

      return matchesSearch;
    });
  return (
    <div>
      <div className="w-full">
        <div className="border items-center rounded-lg h-[2.3rem] dark:border-dark-border border-textColor flex justify-end w-fit my-2 mt-3 dark:text-white">
          {/* <IconButton> */}
          <div className="px-1">
            <SearchIcon
              className="dark:text-dark-border text-textColor "
              fontSize="small"
            />
          </div>
          {/* </IconButton> */}
          <InputBase
            className="dark:text-textColor"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
          {/* {search != "" && ( */}
          <ClearIcon
            onClick={() => {
              setSearch("");
            }}
            className="cursor-pointer rounded-2xl"
            fontSize="small"
            color={search == "" ? "disabled" : "warning"}
            sx={{ fontSize: "13px", marginRight: "8px" }}
          />
          {/* )} */}
        </div>
      </div>
      <div className="mt-6">
        <table className="w-full border-collapse overflow-x-scroll">
          <thead>
            <tr>
              {/* Dynamically render table headers */}
              {columns &&
                columns.map((column: any, index: any) => (
                  <th
                    className="bg-textColor  dark:bg-tabel-header dark:text-textColor"
                    style={{
                      padding: "8px",
                      fontSize: "11px",
                      textAlign: "center",
                      borderBottom: "0",
                      fontWeight: "bolder",
                      // backgroundColor:"#D8D8D8"
                    }}
                    key={index}
                  >
                    {column.split(" ").map((word: any) =>
                      word
                        .split("_")
                        .map(
                          (subWord: any) =>
                            subWord.charAt(0).toUpperCase() + subWord.slice(1)
                        )
                        .join(" ")
                    )}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {/* Dynamically render table rows and cells */}
            {filteredData &&
              filteredData.map((row: any, rowIndex: any) => (
                <tr
                  className="bg-white dark:bg-dark-container dark:text-textColor"
                  key={rowIndex}
                >
                  {columns &&
                    columns
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((column: any, columnIndex: any) => {
                        const isLastRow = columnIndex === data.length - 1;
                        return (
                          <td
                            style={{
                              textAlign: "center",
                            }}
                            className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                              isLastRow ? "border-b" : "border-b"
                            }`}
                            key={columnIndex}
                          >
                            {row[column]}
                          </td>
                        );
                      })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceDetailsObjectTable;
