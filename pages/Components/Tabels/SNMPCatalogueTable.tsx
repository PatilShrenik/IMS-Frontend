import React, { useEffect, useState } from "react";
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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Bounce, toast } from "react-toastify";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import DeleteModal from "../Modals/DeleteModal";
import { useAppContext } from "../AppContext";
import { deleteBulkSNMPCatalog } from "@/pages/api/api/SNMPCatalogueAPI";
import SNMPCatalogueDrawer from "../SideDrawers/SNMPCatalogueDrawer";
import SNMPCatalogueMenu from "../ActionMenu/SNMPCatalogueMenu";
import { getAllSNMPTemp } from "@/pages/api/api/SNMPTemplateAPI";
const SNMPCatalogueTable = (props: any) => {
    const {
        data,
        visibleColumns,
        setVisibleColumns,
        columns,
        page,
        rowsPerPage,
      } = props;
    const [selected, setSelected] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [selectAll, setSelectAll] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const { toggleGetSNMPCatApiState } = useAppContext();
    const [isModalopen, setIsModalOpen] = React.useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const [allTemplates, setAllTemplates] = React.useState([]);
    
    const templatesValues =
    allTemplates &&
    allTemplates.map((item: any) => ({
      name: item.name,
      id: item._id,
    }));
    React.useEffect(() => {
      const getTemp = async () => {
        let response = await getAllSNMPTemp();
        setAllTemplates( response && response.result);
      };
  
      getTemp();
    },[]);
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
      };
      const handleDrawerClose = () => {
        setIsDrawerOpen(false);
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
    
      const handleRequestSort = (property: any) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
      };
      useEffect(() => {
        if (selectedRows.length != 0) {
          setSelected(true);
        } else {
          setSelected(false);
        }
      }, [selectedRows]);
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
    
      const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
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
      const handleMenuItemClick = (columnField: any) => {
        //console.log("clicked");
        handleColumnToggle(columnField);
        // handleMenuClose();
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
    const handleRowCheckboxToggle = (rowId: any) => {
      setSelectedRows((prevSelectedRows: any) => {
        if (prevSelectedRows.includes(rowId)) {
          return prevSelectedRows.filter((id: any) => id !== rowId);
        } else {
          return [...prevSelectedRows, rowId];
        }
      });
    };

    const deleteSNMPCatalog = async () => {
        console.log("delete array", selectedRows);
        try {
          let response = await deleteBulkSNMPCatalog(selectedRows);
    
          if (response.status == "success") {
            handleModalClose();
    
            toggleGetSNMPCatApiState();
    
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
      const processColumnData = (column: any, row: any) => {
        if (column.field === "snmp_template") {
          const templateId = row[column.field] && row[column.field];
          // Find the corresponding object in templatesValues array
          
          const matchingtemplate: any = templatesValues.find(
            (template: any) => template.id === templateId
          );
          // If a matching template is found, return its name, otherwise return null or a default value
          return matchingtemplate ? matchingtemplate.name : "-";
        }
        return row[column.field] == "" ? "-" : row[column.field];
      };

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
    
      const handleSearchChange = (event: any) => {
        setSearch(event.target.value);
      };


  return (
    <>
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
          <div className="flex">
            <div className="flex items-center m-4 mr-0">
              {selected ? (
                <>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Delete selected catalogues"
                    placement="top"
                  >
                    <DeleteForeverIcon
                      onClick={handleModalOpen}
                      className="cursor-pointer dark:text-textColor"
                      style={{
                        margin: "0 5px",
                      }}
                    />
                  </Tooltip>
                  <DeleteModal
                    open={isModalopen}
                    handleModalClose={handleModalClose}
                    deleteRow={deleteSNMPCatalog}
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Download selected catalogues"
                    placement="top"
                  >
                    <FileDownloadIcon
                      onClick={downloadCSV}
                      className="cursor-pointer dark:text-textColor"
                      style={{
                        margin: "0 5px",
                      }}
                    />
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Delete selected catalogues (Disabled)"
                    placement="top"
                  >
                    <DeleteForeverIcon
                      //   onClick={deleteDiscoverySch}
                      color="disabled"
                      className="cursor-pointer dark:text-gray-700"
                      style={{
                        margin: "0 5px",
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Download selected catalogues (Disabled)"
                    placement="top"
                  >
                    <FileDownloadIcon
                      // onClick={downloadCSV}
                      className="cursor-pointer dark:text-gray-700"
                      color="disabled"
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
                        // onChange={() => handleMenuItemClick(column.field)}
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
              {/* <Button
                  onClick={handleDrawerOpen}
                  variant="contained"
                  className="bg-primary3 capitalize items-center"
                  size="small"
                  style={{ margin: "0 4px" }}
                >
                  <FileUploadIcon fontSize="small" className="mr-2" /> Upload
                  CSV
                </Button> */}
              <Button
                onClick={handleDrawerOpen}
                variant="contained"
                className="bg-primary3 capitalize items-center"
                size="small"
              >
                <AddIcon fontSize="small" className="mr-2" /> Add SNMP Catalogue
              </Button>
              {/* <AddIcon
                  className=" dark:text-textColor"
                  onClick={handleDrawerOpen}
                  fontSize="medium"
                  sx={{
                    cursor: "pointer",
                  }}
                /> */}
              <SNMPCatalogueDrawer
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
      {data && data.length > 0 ? (
        <div className="">
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
                    <th
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
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stableSort(filteredData, getComparator(order, orderBy))
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
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
                              padding: "8px",
                              textAlign: "center",
                            }}
                            className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border  ${
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
                              onChange={() =>
                                handleRowCheckboxToggle(row._id)
                              }
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
                                  className={`dark:bg-dark-container dark:text-textColor dark:border-dark-border  ${
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
                            className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border  ${
                              isLastRow
                                ? "border-b border-gray-300"
                                : "border-b border-gray-300"
                            }`}
                            style={{
                              // fontSize: "11px",
                              fontWeight: "normal",
                              // padding: "0",
                              textAlign: "start",
                              fontFamily: `"Poppins", sans-serif`,
                            }}
                          >
                       
                            <SNMPCatalogueMenu rowData={row} />
                          </td> 
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
  
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center p-5">
          <p className="dark:text-textColor">No Data</p>
        </div>
      )}
    </div>
  </>
  )
}

export default SNMPCatalogueTable