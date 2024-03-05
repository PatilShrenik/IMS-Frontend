import { Drawer } from "@mui/material";
import React, { useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Select from "react-select";
import CustomeInput from "../Inputs";
import { useAppContext } from "../AppContext";
import { Bounce, toast } from "react-toastify";
import {
  getAllKeys,
  replaceDotsWithUnderscores,
  replaceUnderscoresWithDots,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import { createCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import CustomeButton, { CustomeCancelButton } from "../Buttons";
import SingleSelect from "../Selects";
import { makeStyles } from "@material-ui/core/styles";

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
const CredentialProfileDrawer = (props: any) => {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();

  const [protocol, setProtocol] = React.useState<any>("SNMPv1");
  const [authType, setAuthType] = React.useState("");
  const { togglegetCredProfileApiState } = useAppContext();
  const [encryptType, setEncryptType] = React.useState("");
  const [msg_flag, setMsgFlag] = React.useState("");
  const [errorKeys, setErrorKeys] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<any>({});
  const [snmpObject, setSnmpObject] = React.useState({
    name: "",
    protocol: "SNMP",
    credential_context: {
      snmp_version: "",
      snmp_community: "",
    },
  });
  const [snmpv3Object, setSnmpv3Object] = React.useState({
    name: "",
    protocol: "SNMP",
    credential_context: {
      snmp_version: "v3",
      snmp_msg_flag: msg_flag,
      username: "",
      authentication_password: "",
      authentication_protocol: authType,
      privacy_protocol: encryptType,
      privacy_password: "",
    },
  });
  const [sshObject, setSSHObject] = React.useState({
    name: "",
    protocol: "SSH",
    credential_context: {
      username: "",
      password: "",
    },
    public_key: "",
    paraphase: "",
  });

  React.useEffect(() => {
    if (open == false) {
      setSnmpObject({
        name: "",
        protocol: "SNMP",
        credential_context: {
          snmp_version: "",
          snmp_community: "",
        },
      });
      setSnmpv3Object({
        name: "",
        protocol: "SNMP",
        credential_context: {
          snmp_version: "v3",
          snmp_msg_flag: "",
          username: "",
          authentication_password: "",
          authentication_protocol: "",
          privacy_protocol: "",
          privacy_password: "",
        },
      });
      setSSHObject({
        name: "",
        protocol: "SSH",
        credential_context: {
          username: "",
          password: "",
        },
        public_key: "",
        paraphase: "",
      });
      setProtocol("SNMPv1");
    }
  }, [open]);

  useEffect(() => {
    const error = replaceDotsWithUnderscores(errors);
    console.log("errors", errors);
    console.log("er===", error);
    // const errorKey = err && Object.keys(err);
    const errorKeys: string[] = error ? getAllKeys(error) : [];
    //  const  errorKey = err && err.credential_context && Object.keys(err.credential_context);

    console.log("err---------", errorKeys);
    setErrorKeys(errorKeys);
  }, [errors]);

  const msg_flag_values = [
    {
      id: "no.auth.no.priv",
      name: "No Auth No Privacy",
    },
    {
      id: "auth.no.priv",
      name: "Auth No Privacy",
    },
    {
      id: "auth.priv",
      name: "Auth Privacy",
    },
  ];

  const handleChange = (values: any) => {
    setProtocol(values);
    console.log("values-----------", values);
    let value = "";
    if (values == "SNMPv1") {
      value = "V1";
    } else {
      value = "V2C";
    }
    setSnmpObject((prevSnmpObject) => ({
      ...prevSnmpObject,
      credential_context: {
        ...prevSnmpObject.credential_context,
        snmp_version: value,
      },
    }));
  };
  const handleAuthChange = (values: any) => {
    setAuthType(values);
  };
  const handleFlagChange = (values: any) => {
    setMsgFlag(values);
  };
  console.log("msg",msg_flag);
  const handleEncryptChange = (values: any) => {
    setEncryptType(values);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setSnmpObject((prevSnmpObject) => ({
      ...prevSnmpObject,
      credential_context: {
        ...prevSnmpObject.credential_context,
        [name]: value,
      },
    }));
  };

  const handleInputSSHChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject((prevSnmpObject) => ({
      ...prevSnmpObject,
      credential_context: {
        ...prevSnmpObject.credential_context,
        [name]: value,
      },
    }));
  };

  const handleInputSNMPv3Change = (event: any) => {
    const { name, value } = event.target;
    setSnmpv3Object((prevSnmpObject) => ({
      ...prevSnmpObject,
      credential_context: {
        ...prevSnmpObject.credential_context,
        [name]: value,
      },
    }));
  };

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject({ ...sshObject, [name]: value });
  };

  const handleNameChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject({ ...sshObject, [name]: value });
    setSnmpObject({ ...snmpObject, [name]: value });
    setSnmpv3Object({ ...snmpv3Object, [name]: value });
  };
  const drawerClose = () => {
    props.handleDrawerClose(); // This might include calling setOpen(false) or similar

    // Clear errors when closing the drawer
    setErrors({});
  };

  const handleSSHSave = () => {
    const modifiedData = replaceUnderscoresWithDots(sshObject);
    console.log("ssh object", modifiedData);
    try {
      const createprofile = async () => {
        let response = await createCredsProfile(modifiedData);
        console.log(response);
        if (response) {
          if (response.status == "success") {
            togglegetCredProfileApiState();
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
            handleDrawerClose();
          } else {
            setErrors(response.errors);
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
        }
      };
      createprofile();
      //setProtocol(null);
      // setSSHObject({
      //   name: "",
      //   protocol: "SSH",
      //   credential_context: {
      //     username: "",
      //     password: "",
      //   },
      //   public_key: "",
      //   paraphase: "",
      // });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("open in cred prof", open);

  const handlesnmpSave = () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDots(snmpObject);
    console.log("snmp object", modifiedData);
    try {
      const createprofile = async () => {
        let response = await createCredsProfile(modifiedData);
        response && console.log(response);
        if (response) {
          if (response.status == "success") {
            togglegetCredProfileApiState();
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
            handleDrawerClose();
          } else {
            setErrors(response.errors);
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
        }
      };
      createprofile();
      // setProtocol(null);
      // setSnmpObject({
      //   name: "",
      //   protocol: "SNMP",
      //   credential_context: {
      //     snmp_version: "",
      //     snmp_community: "",
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSNMPv3Save = () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDots(snmpv3Object);
    console.log("snmpv3 Object ", modifiedData);
    try {
      const createprofile = async () => {
        let response = await createCredsProfile(modifiedData);
        console.log(response);
        if (response) {
          if (response.status == "success") {
            togglegetCredProfileApiState();
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
          } else setErrors(response.errors);
          {
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
        }
      };
      createprofile();
      //setProtocol(null);
      // setSnmpObject({
      //   name: "",
      //   protocol: "SNMP",
      //   credential_context: {
      //     snmp_version: "",
      //     snmp_community: "",
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer
      // hideBackdrop = {false}temporary
      anchor="right"
      open={props.open}
      // transitionDuration
      // className={classes.drawer}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={`shadow-sm shadow-dark-container dark:border-l-0 ${classes.drawer}`}
    >
      <div className="h-full bg-white dark:bg-dark-menu-color  ">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Add Credential Profile</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={drawerClose}
          />
        </div>
        <div className="py-8 px-6">
          <form>
            <div className="flex">
              <div className="flex flex-col items-start mx-2">
                <CustomeInput
                  label="Profile Name"
                  name="name"
                  value={snmpObject.name}
                  onChange={handleNameChange}
                  type="text"
                  disable={false}
                  require={true}
                />
                {errorKeys && errorKeys.includes("name") && (
                  <p className="text-danger text-sm ml-2">
                    Name is {errors["name"]}*
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start mx-2">
                {/* <Select options={options} className="p-4 bg-red-900"/> */}
                <SingleSelect
                  className="dark:text-textColor "
                  label="Protocol"
                  selectData={["SNMPv1", "SNMPv2c", "SNMPv3", "SSH"]}
                  onChange={handleChange}
                  require={false}
                />
                {/* {errorKeys && errorKeys.includes("protocol") && (
                  <p className="text-danger text-sm ml-2">
                    protocol is {errors["protocol"]}*
                  </p>
                )} */}
              </div>
            </div>
            {protocol == "SNMPv2c" || protocol == "SNMPv1" ? (
              <div className="">
                <div className="flex flex-col items-start mx-4 my-4">
                  <CustomeInput
                    label="Community"
                    name="snmp_community"
                    value={snmpObject.credential_context.snmp_community}
                    onChange={handleInputChange}
                    type="text"
                    disable={false}
                    require={true}
                  />
                  {errorKeys && errorKeys.includes("snmp_community") && (
                    <p className="text-danger text-sm ml-2">
                      Community is required
                    </p>
                  )}
                </div>
                <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                  <div onClick={handlesnmpSave}>
                    <CustomeButton title="Save" />
                  </div>
                  {/* <CustomeButtons title="Save & Discover" /> */}
                  <div onClick={drawerClose}>
                    <CustomeCancelButton title="Cancel" />
                  </div>
                </div>
              </div>
            ) : protocol == "SNMPv3" ? (
              <div className="">
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="flex flex-col items-start mx-2">
                      <CustomeInput
                        label="UserName"
                        name="username"
                        value={snmpv3Object.credential_context.username}
                        onChange={handleInputSNMPv3Change}
                        type="text"
                        disable={false}
                        require={false}
                      />{" "}
                      {errorKeys && errorKeys.includes("username") && (
                        <p className="text-danger text-sm ml-2">
                          Username is {errors["username"]}*
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start mx-2">
                      <SingleSelect
                        label="Security"
                        selectData={msg_flag_values}
                        onChange={handleFlagChange}
                        // require={true}
                      />
                    </div>
                   
                  </div>
                  {msg_flag === 'auth.priv' && (
                  <div>
                  <div className="flex">
                  <div className="flex flex-col items-start mx-2">
                      <CustomeInput
                        label="Authentication Password"
                        name="authentication_password"
                        value={
                          snmpv3Object.credential_context
                            .authentication_password
                        }
                        onChange={handleInputSNMPv3Change}
                        type="password"
                        disable={false}
                        require={false}
                      />
                      {errorKeys && errorKeys.includes("password") && (
                        <p className="text-danger text-sm ml-2">
                          Password is {errors["password"]}*
                        </p>
                      )}
                    </div>
                   
                    <div className="flex flex-col items-start mx-2">
                      <SingleSelect
                        label="Authentication Protocol"
                        selectData={["None", "MD5", "SHA"]}
                        onChange={handleAuthChange}
                        require={false}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-start mx-2">
                      <SingleSelect
                        label="Privacy Protocol"
                        selectData={["None", "AES", "DES"]}
                        onChange={handleEncryptChange}
                        require={false}
                      />
                    </div>
                    <div className="flex flex-col items-start mx-2">
                      <CustomeInput
                        label="Privacy Password"
                        name="privacy_password"
                        value={snmpv3Object.credential_context.privacy_password}
                        onChange={handleInputSNMPv3Change}
                        type="password"
                        disable={false}
                        require={false}
                      />
                      {errorKeys && errorKeys.includes("privacy_password") && (
                        <p className="text-danger text-sm ml-2">
                          Encryption Key is {errors["privacy_password"]}*
                        </p>
                      )}
                    </div>
                  </div>
                  </div>
                  )}
                </div>
                <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                  <div onClick={handleSNMPv3Save}>
                    <CustomeButton title="Save" />
                  </div>
                  <div onClick={drawerClose}>
                    <CustomeCancelButton title="Cancel" />
                  </div>
                </div>
              </div>
            ) : protocol == "SSH" ? (
              <div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="flex flex-col items-start mx-2">
                      <CustomeInput
                        label="UserName"
                        name="username"
                        value={sshObject.credential_context.username}
                        onChange={handleInputSSHChange}
                        type="text"
                        disable={false}
                        //   require={true}
                      />
                    </div>
                    <div className="flex flex-col items-start mx-2">
                      <CustomeInput
                        label="Password"
                        name="password"
                        value={sshObject.credential_context.password}
                        onChange={handleInputSSHChange}
                        type="password"
                        disable={false}
                        //   require={true}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-start mx-2">
                      <CustomeInput
                        label="SSH Public Key"
                        name="public_key"
                        value={sshObject.public_key}
                        onChange={handleFieldChange}
                        type="text"
                        disable={false}
                        //  require={true}
                      />
                    </div>
                    <div className="flex flex-col items-start mx-2">
                      <CustomeInput
                        label="Paraphrase"
                        name="paraphase"
                        value={sshObject.paraphase}
                        onChange={handleFieldChange}
                        type="text"
                        disable={false}
                        //require={true}
                      />
                    </div>
                  </div>
                </div>

                <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                  <div onClick={handleSSHSave}>
                    <CustomeButton title="Save" />
                  </div>
                  <div onClick={drawerClose}>
                    <CustomeCancelButton title="Cancel" />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </Drawer>
  );
};

export default CredentialProfileDrawer;
