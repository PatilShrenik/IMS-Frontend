import React, { useState, useEffect } from "react";
import {
  InputBase,
  IconButton,
  Checkbox,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
  Tooltip,
  Chip,
  Button,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import { useAppContext } from "../AppContext";

const CreateWidgetTable = () => {
  const data = [
    { _id: 1000000000001, name: "Public v1", protocol: "SNMP" },
    { _id: 1000000000003, name: "FCAPS", protocol: "SSH" },
    { _id: 1000000000002, name: "Public v2c", protocol: "SNMP" },
    { _id: 630460740989584, name: "RevDau v2c", protocol: "SNMP" },
  ];
  const columns = [
    { field: "name", headerName: "name", minWidth: 110 },
    { field: "protocol", headerName: "type", minWidth: 110 },
  ];

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [allDevices, setAllDevices] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [selected, setSelected] = useState(false);
  const [anchorE3, setAnchorE3] = useState(null);
  const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddMultipleDialogOpen, setIsAddMultipleDialogOpen] = useState(false);
  const open = Boolean(anchorE2);
  const { themeSwitch } = useAppContext();
  const ITEM_HEIGHT = 48;
  const groupValues =
    allGroups &&
    allGroups.map((item: any) => ({
      name: item.name,
      id: item._id,
    }));
  const deviceValues =
    allDevices &&
    allDevices.map((item: any) => ({
      name: item.hostname,
      id: item._id,
    }));
  //   React.useEffect(() => {
  //     const getCredsProfile = async () => {
  //       let response = await getAllDevice();
  //       setAllDevices(response.result);
  //     };
  //     getCredsProfile();
  //     const getGroups = async () => {
  //       let response = await getAllGropus();
  //       setAllGroups(response.result);
  //     };
  //     getGroups();
  //     const getDiscoveryScheduler = async () => {
  //       let response = await getAllDiscoverySch();
  //       // setAllDiscoverySch(response.result);
  //     };
  //     getDiscoveryScheduler();
  //   }, []);

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

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleRowCheckboxToggle = (rowId: any) => {
    setSelectedRows((prevSelectedRows: any) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id: any) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const handleSelectAllCheckboxToggle = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allRowIds = data.map((row: any) => row._id);
      setSelectedRows(allRowIds);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectedRows.length != 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedRows]);

  const downloadCSV = () => {
    const selectedRowsData = data.filter((row: any) =>
      selectedRows.includes(row._id)
    );

    const csvData = [Object.keys(selectedRowsData[0])]; // Header

    selectedRowsData.forEach((row: any) => {
      const rowData: any = Object.values(row);
      csvData.push(rowData);
    });

    const csvContent = csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  //   const filteredData =
  //     data &&
  //     data.filter((row: any) => {
  //       return visibleColumns.some(
  //         (columnField: any) =>
  //           typeof row[columnField] === "string" &&
  //           row[columnField].toLowerCase().includes(search.toLowerCase())
  //       );
  //     });

  const stableSort = (array: any, comparator: any) => {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  };

  const getComparator = (order: any, orderBy: any) => {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (
    a: { [x: string]: number },
    b: { [x: string]: number },
    orderBy: string | number
  ) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const processColumnData = (column: any, row: any) => {
    // Perform operations based on the column and row data
    // console.log("cols", column);
    if (column.field === "groups") {
      const groupId = row[column.field];
      // Find the corresponding object in groupValues array
      const matchingGroup: any = groupValues.find(
        (group: any) => group.id === groupId[0]
      );

      // If a matching group is found, return its name, otherwise return null or a default value
      return matchingGroup ? matchingGroup.name : row[column.field];
    } else if (column.field === "device_ids") {
      const deviceIds = row[column.field];
      //   console.log("deviceids", deviceIds);
      return (
        <Chip
          label={deviceIds.length}
          className="pt-1 h-[22px] py-0 dark:text-textColor dark:bg-dark-border"
        />
      );
    } else if (column.field === "snmp_community") {
      return row.credential_context["snmp.community"] == ""
        ? "-"
        : row.credential_context["snmp.community"];
    } else if (column.field === "snmp_version") {
      return row.credential_context["snmp.version"] == ""
        ? "-"
        : row.credential_context["snmp.version"];
    }

    // If no specific processing needed, return the original value
    return row[column.field] == "" ? "-" : row[column.field];
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between dark:text-white">
          {/* Global Search for table */}

          <div className="border items-center rounded-lg h-[2.3rem] dark:border-[#3C3C3C] border-[#CCCFD9] flex justify-end w-fit m-2 mt-3 dark:text-white">
            <IconButton>
              <SearchIcon
                className="dark:text-[#3C3C3C] text-[#CCCFD9] "
                fontSize="small"
              />
            </IconButton>
            <InputBase
              className="dark:text-textColor"
              placeholder="Search..."
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
          <div className="flex">
            <div className="flex items-center m-4 mr-0">
              {selected && (
                <>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Delete selected credentials"
                    placement="top"
                  >
                    <DeleteForeverIcon
                      //   onClick={deleteDevice}
                      className="cursor-pointer"
                      style={{
                        margin: "0 5px",
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Download selected credentials"
                    placement="top"
                  >
                    <FileDownloadIcon
                      onClick={downloadCSV}
                      className="cursor-pointer"
                      style={{
                        margin: "0 5px",
                      }}
                    />
                  </Tooltip>
                </>
              )}
              {/* Hide and Show column */}
            </div>

            {/* Add Device Menu and Model */}
          </div>
        </div>

        <Paper
          className="dark:bg-black "
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: ".3rem",
            marginTop: ".75rem",
          }}
        >
          <TableContainer
            sx={{
              maxHeight: 440,
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              style={{ overflow: "hidden" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    className="bg-primary2 dark:bg-tabel-header  dark:text-textColor"
                    style={{
                      padding: "15px",
                      fontSize: "11px",
                      textAlign: "center",
                      borderBottom: "0",
                      fontWeight: "bolder",
                    }}
                  >
                    <Checkbox
                      className=" dark:text-textColor"
                      size="small"
                      style={{ padding: "0" }}
                      checked={selectAll}
                      onChange={handleSelectAllCheckboxToggle}
                    />
                  </TableCell>
                  {columns.map((column: any, colIndex: any) => {
                    const iconDirection = column.field ? order : "asc";
                    return (
                      <TableCell
                        className="bg-primary2 text-white dark:text-textColor dark:bg-tabel-header"
                        key={column.id}
                        align={column.align}
                        style={{
                          padding: "0px 8px",
                          minWidth: column.minWidth,
                          fontSize: "16px",
                          fontWeight: "600",
                          borderBottom: "0",
                          letterSpacing: ".7px",
                          fontStyle: "normal",
                          fontFamily: `"Poppins", sans-serif`,
                        }}
                      >
                        <TableSortLabel
                          className={`flex ${
                            colIndex == 0 || colIndex == 1
                              ? "justify-start"
                              : "justify-center pl-8"
                          }`}
                          active={orderBy === column.field}
                          direction={
                            iconDirection as "asc" | "desc" | undefined
                          }
                          onClick={() => handleRequestSort(column.field)}
                        >
                          {column.headerName
                            .split(" ")
                            .map((word: any) =>
                              word
                                .split("_")
                                .map(
                                  (subWord: any) =>
                                    subWord.charAt(0).toUpperCase() +
                                    subWord.slice(1)
                                )
                                .join(" ")
                            )
                            .join(" ")}
                        </TableSortLabel>
                      </TableCell>
                    );
                  })}

                  <TableCell
                    className="bg-primary2 text-white dark:text-textColor dark:bg-tabel-header"
                    style={{
                      padding: "0px 8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderBottom: "0",
                      letterSpacing: ".7px",
                      textAlign: "center",
                      fontStyle: "normal",
                      fontFamily: `"Poppins", sans-serif`,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(data, getComparator(order, orderBy)).map(
                  (row: any, rowIndex: any) => {
                    const isLastRow = rowIndex === data.length - 1;
                    return (
                      <TableRow
                        className="bg-light-container h-[50px] dark:bg-dark-container dark:text-textColor border-b-4"
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell
                          style={{
                            padding: "8px",
                            textAlign: "center",
                          }}
                          className={`bg-light-container dark:bg-dark-container dark:text-textColor ${
                            isLastRow
                              ? "border-b-0"
                              : "border-b border-gray-300"
                          }`}
                        >
                          <Checkbox
                            className=" dark:text-textColor"
                            style={{
                              padding: "0",
                              textAlign: "center",
                            }}
                            color="primary"
                            size="small"
                            checked={selectedRows.includes(row._id)}
                            onChange={() => handleRowCheckboxToggle(row._id)}
                          />
                        </TableCell>
                        {columns.map((column: any, colIndex: any) => {
                          const value = row[column.field];
                          const processedValue = processColumnData(column, row);

                          return (
                            <TableCell
                              className={`dark:bg-dark-container dark:text-textColor ${
                                isLastRow
                                  ? "border-b-0"
                                  : "border-b border-gray-300"
                              }`}
                              key={column.id}
                              align={column.align}
                              style={{
                                fontSize: "13px",
                                fontWeight: "normal",
                                padding: "0",
                                textAlign: "center",
                                fontFamily: `"Poppins", sans-serif`,
                              }}
                            >
                              <span
                                className={`flex ${
                                  colIndex == 0 || colIndex == 1
                                    ? "justify-start"
                                    : "justify-center pl-8"
                                }`}
                              >
                                {column.format &&
                                typeof processedValue === "number"
                                  ? column.format(processedValue)
                                  : processedValue}
                              </span>
                            </TableCell>
                          );
                        })}

                        <TableCell
                          className={`bg-light-container dark:bg-dark-container dark:text-textColor ${
                            isLastRow
                              ? "border-b-0"
                              : "border-b border-gray-300"
                          }`}
                          style={{
                            fontSize: "11px",
                            fontWeight: "normal",
                            padding: "0",
                            textAlign: "center",
                            fontFamily: `"Poppins", sans-serif`,
                          }}
                        >
                          <MoreVertIcon />
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              position: "fixed",
              bottom: 0,
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
        </Paper>
      </div>
    </>
  );
};

export default CreateWidgetTable;
