import { Checkbox, Drawer } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Bounce, toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import { makeStyles } from "@material-ui/core/styles";
import { baseURL } from "@/constants";
import {
  replacePeriodsWithUnderscoresArrayOfObjects,
  replaceUnderscoresWithDots,
} from "@/functions/genericFunctions";
import {
  getMonitoringDetailsByDeviced,
  updateAvailabilityMonitorinngByDeviced,
  updateMonitoringDetailsByDeviced,
} from "@/pages/api/api/DeviceManagementAPI";
import CustomeInput from "../Inputs";
import { useAppContext } from "../AppContext";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "50%",
    flexShrink: 0,
    // height: "100%",
  },
  bottomContent: {
    marginTop: "auto",
    // padding: theme.spacing(2),
  },
}));
const MonitoringSettingsDrawer = (props: any) => {
  const { rowId, open, handleDrawerClose } = props;
  const classes = useStyles();
  const { toggleDeviceTableState } = useAppContext();
  const [data, setData] = React.useState([]) as any;

  useEffect(() => {
    if (open) {
      try {
        const getData = async () => {
          let response = await getMonitoringDetailsByDeviced(rowId);

          const modifiedData: any = replacePeriodsWithUnderscoresArrayOfObjects(
            response.result
          );
          setData(modifiedData);
        };
        getData();
      } catch (error) {
        console.log(error);
      }
    }
  }, [open]);

  const handleInputChange = (id: number, field: string, value: any) => {
    const updatedData =
      data &&
      data.map((row: any) =>
        row._id === id ? { ...row, [field]: value, _isDirty: true } : row
      );
    setData(updatedData);
  };

  const handleUpdate = (id: number) => {
    const updatedData = data.map((row: any) =>
      row._id === id ? { ...row, _isDirty: false } : row
    );
    setData(updatedData);
    HandleSave(updatedData.find((row: any) => row._id === id));
  };
  const handleApiResponse = (response: any) => {
    if (response.status === "success") {
      toggleDeviceTableState();
      toast.success(response.status, {
        position: "bottom-right",
        autoClose: 1000,
      });
    } else {
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const HandleSave = async (modifiedRow: any) => {
    try {
      const dataToSend = {
        bodyData: replaceUnderscoresWithDots(modifiedRow),
      };
      // console.log("data to send", dataToSend);
      if (modifiedRow && modifiedRow.object_type !== "Availability") {
        let response = await updateMonitoringDetailsByDeviced(dataToSend);
        handleApiResponse(response);
      } else {
        let response = await updateAvailabilityMonitorinngByDeviced(
          dataToSend,
          props.deviceid
        );
        handleApiResponse(response);
      }
      props.handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer
      // hideBackdrop = {false}temporary
      anchor="right"
      open={open}
      variant="temporary"
      classes={{ paper: classes.drawer }}
      className="shadow-sm shadow-dark-container w-full h-full overflow-y-auto"
    >
      <div className="h-full w-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Monitoring Settings</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <div className="py-2 px-6 dark:bg-dark-menu-color">
          <div className="m-4">
            <table className="w-full border-collapse overflow-x-scroll">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th className="bg-textColor dark:bg-tabel-header dark:text-textColor py-2">
                    Object Type
                  </th>
                  <th className="bg-textColor dark:bg-tabel-header dark:text-textColor py-2">
                    Polling Interval
                  </th>
                  <th className="bg-textColor dark:bg-tabel-header dark:text-textColor py-2">
                    Object Enabled
                  </th>
                  <th className="bg-textColor dark:bg-tabel-header dark:text-textColor py-2">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  [].concat(
                    data
                      .filter((row: any) => row.object_type === "Availability")
                      .map((row: any, index: any) => {
                        const isLastRow = index === data.length - 1;
                        return (
                          <tr
                            className="bg-white dark:bg-dark-container dark:text-textColor"
                            key={row._id}
                          >
                            <td
                              style={{
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                            >
                              {row.object_type}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                            >
                              <CustomeInput
                                label=""
                                name=""
                                value={row.polling_interval}
                                onChange={(e: any) =>
                                  handleInputChange(
                                    row._id,
                                    "polling_interval",
                                    +e.target.value
                                  )
                                }
                              />
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                            >
                              <Checkbox
                                checked={row.object_enabled}
                                onChange={() =>
                                  handleInputChange(
                                    row._id,
                                    "object_enabled",
                                    !row.object_enabled
                                  )
                                }
                              />
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                            >
                              {row._isDirty && (
                                <div onClick={() => handleUpdate(row._id)}>
                                  <CheckIcon style={{ cursor: "pointer" }} />
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      }),

                    // Rows without object_type 'Availability'
                    data
                      .filter((row: any) => row.object_type !== "Availability")
                      .map((row: any, index: any) => {
                        const isLastRow = index === data.length - 1;
                        return (
                          <tr
                            className="bg-white dark:bg-dark-container dark:text-textColor"
                            key={row._id}
                          >
                            <td
                              style={{
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                            >
                              {row.object_type}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                            >
                              <CustomeInput
                                label=""
                                name=""
                                value={row.polling_interval}
                                onChange={(e: any) =>
                                  handleInputChange(
                                    row._id,
                                    "polling_interval",
                                    +e.target.value
                                  )
                                }
                              />
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                            >
                              <Checkbox
                                checked={row.object_enabled}
                                onChange={() =>
                                  handleInputChange(
                                    row._id,
                                    "object_enabled",
                                    !row.object_enabled
                                  )
                                }
                              />
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                            >
                              {row._isDirty && (
                                <div onClick={() => handleUpdate(row._id)}>
                                  <CheckIcon style={{ cursor: "pointer" }} />
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                  )
                ) : (
                  <p>No Data</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MonitoringSettingsDrawer;
