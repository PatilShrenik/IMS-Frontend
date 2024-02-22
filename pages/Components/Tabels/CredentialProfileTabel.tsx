import React, { useState, useEffect } from "react";
import {
  InputBase,
  IconButton,
  Menu,
  MenuItem,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
// import VisibilityIcon from "@mui/icons-material/ViewColumn";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import { getAllCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";
import CredentialProfileDrawer from "../SideDrawers/CredentialProfileDrawer";
import CredentialProfileMenu from "../ActionMenu/CredentialProfileMenu";

const CredntialProfileTable = (props: any) => {
  const {
    data,
    visibleColumns,
    setVisibleColumns,
    columns,
    page,
    rowsPerPage,
  } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  //   const [data, setData] = useState<any>();
  // const [columns, setColumns] = useState<any>();
  //   const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  //   const [visibleColumns, setVisibleColumns] = useState<any>([]);
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

  React.useEffect(() => {
    const getCredsProfile = async () => {
      let response = await getAllDevice();
      setAllDevices(response.result);
    };
    getCredsProfile();
    const getGroups = async () => {
      let response = await getAllGropus();
      setAllGroups(response.result);
    };
    getGroups();
    const getDiscoveryScheduler = async () => {
      let response = await getAllDiscoverySch();
      // setAllDiscoverySch(response.result);
    };
    getDiscoveryScheduler();
  }, []);

  //   useEffect(() => {
  //     try {
  //       const getData = async () => {
  //         let cols: any = [];
  //         let response = await getAllCredsProfile();
  //         const modifiedData = replacePeriodsWithUnderscores(response.result);
  //         console.log("modifidData", modifiedData);
  //         const col = Object.keys(modifiedData[0]);
  //         const filteredCols = col.filter((key: any) => !key.startsWith("_"));
  //         console.log("filtered cols", filteredCols);
  //         filteredCols.filter((key: any) => {
  //           if (!key.startsWith("_")) {
  //             if (key == "credential_context") {
  //               cols.push({
  //                 field: "snmp_community",
  //                 headerName: "SNMP Comm.",
  //                 minWidth: 80,
  //               });
  //               cols.push({
  //                 field: "snmp_version",
  //                 headerName: "SNMP Version",
  //                 minWidth: 80,
  //               });
  //             } else if (key == "device_ids") {
  //               cols.push({
  //                 field: "device_ids",
  //                 headerName: "Devices",
  //                 minWidth: 150,
  //               });
  //             } else {
  //               cols.push({
  //                 field: key.replace(/\./g, "_"),
  //                 headerName: key.replace(/\./g, " "),
  //                 minWidth: 110,
  //               });
  //             }
  //           }
  //         });

  //         console.log("cols", cols);
  //         setColumns(cols);
  //         console.log("rows", modifiedData);
  //         const hiddenColumnsValues = [
  //           "snmp_community",
  //           "snmp_version",
  //           "created_by",
  //           "created_on",
  //           "updated_by",
  //           "updated_on",
  //         ];

  //         setVisibleColumns(
  //           cols
  //             .map((column: any) => column.field)
  //             .filter((field: any) => !hiddenColumnsValues.includes(field))
  //         );

  //         setData(modifiedData);
  //       };
  //       getData();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleColumnToggle = (columnField: any) => {
    setVisibleColumns((prevVisibleColumns: any) => {
      if (prevVisibleColumns.includes(columnField)) {
        return prevVisibleColumns.filter((field: any) => field !== columnField);
      } else {
        return [...prevVisibleColumns, columnField];
      }
    });
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

  //   const deleteDevice = async () => {
  //     console.log("delete array", selectedRows);
  //     try {
  //       let response = await deleteCredsProfile(selectedRows);

  //       if (response.status == "success") {
  //         togglegetCredProfileApiState();
  //         toast.success(response.message, {
  //           position: "bottom-right",
  //           autoClose: 1000,
  //         });
  //       } else {
  //         toast.error(response.message, {
  //           position: "bottom-right",
  //           autoClose: 2000,
  //         });
  //       }
  //       // setIsPopupOpen(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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

  const filteredData =
    data &&
    data.filter((row: any) => {
      return visibleColumns.some(
        (columnField: any) =>
          typeof row[columnField] === "string" &&
          row[columnField].toLowerCase().includes(search.toLowerCase())
      );
    });

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

  //   const handleChangePage = (
  //     event: any,
  //     newPage: React.SetStateAction<number>
  //   ) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (columnField: any) => {
    handleColumnToggle(columnField);
    // handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

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
          className="pt-1 h-[22px] py-0 dark:text-textColor bg-primary2"
        />
      );
      //   const numericDeviceIds = deviceIds.map((id: any) => parseInt(id, 10));

      //   const matchingDevices = numericDeviceIds.map((numericId: number) => {
      //     const matchingDevice = deviceValues.find(
      //       (device: any) => device.id === numericId
      //     );
      //     return matchingDevice ? matchingDevice.name : "-";
      //   });

      //   const namesInCommaSeparatedFormat = matchingDevices.join(", ");

      //   return namesInCommaSeparatedFormat ? namesInCommaSeparatedFormat : "-";
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

  const handleAddMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleAddMenuClose = () => {
    setAnchorE2(null);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  //   const handleAddSingleCloseDialog = () => {
  //     setIsAddSingleDialogOpen(false);
  //     handleAddMenuClose();
  //   };

  const handleAddMultipleOpenDialog = () => {
    setIsAddMultipleDialogOpen(true);
  };

  const handleAddMultipleCloseDialog = () => {
    setIsAddMultipleDialogOpen(false);
    handleAddMenuClose();
  };

  const handleActionClick = (event: any) => {
    setAnchorE3(event.currentTarget);
  };

  const handleActionClose = () => {
    setAnchorE3(null);
  };

  return (
    <>
      {data && (
        <div className="">
          <div className="">
            {/* <div>
              <p>All Credential Profiles</p>
            </div> */}
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
                  placeholder="Search"
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
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Hide/UnHide Columns"
                    placement="top"
                  >
                    <VisibilityIcon
                      className="text-dark-border dark:text-light-menu-color"
                      style={{ margin: "0 10px 0 5px" }}
                      onClick={handleMenuOpen}
                    />
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    style={{ padding: "0" }}
                  >
                    {columns.map((column: any) => (
                      <MenuItem
                        className="bg-light-container dark:bg-dark-container dark:text-[#DEE4EE]"
                        style={{
                          // backgroundColor: themeSwitch ? "#24303F" : "",
                          // color: themeSwitch ? "#DEE4EE" : "",
                          fontFamily: `"Poppins", sans-serif`,
                          // padding: "0px .5rem",
                        }}
                        key={column.field}
                        onClick={() => handleMenuItemClick(column.field)}
                      >
                        <Checkbox
                          className=" dark:text-[#DEE4EE]"
                          style={{
                            padding: "0 .5rem",
                          }}
                          size="small"
                          checked={visibleColumns.includes(column.field)}
                          onChange={() => handleMenuItemClick(column.field)}
                        />
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
                      </MenuItem>
                    ))}
                  </Menu>
                </div>

                {/* Add Device Menu and Model */}

                <div className="m-4 mr-0 ml-2 h-fit">
                  <Button
                    onClick={handleDrawerOpen}
                    variant="contained"
                    className="bg-primary3 capitalize items-center"
                    size="small"
                  >
                    <AddIcon fontSize="small" className="mr-2" /> Credential
                    Profile
                  </Button>
                  {/* <AddIcon
                    className=" dark:text-[#DEE4EE]"
                    onClick={handleDrawerOpen}
                    fontSize="medium"
                    sx={{
                      cursor: "pointer",
                    }}
                  /> */}
                  <CredentialProfileDrawer
                    open={isDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                  />
                  {/* <AddCredentialProfile
                  themeSwitch={themeSwitch}
                  open={isAddSingleDialogOpen}
                  handleClose={handleAddSingleCloseDialog}
                /> */}
                </div>
              </div>
              {/* Global Downlad and delete button for table */}
            </div>
          </div>
          <Paper
            className="dark:bg-black"
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "0",
              marginTop: ".5rem",
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
                      className="bg-textColor dark:bg-tabel-header dark:text-textColor"
                      style={{
                        padding: "8px",
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
                    {columns
                      .filter((column: any) =>
                        visibleColumns.includes(column.field)
                      )
                      .map((column: any, colIndex: any) => {
                        const iconDirection = column.field ? order : "asc";
                        return (
                          <TableCell
                            className="bg-textColor text-tabel-header dark:text-textColor dark:bg-tabel-header"
                            key={column.id}
                            align={column.align}
                            style={{
                              padding: "0px 8px",
                              minWidth: column.minWidth,
                              fontSize: "14px",
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
                              //   style={{
                              //     display: "flex",
                              //     justifyContent: "center",
                              //     paddingLeft: "2rem",
                              //   }}
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
                      className="bg-textColor text-tabel-header dark:text-textColor dark:bg-tabel-header"
                      style={{
                        padding: "0px 8px",
                        fontSize: "14px",
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
                  {stableSort(filteredData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, rowIndex: any) => {
                      const isLastRow = rowIndex === data.length - 1;
                      return (
                        <TableRow
                          className="bg-light-container dark:bg-dark-container dark:text-textColor border-b-2"
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
                                ? "border-b"
                                : "border-b"
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
                          {columns
                            .filter((column: any) =>
                              visibleColumns.includes(column.field)
                            )
                            .map((column: any, colIndex: any) => {
                              const value = row[column.field];
                              const processedValue = processColumnData(
                                column,
                                row
                              );

                              return (
                                <TableCell
                                  className={`dark:bg-dark-container dark:text-textColor ${
                                    isLastRow
                                      ? "border-b "
                                      : "border-b "
                                  }`}
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "normal",
                                    padding: "8px",
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
                                ? "border-b border-gray-300"
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
                            <CredentialProfileMenu />
                            {/* <CredentialProfileMenu rowData={row} /> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              className="bg-light-container dark:bg-dark-container dark:text-textColor pt-12"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
        </div>
      )}
    </>
  );
};

export default CredntialProfileTable;
