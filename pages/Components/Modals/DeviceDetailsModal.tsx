import React from "react";
import { Drawer, Modal, makeStyles } from "@mui/material";
import CustomeButton, { CustomeCancelButton } from "../Buttons";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const DeviceDetailsModal = (props: any) => {
  //   const classes = useStyles();
  const { open, handleDialogClose, device_ids } = props;
  const [allDevices, setAllDevices] = React.useState([]);

  React.useEffect(() => {
    const getDevices = async () => {
      let response = await getAllDevice();
      setAllDevices(response.result);
    };
    getDevices();
  }, []);

  const deviceValues: any[] =
    allDevices &&
    allDevices
      .filter((item: any) => device_ids.includes(item._id))
      .map((filteredDevice: any) => ({
        hostName: filteredDevice.hostname,
        alias: filteredDevice.alias,
        status: filteredDevice.status,
        plugin_type: filteredDevice["plugin.type"],
        name: filteredDevice.hostname,
        ip_address: filteredDevice["ip.address"],
      }));
  console.log("devdejasds", deviceValues);
  return (
    <Drawer
      anchor="right"
      open={open}
      variant="temporary"
      //   classes={{
      //     paper: classes.drawerPaper,
      //   }}
      className="shadow-sm shadow-dark-container dark:border-l-0 h-full"
    >
      <div className="bg-white h-full text-center dark:bg-tabel-row">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Device List</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDialogClose}
          />
        </div>
        <div className=" py-4 px-12">
          <table className="w-full border-collapse overflow-x-scroll overflow-y-scroll">
            <thead>
              <tr>
                {/* {keys.map((key: any) => {
                const formattedKey = key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char: any) => char.toUpperCase());

                return ( */}
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Device Name
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Device IP
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Host Name
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Status
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Plugin Type
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Alias
                </th>
                {/* );
              })} */}
              </tr>
            </thead>
            <tbody>
              {deviceValues &&
                deviceValues.map((data: any, index: any) => {
                  const isLastRow = index === data.length - 1;
                  console.log(data.name);
                  return (
                    <tr
                      className="bg-white dark:bg-dark-container dark:text-textColor"
                      key={index}
                    >
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.name}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.ip_address}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.hostname}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.status}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.plugin_type}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.alias}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div
          className=" absolute bottom-0 w-full flex justify-end my-4"
          onClick={handleDialogClose}
        >
          <CustomeCancelButton title="Close" />
        </div>
      </div>
    </Drawer>
  );
};

export default DeviceDetailsModal;
