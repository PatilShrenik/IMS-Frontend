import React from "react";
import { Modal } from "@mui/material";
import CustomeButton, { CustomeCancelButton } from "../Buttons";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
const DeviceDetailsModal = (props: any) => {
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
        name: filteredDevice.hostname,
        ip_address: filteredDevice["ip.address"],
      }));
  console.log("devdejasds", deviceValues);
  return (
    <Modal hideBackdrop={true} open={open}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl  max-w-md text-center p-4 rounded-md dark:bg-tabel-row">
        <p className="flex justify-start text-xl dark:text-textColor">
          Device Details
        </p>
        <div className=" py-4 px-12">
          <table className="w-full border-collapse overflow-x-scroll ">
            <thead>
              <tr>
                {/* {keys.map((key: any) => {
                const formattedKey = key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char: any) => char.toUpperCase());

                return ( */}
                <th
                  className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2"
                  // key={key}
                >
                  Device Name
                </th>
                <th
                  className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2"
                  // key={key}
                >
                  Device IP
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
                          //   padding: "8px",
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
                          //   padding: "8px",
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.ip_address}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div
          className="w-full flex justify-end my-4"
          onClick={handleDialogClose}
        >
          <CustomeButton title="Close" />
        </div>
      </div>
    </Modal>
  );
};

export default DeviceDetailsModal;
