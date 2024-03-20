import React, { useEffect } from "react";
import { Checkbox, Drawer } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import CustomeInput from "../Inputs";
import { useAppContext } from "../AppContext";
import { Bounce, toast } from "react-toastify";
import { CustomeCancelButton } from "../Buttons";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {
  replaceDotWithUnderscore2,
  replaceDotsWithUnderscores,
  replaceDotsWithUnderscoresSEC,
  replaceUnderscoresWithDots,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import { getRoleById, updateRole } from "@/pages/api/api/RoleManagementAPI";
// interface Permission {
//   name: string;
//   key: string;
// }

const useStyles = makeStyles(() => ({
  drawer: {
    // width: drawerWidth,
    flexShrink: 100,
  },
  drawerPaper: {
    // width: drawerWidth,
    backdropFilter: "brightness(80%)", // Adjust the brightness for opacity
  },
}));
const EditRoleDrawer = (props: any) => {
  const { open, handleDrawerClose, id } = props;
  const classes = useStyles();
  const { themeSwitch, toggleGetRoleApiState } = useAppContext();

  const [data, setData] = React.useState({
    name: "",
    description: "",
    rbac_context: [""],
  });
  const permissionsData = [
    { name: "Dashboard", key: "DASHBOARD" },
    { name: "Widget", key: "WIDGET" },
    { name: "Device Management", key: "DEVICE_MANAGEMENT" },
    { name: "User Settings", key: "USER_SETTINGS" },
    { name: "System Settings", key: "SYSTEM_SETTINGS" },
    { name: "Alert", key: "ALERT" },
  ];

  React.useEffect(() => {
    if (open) {
      try {
        const getUserRoleById = async () => {
          console.log("edit id----", id);
          let response = await getRoleById(id);
          console.log("-----dd", response.result);
          const modifiedData = replaceDotWithUnderscore2(response.result);
          console.log("-----DD", modifiedData);
          setData(modifiedData);
        };
        getUserRoleById();
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, open]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  // const handleCheckboxChange = (permission: any) => {
  //   setData((prevData: any) => ({
  //     ...prevData,
  //     rbac_context: [...prevData.rbac_context, permission],
  //   }));
  // }; 
  const handleCheckboxChange = (permissionKey: string) => {
    console.log("key----",permissionKey);
    setData(prevData => {
      let updatedContext = [...prevData.rbac_context];
      const index = updatedContext.indexOf(permissionKey);
      if (index === -1) {
        // Permission not found, add it
        updatedContext.push(permissionKey);
      } else {
        // Permission found, remove it
        updatedContext.splice(index, 1);
      }
      return {
        ...prevData,
        rbac_context: updatedContext
      };
    });
  };
  const handleSave = async (event: any) => {
    event.preventDefault();
    if (JSON.stringify(data.rbac_context) === JSON.stringify(["read:DEFAULT", "write:DEFAULT", "delete:DEFAULT"])) {
      // If no checkboxes are selected, show an error message or handle it as needed
      toast.error("Please select at least one permission", {
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
      return; 
    }
    const modifiedData = replaceUnderscoresWithDots(data);
    console.log("======", modifiedData);
    let response = await updateRole(modifiedData, id);
     console.log("updated", response);
    if (response.status == "success") {
      toggleGetRoleApiState();

      toast.success(response.status, {
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
    handleDrawerClose();
  };
  return (
    <Drawer
      // hideBackdrop = {false}temporary
      anchor="right"
      open={props.open}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={`shadow-sm shadow-dark-container dark:border-l-0 ${classes.drawer}`}
    >
      <div className="h-full bg-white dark:bg-dark-menu-color  ">
        <div className="flex justify-between py-3 px-5 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Edit Role</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <form onSubmit={handleSave} method="POST">
          <div className="flex my-4 mx-4">
            <CustomeInput
              label="Enter Role"
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              require={true}
            />
            <CustomeInput
              type="text"
              label="Role Description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              require={true}
            />
          </div>
          <div className="px-4 py-1 overflow-x-auto">
            <table className="min-w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-textColor text-center dark:bg-tabel-header dark:text-textColor">
                  <th className="px-6 py-3 text-center text-base font-semibold dark:bg-tabel-header dark:text-textColor">
                    Module
                  </th>
                  <th className="px-6 py-3 text-right text-base font-semibold dark:bg-tabel-header dark:text-textColor">
                    Read
                  </th>
                  <th className="px-6 py-3 text-right text-base font-semibold dark:bg-tabel-header dark:text-textColor">
                    Write
                  </th>
                  <th className="px-6 py-3 text-right text-base font-semibold dark:bg-tabel-header dark:text-textColor">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissionsData.map((permission) => (
                  <tr
                    key={permission.key}
                    className="text-center border-b-2 dark:bg-dark-container dark:text-textColor"
                  >
                    <td className="bg-white dark:bg-dark-container text-sm dark:text-textColor dark:border-dark-border">
                      {permission.name}
                    </td>
                    <td className="px-6 text-right">
                      <Checkbox
                        className=" dark:text-textColor"
                        checked={data.rbac_context.includes(
                          `read:${permission.key}`
                        )}
                        onChange={() =>
                          handleCheckboxChange(`read:${permission.key}`)
                        }
                      />
                    </td>
                    <td className="px-6 text-right">
                      <Checkbox
                        className=" dark:text-textColor"
                        checked={data.rbac_context.includes(
                          `write:${permission.key}`
                        )}
                        onChange={() =>
                          handleCheckboxChange(`write:${permission.key}`)
                        }
                      />
                    </td>
                    <td className="px-6 text-right">
                      <Checkbox
                        className=" dark:text-textColor"
                        checked={data.rbac_context.includes(
                          `delete:${permission.key}`
                        )}
                        onChange={() =>
                          handleCheckboxChange(`delete:${permission.key}`)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fixed bottom-0 right-0 p-2 flex justify-end mt-6">
            <div>
              {/* <SubmitButton title="Save" /> */}
              <button
                className=" mx-2 inline-flex items-center justify-center rounded-md py-1 px-6 text-center font-medium text-white bg-primary2 hover:bg-opacity-90 lg:px-6 xl:px-6 cursor-pointer"
                type="submit"
              >
                Save
              </button>
            </div>
            <div onClick={handleDrawerClose}>
              <CustomeCancelButton title="Cancel" />
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default EditRoleDrawer;
