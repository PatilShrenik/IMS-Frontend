import React from "react";
import { Drawer, Modal, makeStyles ,  Tooltip, } from "@mui/material";
import CustomeButton, { CustomeCancelButton } from "../Buttons";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { getAllUser } from "@/pages/api/api/UserManagementAPI";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const RoleDetailsModal = (props: any) => {
  const { open, handleDialogClose, user_ids } = props;
  const [allRoles, setAllRoles] = React.useState([]);

  React.useEffect(() => {
    const getRoles = async () => {
      let response = await getAllUser();
      console.log("res",response.result);
      setAllRoles(response.result);
    };
    getRoles();
  }, []);
  const roleValues: any[] =
    allRoles &&
    allRoles
      .filter((item: any) => user_ids.includes(item._id))
      .map((filteredRole: any) => ({
        username: filteredRole.username,
        
        // alias: filteredRole.alias,
         enable: filteredRole.enable,
         first_name: filteredRole["first.name"],
         last_name: filteredRole["last.name"],
        // name: filteredRole.hostname,
        // ip_address: filteredRole["ip.address"],
      }));
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
      <div className="bg-white h-full text-center dark:bg-dark-container">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">User List</p>
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
                  User Name
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  First Name
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Last Name
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                Status
                </th>
                {/* <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Plugin Type
                </th>
                <th className="bg-textColor dark:bg-tabel-header dark:text-textColor px-4 py-2">
                  Alias
                </th> */}
                {/* );
              })} */}
              </tr>
            </thead>
            <tbody>
              {roleValues &&
                roleValues.map((data: any, index: any) => {
                  const isLastRow = index === data.length - 1;
                  console.log(data.username);
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
                        {data.username}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.first_name}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border py-3 px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {data.last_name}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          //height: "1.6rem",
                        }}
                        className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border  px-4 ${
                          isLastRow ? "border-b" : "border-b"
                        }`}
                      >
                        {/* {data.enable} */}
                        {data.enable === "yes" ? (
                          <Tooltip title="Active" placement="left">
                            <div className="flex items-center">
                              <CheckRoundedIcon
                                className="text-success"
                                fontSize="large"
                                style={{ fontSize: "1.5rem" }}
                              />
                            </div>
                          </Tooltip>
                        ) : data.enable === "no" ? (
                          <Tooltip title="Inactive" placement="left">
                            <div className=" flex items-center">
                              <ClearRoundedIcon
                                className="text-danger"
                                fontSize="large"
                                style={{ fontSize: "1.5rem" }}
                              />
                            </div>
                          </Tooltip>
                        ) : null}
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

export default RoleDetailsModal;
