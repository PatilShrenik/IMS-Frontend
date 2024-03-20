import React from "react";
import { Drawer, Modal} from "@mui/material";
import CustomeButton, { CustomeCancelButton } from "../Buttons";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { getAllUser } from "@/pages/api/api/UserManagementAPI";

import { makeStyles } from "@material-ui/core/styles";
// const useStyles = makeStyles((theme) => ({
//     drawer: {
//       width: "50%",
//     },
//   }));
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
  const deviceIds = Object.values(DeviceList);
  const deviceValues: any[] =
  allDevices &&
  allDevices
  .filter((item: any) => deviceIds.includes(item._id))
  .map((filteredDevice: any) => ({
      hostname: filteredDevice.hostname,
    //   alias: filteredDevice.alias,
    //     status: filteredDevice.status,
    //     plugin_type: filteredDevice["plugin.type"],
    //     name: filteredDevice.hostname,
    //     ip_address: filteredDevice["ip.address"],
    }));
 //   console.log("first",deviceValues);
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
                {/* {keys.map((key: any) => {
                const formattedKey = key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char: any) => char.toUpperCase());

                return ( */}
                <th 
                style={{width:"18rem"}} className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                   Device IP
                </th>
                <th 
                style={{width:"18rem"}}
                className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Device Name
                </th>
              
              </tr>
            </thead>
            <tbody>
              {deviceValues &&
                deviceValues.map((data: any, index: any) => {
                  const isLastRow = index === data.length - 1;
               //   console.log("---",data.hostname);
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
