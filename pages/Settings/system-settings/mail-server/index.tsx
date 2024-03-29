import React, { useEffect, useRef, useState } from "react";
import {
  replaceDotsWithUnderscores,
  replaceUnderscoresWithDots,
} from "@/functions/genericFunctions";
import CustomeInput from "@/pages/Components/Inputs";
import { getSMTPServer, updateSMTPServer } from "@/pages/api/api/SMTPServerAPI";

import { Bounce, toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Button, ButtonGroup, InputLabel, Paper, styled } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { CustomeCancelButton } from "@/pages/Components/Buttons";
import "react-toastify/dist/ReactToastify.css";

// const initialState = {
//   smtp_enabled: "no",
//   smtp_hostname: "",
//   smtp_port: 0,
//   sender_email: "",
//   smtp_security: "NONE",
//   smtp_authentication: "no",
//   smtp_username: "",
//   smtp_password: "",
// };

const MailServer = () => {
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
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isAuthEnabled, setIsAuthEnabled] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState("NONE");
  const [data, setData] = React.useState<any>({});
  const [originalData, setOriginalData] = useState([]);
  const lastSavedData = useRef<any>({});
  useEffect(() => {
    try {
      const getData = async () => {
        let response = await getSMTPServer();
        const modifiedData = replaceDotsWithUnderscores(response.result);
        //  console.log("get data", modifiedData);
        setData(modifiedData);
        //  setOriginalData(modifiedData);
        lastSavedData.current = { ...modifiedData };
        modifiedData.smtp_enabled == "yes"
          ? setIsEmailEnabled(true)
          : setIsEmailEnabled(false);

        modifiedData.smtp_authentication == "yes"
          ? setIsAuthEnabled(true)
          : setIsAuthEnabled(false);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  // //  console.log("usse", isEmailEnabled);
  //   if (isEmailEnabled) {
  //     setData({
  //       ...data,
  //       smtp_enabled: isEmailEnabled ? "yes" : "no",
  //     });

  //   } else {
  //     setData({
  //       smtp_enabled: "no",
  //       smtp_hostname: "",
  //       smtp_port: 0,
  //       sender_email: "",
  //       smtp_security: "NONE",
  //       smtp_authentication: "no",
  //       smtp_username: "",
  //       smtp_password: "",
  //     });
  //   }
  // }, [isEmailEnabled]);

  useEffect(() => {
    setData({
      ...data,
      smtp_authentication: isAuthEnabled ? "yes" : "no",
    });
  }, [isAuthEnabled]);
  // useEffect(() => {
  //   setData((prevData: any) => {
  //     if (isAuthEnabled) {
  //       // Keep data as it is
  //       return {
  //         ...prevData,
  //         smtp_authentication: "yes",
  //       };
  //     } else {

  //       return {
  //         ...prevData,
  //         smtp_username: "",
  //       smtp_password: "",
  //       };
  //     }
  //   });
  // }, [isAuthEnabled]);

  useEffect(() => {
    setData({
      ...data,
      smtp_enabled: isEmailEnabled ? "yes" : "no",
    });
  }, [isEmailEnabled]);

  const handleSwitchChange = () => {
    // console.log("email", isEmailEnabled);
    setIsEmailEnabled(!isEmailEnabled);
    setData({
      ...data,
      smtp_enabled: isEmailEnabled ? "yes" : "no",
    });
  };
  //console.log("sntp enable",data)
  const handleAuthChange = () => {
    setIsAuthEnabled(!isAuthEnabled);
    setData({
      ...data,
      smtp_authentication: isAuthEnabled ? "yes" : "no",
      // smtp_username: "",
      //   smtp_password: "",
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    let updatedValue = value;
    if (name == "smtp_port") {
      updatedValue = parseInt(value);
    }
    setData({
      ...data,
      [name]: updatedValue,
    });
  };

  const handleSecurityButtonClick = (securityType: any) => {
    setData({
      ...data,
      smtp_security: securityType,
    });
    setSelectedSecurity(securityType);
  };

  const handleSave = (event: any) => {
    event.preventDefault();

    // console.log("handle save data",data);
    // try {
    //   const updateMailServer = async () => {
    //     if(data.smtp_authentication == "no"){
    //       data.smtp_username = "";
    //       data.smtp_password = "";
    //     } 
        
    //     if(data.smtp_enabled == "no"){
    //       data.smtp_hostname = "",
    //       data.smtp_port = "",
    //       data.sender_email = "",
    //       data.smtp_security = "NONE",
    //       data.smtp_authentication = "no",
    //       data.smtp_username = "",
    //       data.smtp_password = "";
    //     }
    //     const modifiedData = replaceUnderscoresWithDots(data);
    //   // console.log("smtp server data", modifiedData);
    //     let response = await updateSMTPServer(modifiedData);
    //     if (response.status == "success") {
          
    //       toast.success(response.status, {
    //         position: "bottom-right",
    //         autoClose: 1000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //         transition: Bounce,
    //       });
    //       lastSavedData.current = { ...data };
    //     } else {
    //       toast.error(response.message, {
    //         position: "bottom-right",
    //         autoClose: 2000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //         transition: Bounce,
    //       });
    //     }
    //   };
    //   updateMailServer();
     
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const updateMailServer = async () => {
        if (data.smtp_authentication == "no") {
          delete data.smtp_username;
          delete data.smtp_password;
        }

        if (data.smtp_enabled == "no") {
          delete data.smtp_hostname;
          delete data.smtp_port;
          delete data.sender_email;
          delete data.smtp_security;
          delete data.smtp_authentication;
          delete data.smtp_username;
          delete data.smtp_password;

        }
        const modifiedData = replaceUnderscoresWithDots(data);
        console.log("smtp server data", modifiedData);
        let response = await updateSMTPServer(modifiedData);
        if (response.status == "success") {
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
          lastSavedData.current = { ...data };
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
      };

      updateMailServer();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setData({ ...lastSavedData.current });
    setIsEmailEnabled(lastSavedData.current.smtp_enabled === "yes");
    setIsAuthEnabled(lastSavedData.current.smtp_authentication === "yes");
    setSelectedSecurity(lastSavedData.current.smtp_security);
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSave} method="POST">
        <div className="flex justify-start px-4 pt-4">
          <FormGroup>
            <FormControlLabel
              className="dark:text-textColor"
              labelPlacement="start"
              control={
                <Android12Switch
                  checked={isEmailEnabled}
                  onChange={handleSwitchChange}
                />
              }
              label="Enable Email"
            />
          </FormGroup>
        </div>
        {isEmailEnabled && (
          <div className="px-4">
            <div className="flex ">
              <CustomeInput
                type="text"
                label="SMTP Hostname"
                name="smtp_hostname"
                value={data.smtp_hostname}
                onChange={handleChange}
                require={true}
              />
              <CustomeInput
                type="number"
                label="SMTP Port"
                name="smtp_port"
                value={data.smtp_port}
                onChange={handleChange}
                require={true}
              />
              <CustomeInput
                type="email"
                label="Sender Email"
                name="sender_email"
                value={data.sender_email}
                onChange={handleChange}
                require={true}
              />
              <div className="mx-6">
                <label className="block text-md font-medium text-gray-700 dark:text-textColor">
                  Security
                </label>
                <ButtonGroup
                  className="py-1"
                  variant="outlined"
                  aria-label="Basic button group"
                >
                  <Button
                    onClick={() => handleSecurityButtonClick("NONE")}
                    style={{
                      backgroundColor:
                        selectedSecurity == "NONE" ? "#0078d4" : "",
                      color: selectedSecurity == "NONE" ? "white" : "",
                    }}
                    // style={{
                    //   backgroundColor:
                    //     selectedSecurity === "NONE" ? "blue" : "inherit",
                    //   color: selectedSecurity === "NONE" ? "white" : "inherit",
                    // }}
                  >
                    NONE
                  </Button>
                  <Button
                    onClick={() => handleSecurityButtonClick("SSL")}
                    style={{
                      backgroundColor:
                        selectedSecurity == "SSL" ? "#0078d4" : "",
                      color: selectedSecurity == "SSL" ? "white" : "",
                    }}
                  >
                    SSL
                  </Button>
                  <Button
                    onClick={() => handleSecurityButtonClick("TSL")}
                    style={{
                      backgroundColor:
                        selectedSecurity == "TSL" ? "#0078d4" : "",
                      color: selectedSecurity == "TSL" ? "white" : "",
                    }}
                  >
                    TSL
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <div className="flex justify-start pt-4">
              <FormGroup>
                <FormControlLabel
                  className="dark:text-textColor"
                  labelPlacement="start"
                  control={
                    <Android12Switch
                      checked={isAuthEnabled}
                      onChange={handleAuthChange}
                    />
                  }
                  label="Authentication"
                />
              </FormGroup>
            </div>
            {isAuthEnabled && (
              <div className="flex">
                <CustomeInput
                  type="text"
                  label="Username"
                  name="smtp_username"
                  value={data.smtp_username}
                  onChange={handleChange}
                />
                <CustomeInput
                  type="password"
                  label="Password"
                  name="smtp_password"
                  value={data.smtp_password}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        )}
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
          <div onClick={handleCancel}>
            <CustomeCancelButton title="Cancel" />
          </div>
        </div>
      </form>
    </>
  );
};

export default MailServer;
