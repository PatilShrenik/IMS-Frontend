import React, { useEffect, useState } from "react";
import { Box, Drawer, FormControlLabel, FormGroup } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Bounce, toast } from "react-toastify";
import { CustomProvider, DatePicker, DateRangePicker } from "rsuite";
import Button from "@mui/material/Button";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CustomeInput, { DateInput } from "../Inputs";
import { ButtonGroup } from "@mui/material";
import { CustomeCancelButton } from "../Buttons";
import { useAppContext } from "../AppContext";
import {
    replaceDotsWithUnderscores,
    replaceDotsWithUnderscoresSec,
    replaceUnderscoresWithDots,
    replaceUnderscoresWithDotsNested,
  } from "@/functions/genericFunctions";
  import SingleSelect from "../Selects";
  
import { createUser, getUserById, updateUser } from "@/pages/api/api/UserManagementAPI";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material";
import { getAllRole, getRoleById } from "@/pages/api/api/RoleManagementAPI";
import { getUserData } from "@/pages/api/getUserData";
const useStyles = makeStyles(() => ({
  drawer: {
    width: "60%",
  },
}));

const initialState = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email_address: "",
  enable: "yes",
  role: null,

};

const EditUserDrawer = (props: any) => {
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      // "&:before": {
      //   backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
      //     theme.palette.getContrastText(theme.palette.primary.main)
      //   )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      //   left: 12,
      // },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));
    const { open, handleDrawerClose, id } = props;
    const classes = useStyles();
    const [allRoles, setAllRoles] = React.useState([]);
    const { themeSwitch, toggleGetUserApiState } = useAppContext();
    const [data, setData] = React.useState<any>(initialState);
    const [selectedValue, setSelectedValue] = React.useState<any>([]);
    const [isAuthEnabled, setIsAuthEnabled] = useState(true);

  const roleValues =
  allRoles &&
  allRoles.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));

  React.useEffect(() => {
    if (open) {
      try {
        const getUser = async () => {
          console.log("edit id----", id);
          let response = await getUserById(id);
          console.log("-----DD", response.result);
          const modifiedData = replaceDotsWithUnderscores(response.result);
          setData(modifiedData); 

          modifiedData.enable == "yes"
          ? setIsAuthEnabled(true)
          : setIsAuthEnabled(false);
        };
        getUser();
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, open]);
  useEffect(() => {
    if (data && data.role) {
      setSelectedValue(data.role);
    }
  }, [data]);
  
  React.useEffect(() => {
    try {
      const getRoles = async () => {
        let response = await getAllRole();
       
        setAllRoles(response.result);
      };
      getRoles();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    setData({
      ...data,
      enable: isAuthEnabled ? "yes" : "no",
    });
  }, [isAuthEnabled]);
  

  const handleRole = (value: any) => {
    setData({
      ...data,
      role: value,
    });
  };


  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleInputPasswordChange = (event: any) => {
    const { name, value } = event.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value !== '' ? value : prevData[name],
    }));
  };


  const handleSave = async (event: any) => {
    event.preventDefault();
    const modifiedData = replaceUnderscoresWithDots(data);
    console.log("======", modifiedData);
    let response = await updateUser(modifiedData, id);
    // console.log("updated", response);
    if (response.status == "success") {
      toggleGetUserApiState();
      
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
  const handleEnable = () => {
    setIsAuthEnabled(!isAuthEnabled);
    // setData({
    //   ...data,
    //   enable: isAuthEnabled ? "yes" : "no",
 
    // });
    
  };

  return (
    <Drawer
      // hideBackdrop = {false}temporary
      anchor="right"
      open={props.open}
      // transitionDuration
      // className={classes.drawer}
      variant="temporary"
      classes={{ paper: classes.drawer }}
      className={`shadow-sm shadow-dark-container w-full overflow-y-auto ${classes.drawer}`}
    >
         <div className="h-full bg-white dark:bg-dark-menu-color px-4">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">
            {" "}
            Edit User{" "}
          </p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <form onSubmit={handleSave} method="POST">
          <div className="grid grid-flow-row-dense grid-cols-2 my-4">
            <CustomeInput
              label="Username"
              name="username"
              value={data.username}
              onChange={handleInputChange}
              type="text"
              disable={false}
              require={true}
            />
            <CustomeInput
              type="password"
              label="Password"
              name="password"
              value={data.password}
              onChange={handleInputPasswordChange}
              disable={false}
              // require={true}
            />
            <CustomeInput
              label="Enter First name"
              name="first_name"
              value={data.first_name}
              onChange={handleInputChange}
              type="text"
              disable={false}
              require={true}
            />
            <CustomeInput
              label="Enter Last name"
              name="last_name"
              value={data.last_name}
              onChange={handleInputChange}
              type="text"
              disable={false}
              require={true}
            />
            <CustomeInput
              label="Enter email"
              name="email_address"
              value={data.email_address}
              onChange={handleInputChange}
              type="text"
              disable={false}
              require={true}
            />
            <SingleSelect
              label="Select Role"
              value={roleValues.find(
                (option) => option.value === selectedValue
              )}
              selectData={roleValues}
              onChange={handleRole}
             // require={true}
            />
             <div className="flex-col justify-center  px-5 pt-4">
             <div className=" text-lg mx-2  font-medium text-gray-700 dark:text-textColor">Status</div>
          <div style={{ pointerEvents: 'none' }} className="mx-4 items-center">
            <FormGroup>
              <FormControlLabel
                className="dark:text-textColor"
                label={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pointerEvents: 'auto',
                    }}
                  >
                    <span>No</span>
                    <Android12Switch
                      checked={isAuthEnabled}
                      onChange={handleEnable}
                      value={data.enable}
                    />
                    <span>Yes</span>
                  </div>
                }
                control={<div />} 
              />
            </FormGroup>
            </div>
            </div>
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
  )
}

export default EditUserDrawer