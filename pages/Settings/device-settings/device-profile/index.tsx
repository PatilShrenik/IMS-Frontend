import React, { useState, useEffect } from "react";
import {
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  TableSortLabel,
  Tooltip,
  Button,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import VisibilityIcon from "@mui/icons-material/ViewColumn";
import { Bounce, toast } from "react-toastify";
import {
  bulkActionDeviceDelete,
  getAllDeviceManager,
} from "@/pages/api/api/DeviceManagementAPI";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import {
  bulkActionCredsProfileDelete,
  getAllCredsProfile,
} from "@/pages/api/api/CredentialProfileAPI";
import {
  convertEpochToDateMonthYear,
  replacePeriodsWithUnderscores,
} from "@/functions/genericFunctions";

import Link from "next/link";
import { useAppContext } from "../../../Components/AppContext";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import Chips, { StatusChips } from "../../../Components/Chips";
import CustomPagination from "../../../Components/CustomePagination";
import DeviceProfileModal from "@/pages/Components/Modals/DeviceProfileModal";

const Profiling = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const { toggleDeviceTableState } = useAppContext();
  const [page, setPage] = React.useState(0);
  const [visibleColumns, setVisibleColumns] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1) as any;
  const [rowsPerPage, setRowsPerPage] = useState(10) as any;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedButtons, setSelectedButtons] = useState([]) as any;
  const [allCredsPrfile, setAllCredsProfil] = React.useState([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [allDevices, setAllDevices] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [selected, setSelected] = useState(false);
  const [anchorE3, setAnchorE3] = useState(null);
  const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);

  const [isModalopen, setIsModalOpen] = React.useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [dialogOpen, setDialogOpen] = React.useState(false);

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
      let response = await getAllCredsProfile();
      setAllCredsProfil(response.result);
    };
    // const getCredsProfile = async () => {
    //   let response = await getAllDevice();
    //   setAllDevices(response.result);
    // };
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

  useEffect(() => {
    try {
      const getData = async () => {
        let cols: any = [];
        let response = await getAllDeviceManager();
        console.log("get all device from API", response.result);
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        console.log("profiling data", modifiedData);
        // const col = Object.keys(modifiedData[0]);
        const indexOfObjectWithDeviceList =
          modifiedData &&
          modifiedData.findIndex((obj: any) => obj.device_list !== undefined);
        let col = [] as any;
        if (indexOfObjectWithDeviceList == -1 && modifiedData.length != 0) {
          col = Object.keys(modifiedData[0]);
        } else {
          col =
            modifiedData.length != 0 &&
            Object.keys(modifiedData[indexOfObjectWithDeviceList]);
        }
        //   console.log("fil",cols);
        const filteredCols = col.filter((key: any) => !key.startsWith("_"));
        filteredCols.filter((key: any) => {
          if (!key.startsWith("_")) {
            if (key == "profile_type") {
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
            } else if (key == "hostname") {
              cols.push({
                field: key.replace(/\./g, "_"),
                headerName: "Host Name",
                minWidth: 150,
              });
            } else if (key == "device_list") {
              cols.push({
                field: key.replace(/\./g, "_"),
                headerName: "discovered devices",
                minWidth: 150,
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

        // cols.push({
        //   field: "last_availability_on",
        //   headerName: "Last Avaiable On",
        //   minWidth: 120,
        // });
        console.log("cols", cols);
        setColumns(cols);

        const hiddenColumnsValues = [
          // "alias",
          "discovery_schedulers",
          "country",
          "hostname",
          // "profile_type",
          "port",
          "credential_profiles",
          "availability_interval",
          // "flow_enabled",
          "auto_provision",
          "location",
          "site",
          "start_ip",
          "end_ip",
          "os",
          "alias",
          "os_version",
          "vendor",
          "check_without_save",
          // "device_list",
          "site_code",
          "device_name",
          "service",
          "latitude",
          "longitude",
          "created_by",
          "created_on",
          "updated_by",
          "updated_on",
          "timestamp",
          "timezone",
          "valid_credential_profile",
          "device_type",
          "oem",
          "device_status",
          "last_availability_on",
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

  // const filteredData =
  //   data &&
  //   data.filter((row: any) => {
  //     const matchesSearch = visibleColumns.some(
  //       (columnField: any) =>
  //         typeof row[columnField] === "string" &&
  //         row[columnField].toLowerCase().includes(search.toLowerCase())
  //     );

  //     const matchesButtons =
  //       selectedButtons.length === 0 ||
  //       selectedButtons.some((button: any) => row["plugin_type"] === button);
  //     console.log("matched button", row["plugin_type"]);
  //     return matchesSearch && matchesButtons;
  //   });
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

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (columnField: any) => {
    console.log("clicked");
    handleColumnToggle(columnField);
    // handleMenuClose();
  };

  const handleClickOpen = (keysArray: any) => {
    setDialogOpen(keysArray);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);

  const processColumnData = (column: any, row: any) => {
    // Perform operations based on the column and row data
    if (column.field === "groups") {
      const groupId = row[column.field] && row[column.field];
      const matchingGroup: any = groupValues.find(
        (group: any) => group.id === groupId[0]
      );
      return matchingGroup ? matchingGroup.name : "-";
    } else if (column.field === "credential_profiles") {
      const credProfileId = row[column.field] && row[column.field];
      const numericCredProfileId = parseInt(credProfileId[0], 10);

      const matchingCredsProfile: any = allCredsPrfile.find(
        (creds: any) => creds._id === numericCredProfileId
      );
      // console.log("----", matchingCredsProfile);
      // If a matching group is found, return its name, otherwise return null or a default value
      return matchingCredsProfile ? matchingCredsProfile.name : "-";
      // : row[column.field];
    } else if (column.field === "flow_enabled") {
      if (row[column.field] == "yes") {
        return (
          <>
            <Tooltip title="OnLine" placement="top-end">
              <div className="flex items-center">
                {/* <div className="bg-success rounded-xl w-3 h-3  mr-2"></div> */}
                <ArrowDropUpIcon
                  fontSize="large"
                  className="text-success"
                  style={{ fontSize: "2.5rem" }}
                />
              </div>
            </Tooltip>
            {/* <ArrowDropUpIcon style={{fontSize : "28px"}} color="success" fontSize="small" /> */}
          </>
        );
      } else if (row[column.field] == "no") {
        return (
          <>
            <Tooltip title="Offline" placement="top-end">
              <div className=" flex items-center">
                {/* <div className="bg-danger rounded-xl w-3 h-3 mr-2"></div> */}
                <ArrowDropDownIcon
                  className="text-danger"
                  fontSize="large"
                  style={{ fontSize: "2.5rem" }}
                />
              </div>
            </Tooltip>

            {/* <ArrowDropDownIcon color="error" fontSize="small" /> */}
          </>
        );
      }
    } else if (
      column.field === "timestamp" ||
      column.field == "last_discovered_on"
    ) {
      const timestamp =
        row.availability_context &&
        (row.availability_context["timestamp"] ||
          row.availability_context["last_discovered_on"]);

      if (
        row.availability_context &&
        (row.availability_context["timestamp"] ||
          row.availability_context["last_discovered_on"])
      ) {
        const formattedDateMonthYear = convertEpochToDateMonthYear(timestamp);
        return formattedDateMonthYear ? formattedDateMonthYear : "-";
      }
    } else if (column.field == "device_status") {
      const device_status = row[column.field] && row[column.field];
      return <StatusChips value={device_status} />;
    } else if (column.field == "device_list") {
      const keysArray = row.device_list ? Object.keys(row.device_list) : [];
      // const keysArray = row.device_list &&  Object.keys(row.device_list);
      console.log("keys arr lenght", row.device_list);
      const DeviceList = row.device_list ?? {};
      //  const DeviceList = {
      //   "134.119.179.18": 641660281176474,
      //   "134.119.179.20": 641660281176464,
      // };

      // const keysArray: any = Object.keys(DeviceList);
      return (
        <>
          <div
            className={`${keysArray.length > 0 ? "cursor-pointer" : ""}`}
            onClick={
              keysArray.length > 0
                ? () => handleClickOpen(keysArray)
                : undefined
            }
          >
            <Chips value={keysArray.length} />
          </div>
          <DeviceProfileModal
            open={dialogOpen && keysArray.length > 0}
            DeviceList={DeviceList}
            handleDialogClose={handleDialogClose}
            keysArray={keysArray}
          />
        </>
      );
    }

    // If no specific processing needed, return the original value
    return row[column.field];
  };
  const deleteDevice = async () => {
    console.log("delete array", selectedRows);
    try {
      let response = await bulkActionDeviceDelete(selectedRows);

      if (response.status == "success") {
        handleModalClose();

        toggleDeviceTableState();

        toast.success(response.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      // setIsPopupOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-between dark:text-white">
          <div className="flex justify-between dark:text-white">
            <div className="border items-center rounded-lg h-[2.3rem] dark:border-dark-border border-textColor flex justify-end w-fit m-2 mt-3 dark:text-white">
              <IconButton>
                <SearchIcon
                  className="dark:text-dark-border text-textColor "
                  fontSize="small"
                />
              </IconButton>
              <InputBase
                className="dark:text-textColor"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <ClearIcon
                onClick={() => {
                  setSearch("");
                }}
                className="cursor-pointer rounded-2xl"
                fontSize="small"
                color={search == "" ? "disabled" : "warning"}
                sx={{ fontSize: "13px", marginRight: "8px" }}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center m-4 mr-4">
            <Tooltip
              TransitionComponent={Zoom}
              title="Hide/UnHide Columns"
              placement="top"
            >
              <ViewColumnIcon
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
              {columns &&
                columns.map((column: any) => (
                  <MenuItem
                    className="bg-light-container dark:bg-dark-container dark:text-textColor hover:dark:bg-tabel-header"
                    style={{
                      fontFamily: `"Poppins", sans-serif`,
                    }}
                    key={column.field}
                    onClick={() => handleMenuItemClick(column.field)}
                  >
                    <Checkbox
                      className=" dark:text-textColor"
                      style={{
                        padding: "0 .5rem",
                      }}
                      size="small"
                      checked={visibleColumns.includes(column.field)}
                    />
                    {column.headerName
                      .split(" ")
                      .map((word: any) =>
                        word
                          .split("_")
                          .map(
                            (subWord: any) =>
                              subWord.charAt(0).toUpperCase() + subWord.slice(1)
                          )
                          .join(" ")
                      )
                      .join(" ")}
                  </MenuItem>
                ))}
            </Menu>
            {/* <div>
              <Link href="/Assets/">
                <Button
                  // onClick={handleDrawerOpen}
                  variant="contained"
                  className="bg-primary3 capitalize items-center ml-3"
                  size="small"
                >
                  Assets
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      {data && data.length > 0 ? (
        <div
          className=""
          style={{
            width: "100%",
            overflow: "auto",
            borderRadius: "0",
            marginTop: ".5rem",
          }}
        >
          <div className="max-h-440">
            <table className="w-full border-collapse overflow-auto">
              <thead>
                <tr>
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
                  >
                    <Checkbox
                      className=" dark:text-textColor"
                      size="small"
                      style={{ padding: "0" }}
                      checked={selectAll}
                      onChange={handleSelectAllCheckboxToggle}
                    />
                  </th>
                  {columns
                    .filter((column: any) =>
                      visibleColumns.includes(column.field)
                    )
                    .map((column: any, colIndex: any) => {
                      const iconDirection = column.field ? order : "asc";
                      return (
                        <th
                          className="bg-textColor text-start text-tabel-header dark:text-textColor dark:bg-tabel-header "
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
                            // backgroundColor:"#D8D8D8"
                          }}
                        >
                          <TableSortLabel
                            className={`flex  ${
                              colIndex == 0 || colIndex == 1
                                ? "justify-start  "
                                : "justify-start"
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
                            style={{
                              color: "inherit",
                              textDecoration: "none",
                            }}
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
                        </th>
                      );
                    })}
                  {/* <th
                      className="bg-textColor text-tabel-header dark:text-textColor dark:bg-tabel-header "
                      style={{
                        padding: "0px 8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        borderBottom: "0",
                        letterSpacing: ".7px",
                        textAlign: "start",
                        fontStyle: "normal",
                        fontFamily: `"Poppins", sans-serif`,
                        // backgroundColor:"#D8D8D8"
                      }}
                    >
                      Actions
                    </th> */}
                </tr>
              </thead>
              <tbody>
                {stableSort(filteredData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, rowIndex: any) => {
                    const isLastRow = rowIndex === data.length - 1;
                    return (
                      <tr
                        className="bg-white dark:bg-dark-container dark:text-textColor"
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <td
                          style={{
                            //   padding: "8px",
                            textAlign: "center",
                          }}
                          className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                            isLastRow ? "border-b" : "border-b"
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
                        </td>
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
                              <td
                                className={`dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                  isLastRow ? "border-b " : "border-b "
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
                                      : "justify-start "
                                  }`}
                                >
                                  {column.format &&
                                  typeof processedValue === "number"
                                    ? column.format(processedValue)
                                    : processedValue}
                                </span>
                              </td>
                            );
                          })}
                        <td
                          className={` bg-white items-center dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                            isLastRow ? "border-b" : "border-b "
                          }`}
                          style={{
                            // fontSize: "11px",
                            fontWeight: "normal",
                            padding: "0",
                            textAlign: "start",
                            fontFamily: `"Poppins", sans-serif`,
                          }}
                        >
                          {/* <div className="flex items-center">
                              <Tooltip
                                TransitionComponent={Zoom}
                                title="Run Discovery Now"
                                placement="top"
                              >
                                <SlowMotionVideoIcon />
                               
                              </Tooltip>
                              <AssetsActionMenu rowData={row} />
                            </div> */}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center p-5">
          <p className="dark:text-textColor">No Data</p>
        </div>
      )}
    </>
  );
};

export default Profiling;
