import { Drawer } from "@mui/material";
import React from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Select from "react-select";
import CustomeInput from "../Inputs";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";
import { replaceUnderscoresWithDots } from "@/functions/genericFunctions";
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
  const { togglegetCredProfileApiState } =
  useAppContext();
  const [encryptType, setEncryptType] = React.useState("");
  const [msg_flag, setMsgFlag] = React.useState("");
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
    {
      id: "reportable",
      name: "Reportable",
    },
  ];
  const handleChange = (values: any) => {
    setProtocol(values);
    console.log(values);
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

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject({ ...sshObject, [name]: value });
  };

  const handleNameChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject({ ...sshObject, [name]: value });
    setSnmpObject({ ...snmpObject, [name]: value });
  };

  const handleSSHSave = () => {
    const modifiedData = replaceUnderscoresWithDots(sshObject);
    console.log("snmp object", modifiedData);
    try {
      const createprofile = async () => {
        let response = await createCredsProfile(modifiedData);
        console.log(response);
        if (response.status == "success") {
           togglegetCredProfileApiState();
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
      createprofile();
      setProtocol(null);
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
    handleDrawerClose();
  };
  // console.log("open in cred prof", open);

  const handlesnmpSave = () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDots(snmpObject);
    console.log("snmp object", modifiedData);
    try {
      const createprofile = async () => {
        let response = await createCredsProfile(modifiedData);
        console.log(response);
        if (response.status == "success") {
           togglegetCredProfileApiState();
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
      createprofile();
      setProtocol(null);
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
    handleDrawerClose();
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
      className={`shadow-sm shadow-dark-container ${classes.drawer}`}
    >
      <div className="h-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Add Credential Profile</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={props.handleDrawerClose}
          />
        </div>
        <div className="py-8 px-6">
          <form>
            <div className="flex">
              <CustomeInput
                label="Profile Name"
                name="name"
                value={snmpObject.name}
                onChange={handleNameChange}
                type="text"
                disable={false}
                require={true}
              />
              {/* <Select options={options} className="p-4 bg-red-900"/> */}
              <SingleSelect
                label="Protocol"
                selectData={["SNMPv1", "SNMPv2c", "SNMPv3", "SSH"]}
                onChange={handleChange}
                require={true}
              />
            </div>
            {protocol == "SNMPv2c" || protocol == "SNMPv1" ? (
              <div className="">
                <CustomeInput
                  label="Community"
                  name="snmp_community"
                  value={snmpObject.credential_context.snmp_community}
                  onChange={handleInputChange}
                  type="text"
                  disable={false}
                  require={true}
                />
                <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                  <div onClick={handlesnmpSave}>
                    <CustomeButton title="Save" />
                  </div>
                  {/* <CustomeButtons title="Save & Discover" /> */}
                  <div onClick={handleDrawerClose}>
                    <CustomeCancelButton title="Cancel" />
                  </div>
                </div>
              </div>
            ) : protocol == "SNMPv3" ? (
              <div className="">
                <div className="flex flex-col">
                  <div className="flex">
                    <CustomeInput
                      label="UserName"
                      name="username"
                      value={snmpv3Object.credential_context.username}
                      onChange={handleInputSSHChange}
                      type="text"
                      disable={false}
                      require={true}
                    />
                    <CustomeInput
                      label="Authentication Password"
                      name="authentication_password"
                      value={
                        snmpv3Object.credential_context.authentication_password
                      }
                      onChange={handleInputSSHChange}
                      type="password"
                      disable={false}
                      require={true}
                    />
                  </div>
                  <div className="flex">
                    <SingleSelect
                      label="Message Flag"
                      selectData={msg_flag_values}
                      onChange={handleFlagChange}
                      // require={true}
                    />
                    <SingleSelect
                      label="Authentication Protocol"
                      selectData={["None", "MD5", "SHA"]}
                      onChange={handleAuthChange}
                      require={true}
                    />
                  </div>
                  <div className="flex">
                    <SingleSelect
                      label="Privacy Protocol"
                      selectData={["None", "AES", "DES"]}
                      onChange={handleEncryptChange}
                      require={true}
                    />
                    <CustomeInput
                      label="Encryption Key"
                      name="privacy_password"
                      value={snmpv3Object.credential_context.privacy_password}
                      onChange={handleInputSSHChange}
                      type="password"
                      disable={false}
                      require={true}
                    />
                  </div>
                </div>
                <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                  <CustomeButton title="Save" />
                  <div onClick={handleDrawerClose}>
                    <CustomeCancelButton title="Cancel" />
                  </div>
                </div>
              </div>  
            ) : protocol == "SSH" ? (
              <div>
                <div className="flex flex-col">
                  <div className="flex">
                    <CustomeInput
                      label="UserName"
                      name="username"
                      value={sshObject.credential_context.username}
                      onChange={handleInputSSHChange}
                      type="text"
                      disable={false}
                      require={true}
                    />
                    <CustomeInput
                      label="Password"
                      name="password"
                      value={sshObject.credential_context.password}
                      onChange={handleInputSSHChange}
                      type="password"
                      disable={false}
                      require={true}
                    />
                  </div>
                  <div className="flex">
                    <CustomeInput
                      label="SSH Public Key"
                      name="public_key"
                      value={sshObject.public_key}
                      onChange={handleFieldChange}
                      type="text"
                      disable={false}
                      require={true}
                    />
                    <CustomeInput
                      label="Paraphrase"
                      name="paraphase"
                      value={sshObject.paraphase}
                      onChange={handleFieldChange}
                      type="text"
                      disable={false}
                      require={true}
                    />
                  </div>
                </div>

                <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                  <div onClick={handleSSHSave}>
                    <CustomeButton title="Save" />
                  </div>
                  <div onClick={handleDrawerClose}>
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
