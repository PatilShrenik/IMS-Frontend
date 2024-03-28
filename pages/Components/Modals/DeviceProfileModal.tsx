import React from "react";
import { Drawer, Modal } from "@mui/material";
import CustomeButton, { CustomeCancelButton } from "../Buttons";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const DeviceProfileModal = (props: any) => {
  const { open, handleDialogClose, keysArray, DeviceList } = props;
  // console.log("open", open);
  const [allDevices, setAllDevices] = React.useState([]);
  // const classes = useStyles();

  React.useEffect(() => {
    const getDevices = async () => {
      let response = await getAllDevice();
      setAllDevices(response.result);
    };
    getDevices();
  }, []);
  const deviceIds = DeviceList && Object.values(DeviceList);
  const deviceValues: any[] =
    allDevices &&
    allDevices
      .filter((item: any) => deviceIds && deviceIds.includes(item._id))
      .map((filteredDevice: any) => ({
        hostname: filteredDevice.hostname,
      }));
    //  console.log("first",deviceValues);
  return (
    <Drawer
      anchor="right"
      open={open}
      variant="temporary"
      className="shadow-sm shadow-dark-container dark:border-l-0 h-full"
    >
      <div className="bg-white h-full text-center dark:bg-dark-container">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Device List</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDialogClose}
          />
        </div>
        <table className="w-full border-collapse overflow-x-scroll overflow-y-scroll">
          <thead>
            <tr>
       
              <th
                style={{ width: "18rem" }}
                className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2"
              >
                Device IP
              </th>
              <th
                style={{ width: "18rem" }}
                className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2"
              >
                Device Name
              </th>
            </tr>
          </thead>
          <tbody>
            {deviceValues &&
              deviceValues.map((data: any, index: any) => {
                const isLastRow = index === data.length - 1;
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
                      {keysArray[index]}
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
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* <table className="w-full border-collapse overflow-x-scroll overflow-y-scroll">
          <thead>
            <tr>
              <th
                style={{ width: "18rem" }}
                className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2"
              >
                Device IP
              </th>
              <th
                style={{ width: "18rem" }}
                className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2"
              >
                Device Name
              </th>
            </tr>
          </thead>
          <tbody>
            {keysArray.map((key:any, index:any) => {
              const data = deviceValues[index];
            console.log("first",index)
              const isLastRow = index === keysArray.length - 1;
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
                    {key}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                    className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                      isLastRow ? "border-b" : "border-b"
                    }`}
                  >
                    {data ? data.hostname : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
      <div
        className=" absolute bottom-0 w-full flex justify-end my-4"
        onClick={handleDialogClose}
      >
        <CustomeCancelButton title="Close" />
      </div>
    </Drawer>
  );
};

export default DeviceProfileModal;
