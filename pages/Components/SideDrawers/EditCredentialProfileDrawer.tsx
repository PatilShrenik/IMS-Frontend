import { Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Select from "react-select";
import CustomeInput from "../Inputs";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";
import replacePeriodsWithUnderscoresSingleObject, {
  replaceDotsWithUnderscores,
  replaceUnderscoresWithDots,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import {
  createCredsProfile,
  getCredsProfileById,
  updateCredsProfile,
} from "@/pages/api/api/CredentialProfileAPI";
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
const EditCredentialProfileDrawer = (props: any) => {
  const { rowId, open, handleDrawerClose } = props;
  const [data, setData] = useState<any>({});
  const [protocol, setProtocol] = React.useState<any>("");
  const classes = useStyles();
  const { togglegetCredProfileApiState } = useAppContext();
  const [authType, setAuthType] = React.useState("");
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

  useEffect(() => {
    // console.log(id);
    const getById = async () => {
      let response = await getCredsProfileById(rowId);
      console.log("rowid", rowId);
      const modifiedData = replaceDotsWithUnderscores(response.result);
      console.log("data-----------------", modifiedData);
      setData(modifiedData);
    };
    getById();

    const savedProtocolValue =
      data && data.credential_context && data.credential_context.snmp_version
        ? `${data.protocol}${data.credential_context.snmp_version}`
        : data && data.protocol;
    setProtocol(savedProtocolValue);
  }, [open]);
  useEffect(() => {
    if (protocol == "SNMPV2C" || protocol == "SNMPV1") {
      setSnmpObject({
        name: data.name,
        protocol: "SNMP",
        credential_context: {
          snmp_version: data.credential_context.snmp_version,
          snmp_community: data.credential_context.snmp_community,
        },
      });
    } else if (protocol == "SNMPV3") {
      setSnmpv3Object({
        name: data.name,
        protocol: "SNMP",
        credential_context: {
          snmp_version: "v3",
          snmp_msg_flag: msg_flag,
          username: data.credential_context.username,
          authentication_password: data.credential_context.password,
          authentication_protocol: authType,
          privacy_protocol: encryptType,
          privacy_password: data.credential_context.privacy_password,
        },
      });
    } else if (protocol == "SSH") {
      setSSHObject({
        name: data.name,
        protocol: "SSH",
        credential_context: {
          username: data.credential_context.username,
          password: data.credential_context.password,
        },
        public_key: "",
        paraphase: "",
      });
    }
  }, [protocol]);

  console.log("open", open);
  console.log("protocol", protocol);
  // console.log("snmp", snmpObject);
  // console.log("ssh",sshObject);
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

  const handleNameChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handlesnmpSave = async () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDotsNested(data);
    console.log("snmp object", modifiedData);

    let response = await updateCredsProfile(modifiedData, modifiedData._id);
    console.log("updated", response);
    if (response.status == "success") {
      togglegetCredProfileApiState();
      handleDrawerClose();
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

  const handleSSHSave = async () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDotsNested(data);
    console.log("ssh object", modifiedData);

    let response = await updateCredsProfile(modifiedData, modifiedData._id);
    console.log("updated", response);
    if (response.status == "success") {
      togglegetCredProfileApiState();
      handleDrawerClose();
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
  const handleChange = (values: any) => {
    setProtocol(values);
    console.log(values);
    let value = "";
    if (values == "SNMPV1") {
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

  return (
    <Drawer
      anchor="right"
      open={open}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={`shadow-sm shadow-dark-container ${classes.drawer}`}
    >
      <div className="h-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p
            style={{ fontSize: "17px" }}
            className="text-primary2 font-semibold"
          >
            Edit Credential Profile
          </p>
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
                value={data.name}
                onChange={handleNameChange}
                type="text"
                disable={false}
                require={true}
              />
              <SingleSelect
                label="Protocol"
                value={protocol}
                selectData={["SNMPV1", "SNMPV2C", "SNMPV3", "SSH"]}
                onChange={handleChange}
                require={true}
              />
            </div>
            {/* {data.protocol === "SNMP" &&
              data.credential_context &&
              (data.credential_context.snmp_version === "V2C" ||
              data.credential_context.snmp_version === "V1" ? (
                <div className="">
                  <CustomeInput
                    label="Community"
                    name="snmp_community"
                    value={data.credential_context.snmp_community}
                    onChange={handleInputChange}
                    type="text"
                    disable={false}
                    require={true}
                  />
                  <div className="fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                    <div onClick={handlesnmpSave}>
                      <CustomeButton title="Save" />
                    </div>
                    <div onClick={handleDrawerClose}>
                      <CustomeCancelButton title="Cancel" />
                    </div>
                  </div>
                </div>
              ) : data.protocol == "SNMP" && data.credential_context && data.credential_context.snmp_version == "V3" ? (
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
              ): data.protocol == "SSH" ? (
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
                    <div onClick={handlesshSave}>
                      <CustomeButton title="Save" />
                    </div>
                    <div onClick={handleDrawerClose}>
                      <CustomeCancelButton title="Cancel" />
                    </div>
                  </div>
                </div>
              ) : ("") )} */}
            {protocol == "SNMPV2C" || protocol == "SNMPV1" ? (
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
            ) : protocol == "SNMPV3" ? (
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
                    {/* <SingleSelect
                      label="Message Flag"
                      selectData={msg_flag_values}
                      onChange={handleFlagChange}
                      // require={true}
                    /> */}
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

export default EditCredentialProfileDrawer;
