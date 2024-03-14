import { Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CustomeInput from "../Inputs";
import { useAppContext } from "../AppContext";
import { Bounce, toast } from "react-toastify";
import replacePeriodsWithUnderscoresSingleObject, {
  replaceDotsWithUnderscores,
  replaceDotsWithUnderscoresSEC,
  replaceUnderscoresWithDots,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import {
  createCredsProfile,
  getCredsProfileById,
  updateCredsProfile,
} from "@/pages/api/api/CredentialProfileAPI";
import SubmitButton, { CustomeCancelButton } from "../Buttons";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import SecSingleSelect from "../Selects/secSelect";

const useStyles = makeStyles(() => ({
  drawer: {
    // width: drawerWidth,
    flexShrink: 100,
  },
  drawerPaper: {
    //  backgroundColor: dark ? "black" : "white",
    borderLeft: 0,
    boxShadow: "-5px 0 5px rgba(0, 0, 0, 0.1)",
    backdropFilter: "brightness(80%)", // Adjust the brightness for opacity
  },
}));
const EditCredentialProfileDrawer = (props: any) => {
  const { rowId, open, handleDrawerClose } = props;
  const [data, setData] = useState<any>({});
  const [protocol, setProtocol] = React.useState<any>("");
  const [protocolValue, setProtocolValue] = React.useState<any>("");
  const classes = useStyles();
  const { togglegetCredProfileApiState } = useAppContext();
  const [authType, setAuthType] = React.useState("");
  // const [authPWD, setAuthPWD] = React.useState("");
  const [encryptType, setEncryptType] = React.useState("");
  const [msg_flag, setMsgFlag] = React.useState("");
  const [msg_flagValue, setMsgFlagValue] = React.useState("");
  const [snmpObject, setSnmpObject] = React.useState({
    name: "",
    protocol: "SNMPV1",
    credential_context: {
      snmp_community: "",
    },
  });
  const [snmpv3Object, setSnmpv3Object] = React.useState({
    name: "",
    protocol: "SNMPV3",
    credential_context: {
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
  ];

  useEffect(() => {
    if (open) {
      const getById = async () => {
        let response = await getCredsProfileById(rowId);
        const modifiedData = replaceDotsWithUnderscoresSEC(response.result);
        console.log("OG data------", response.result);
        console.log("modi data------", modifiedData);
        setData(modifiedData);
      };
      getById();
    }
  }, [open]);

  useEffect(() => {
    if (data && data.protocol == "SNMPV1") {
      setProtocolValue("SNMP v1");
      setProtocol("SNMPV1");
    } else if (data && data.protocol == "SNMPV2C") {
      setProtocolValue("SNMP v2c");
      setProtocol("SNMPV2C");
    } else if (data && data.protocol == "SNMPV3") {
      setProtocolValue("SNMP v3");
      setProtocol("SNMPV3");
      data &&
        data.credential_context &&
        data.credential_context.authentication_protocol &&
        setAuthType(data.credential_context.authentication_protocol);
      data &&
        data.credential_context &&
        data.credential_context.privacy_protocol &&
        setEncryptType(data.credential_context.privacy_protocol);
      if (
        data &&
        data.credential_context &&
        data.credential_context.snmp_security
      ) {
        setMsgFlag(data.credential_context.snmp_security);
        if (data.credential_context.snmp_security == "no.auth.no.priv") {
          setMsgFlagValue("No Auth No Privacy");
        } else if (data.credential_context.snmp_security == "auth.no.priv") {
          setMsgFlagValue("Auth No Privacy");
        } else if (data.credential_context.snmp_security == "auth.priv") {
          setMsgFlagValue("Auth Privacy");
        }
      }
    } else if (data && data.protocol == "SSH") {
      setProtocolValue("SSH");
      setProtocol("SSH");
    }
    console.log("data-------------", data);
  }, [data]);

  useEffect(() => {
    if (data && protocol) {
      if (protocol == "SNMPV1") {
        setSnmpObject({
          name: data.name,
          protocol: "SNMPV1",
          credential_context: {
            snmp_community: data.credential_context.snmp_community,
          },
        });
      } else if (protocol == "SNMPV2C") {
        setSnmpObject({
          name: data.name,
          protocol: "SNMPV2C",
          credential_context: {
            snmp_community: data.credential_context.snmp_community,
          },
        });
      } else if (protocol == "SNMPV3") {
        setSnmpv3Object({
          name: data.name,
          protocol: "SNMPV3",
          credential_context: {
            snmp_msg_flag: msg_flag,
            username: data.credential_context.username,
            authentication_password:
              data.credential_context.authentication_password,
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
          public_key: data.public_key,
          paraphase: data.paraphase,
        });
      }
    }
  }, [protocol, data]);
  console.log("snmp 3", snmpv3Object);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    console.log("community", value);
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

  const handleNameChangeSSH = (event: any) => {
    const { name, value } = event.target;
    setSSHObject({ ...sshObject, [name]: value });
  };

  const handleNameChangeSNMP = (event: any) => {
    const { name, value } = event.target;
    setSnmpObject({ ...snmpObject, [name]: value });
  };

  const handleNameChangeSNMPV3 = (event: any) => {
    const { name, value } = event.target;
    setSnmpv3Object({ ...snmpv3Object, [name]: value });
  };

  const handlesnmpSave = async () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDotsNested(snmpObject);
    // console.log("snmp object", modifiedData);

    let response = await updateCredsProfile(modifiedData, data._id);
    // console.log("updated", response);
    if (response.status == "success") {
      togglegetCredProfileApiState();
      handleDrawerClose();
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
  };

  const handleSSHSave = async () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDotsNested(sshObject);
    // console.log("ssh object", modifiedData);

    let response = await updateCredsProfile(modifiedData, data._id);
    // console.log("updated", response);
    if (response.status == "success") {
      togglegetCredProfileApiState();
      handleDrawerClose();
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
  };

  const handleSNMPv3Save = () => {
    // console.log("snmp object", snmpObject);
    const modifiedData = replaceUnderscoresWithDots(snmpv3Object);
    console.log("snmpv3 Object ", modifiedData);
    try {
      const createprofile = async () => {
        let response = await updateCredsProfile(modifiedData, data._id);
        // console.log(response);
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
  console.log("protocol", protocol);

  const handleChange = (values: any) => {
    setMsgFlag("no.auth.no.priv");
    setMsgFlagValue("No Auth No Privacy");
    if (values == "SNMP v1") {
      setProtocol("SNMPV1");
    } else if (values == "SNMP v2c") {
      setProtocol("SNMPV2C");
    } else if (values == "SNMP v3") {
      setProtocol("SNMPV3");
    } else if (values == "SSH") {
      setProtocol("SSH");
    }
    setProtocolValue(values);

    console.log("protocol------------------", values);
    // let value = "";
    if (values == "SNMPV1") {
      // value = "V1";
      setData((prevSnmpObject: any) => ({
        ...prevSnmpObject,
        protocol: "SNMPV1",
      }));
      // setData((prevSnmpObject: any) => ({
      //   ...prevSnmpObject,
      //   credential_context: {
      //     ...prevSnmpObject.credential_context,
      //     snmp_version: value,
      //   },
      // }));
    } else if (values == "SNMPV2C") {
      // value = "V2C";
      setData((prevSnmpObject: any) => ({
        ...prevSnmpObject,
        protocol: "SNMPV2C",
      }));
      // setData((prevSnmpObject: any) => ({
      //   ...prevSnmpObject,
      //   credential_context: {
      //     ...prevSnmpObject.credential_context,
      //     snmp_version: value,
      //   },
      // }));
    } else if (values == "SNMPV3") {
      // value = "V3";
      setData((prevSnmpObject: any) => ({
        ...prevSnmpObject,
        protocol: "SNMPV3",
      }));
      // setData((prevSnmpObject: any) => ({
      //   ...prevSnmpObject,
      //   credential_context: {
      //     ...prevSnmpObject.credential_context,
      //     snmp_version: value,
      //   },
      // }));
    } else if (values == "SSH") {
      setSSHObject((prevSnmpObject: any) => ({
        ...prevSnmpObject,
        protocol: "SSH",
      }));
    }
  };

  const handleAuthChange = (value: any) => {
    console.log("authtype in fucntion", value);
    setAuthType(value);
    setSnmpv3Object((prevSnmpv3Object) => ({
      ...prevSnmpv3Object,
      credential_context: {
        ...prevSnmpv3Object.credential_context,
        authentication_protocol: value,
      },
    }));
  };
  console.log("authtype in commoj", authType);
  const handleFlagChange = (values: any) => {
    console.log("flag values", values);
    if (values == "No Auth No Privacy") {
      setSnmpv3Object((prevSnmpv3Object) => ({
        ...prevSnmpv3Object,
        credential_context: {
          ...prevSnmpv3Object.credential_context,
          snmp_msg_flag: "no.auth.no.priv",
        },
      }));
      setMsgFlag("no.auth.no.priv");
    } else if (values == "Auth No Privacy") {
      setSnmpv3Object((prevSnmpv3Object) => ({
        ...prevSnmpv3Object,
        credential_context: {
          ...prevSnmpv3Object.credential_context,
          snmp_msg_flag: "auth.no.priv",
        },
      }));
      setMsgFlag("auth.no.priv");
    } else if (values == "Auth Privacy") {
      setSnmpv3Object((prevSnmpv3Object) => ({
        ...prevSnmpv3Object,
        credential_context: {
          ...prevSnmpv3Object.credential_context,
          snmp_msg_flag: "auth.priv",
        },
      }));
      setMsgFlag("auth.priv");
    }
    setMsgFlagValue(values);
  };
  const handleEncryptChange = (values: any) => {
    setEncryptType(values);
    setSnmpv3Object((prevSnmpv3Object) => ({
      ...prevSnmpv3Object,
      credential_context: {
        ...prevSnmpv3Object.credential_context,
        privacy_protocol: values,
      },
    }));
  };

  const handleInputSSHChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject((prevSshObject) => ({
      ...prevSshObject,
      credential_context: {
        ...prevSshObject.credential_context,
        [name]: value,
      },
    }));
  };
  const handleInputSnmpv3Change = (event: any) => {
    const { name, value } = event.target;
    setSnmpv3Object((prevSnmpv3Object) => ({
      ...prevSnmpv3Object,
      credential_context: {
        ...prevSnmpv3Object.credential_context,
        [name]: value,
      },
    }));
  };
  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    setSSHObject({ ...sshObject, [name]: value });
  };
  // console.log("prto", protocol);

  const handleSave = (event: any) => {
    event.preventDefault();
    // console.log("click", event);
    // Choose the appropriate onSubmit method based on the protocol
    if (protocol == "SNMPV2C" || protocol == "SNMPV1") {
      handlesnmpSave();
      // console.log("snmp object", snmpObject);
    } else if (protocol === "SNMPV3") {
      handleSNMPv3Save();
      // console.log("snmpv3 object", snmpv3Object);
    } else if (protocol === "SSH") {
      handleSSHSave();
      // console.log("ssh object", sshObject);
    }
  };
  return (
    <Drawer
      anchor="right"
      open={props.open}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={`shadow-sm  shadow-dark-container ${classes.drawer}`}
    >
      <div className="h-full  dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Edit Credential Profile</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={props.handleDrawerClose}
          />
        </div>
        <div className="py-8 px-6">
          <form onSubmit={handleSave}>
            <div className="flex">
              {protocol == "SSH" && (
                <CustomeInput
                  label="Profile Name"
                  name="name"
                  value={sshObject.name}
                  onChange={handleNameChangeSSH}
                  type="text"
                  disable={false}
                  require={true}
                />
              )}{" "}
              {protocol == "SNMPV1" && (
                <CustomeInput
                  label="Profile Name"
                  name="name"
                  value={snmpObject.name}
                  onChange={handleNameChangeSNMP}
                  type="text"
                  disable={false}
                  require={true}
                />
              )}
              {protocol == "SNMPV2C" && (
                <CustomeInput
                  label="Profile Name"
                  name="name"
                  value={snmpObject.name}
                  onChange={handleNameChangeSNMP}
                  type="text"
                  disable={false}
                  require={true}
                />
              )}
              {protocol == "SNMPV3" && (
                <CustomeInput
                  label="Profile Name"
                  name="name"
                  value={snmpv3Object.name}
                  onChange={handleNameChangeSNMPV3}
                  type="text"
                  disable={false}
                  require={true}
                />
              )}
              <SecSingleSelect
                label="Protocol"
                value={protocolValue}
                selectData={["SNMP v1", "SNMP v2c", "SNMP v3", "SSH"]}
                onChange={handleChange}
                require={false}
              />
            </div>

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
              </div>
            ) : protocol == "SNMPV3" ? (
              <div className="">
                <div className="flex flex-col">
                  <div className="flex">
                    {/* <div className="flex flex-col items-start mx-2"> */}
                    <CustomeInput
                      label="UserName"
                      name="username"
                      value={snmpv3Object.credential_context.username}
                      onChange={handleInputSnmpv3Change}
                      type="text"
                      disable={false}
                      require={true}
                    />{" "}
                    {/* </div> */}
                    {/* <div className="flex flex-col items-start mx-2"> */}
                    <SecSingleSelect
                      label="Security"
                      selectData={[
                        "No Auth No Privacy",
                        "Auth No Privacy",
                        "Auth Privacy",
                      ]}
                      onChange={handleFlagChange}
                      value={msg_flagValue}
                      // require={true}
                    />
                    {/* </div> */}
                  </div>
                  {msg_flag === "auth.priv" ? (
                    <div>
                      <div className="flex">
                        {/* <div className="flex flex-col items-start mx-2"> */}
                        <SecSingleSelect
                          label="Authentication Protocol"
                          name="authentication_protocol"
                          selectData={[
                            { id: "no.auth", name: "None" },
                            { id: "MD5", name: "MD5" },
                            { id: "SHA224", name: "SHA224" },
                            { id: "SHA", name: "SHA" },
                            { id: "SHA256", name: "SHA256" },
                            { id: "SHA384", name: "SHA384" },
                            { id: "SHA512", name: "SHA512" },
                          ]}
                          onChange={handleAuthChange}
                          require={false}
                          value={authType}
                        />
                        {/* </div>
                        <div className="flex flex-col items-start mx-2"> */}
                        <CustomeInput
                          label="Authentication Password"
                          name="authentication_password"
                          value={
                            snmpv3Object.credential_context
                              .authentication_password
                          }
                          onChange={handleInputSnmpv3Change}
                          type="password"
                          disable={false}
                          require={true}
                        />
                        {/* </div> */}
                      </div>
                      <div className="flex">
                        {/* <div className="flex flex-col items-start mx-2"> */}
                        <SecSingleSelect
                          label="Privacy Protocol"
                          selectData={[
                            { id: "no.priv", name: "None" },
                            { id: "DES", name: "DES" },
                            { id: "AES", name: "AES" },
                            { id: "AES192", name: "AES192" },
                            { id: "AES256", name: "AES256" },
                            { id: "AES192C", name: "AES192C" },
                            { id: "AES256C", name: "AES265C" },
                          ]}
                          onChange={handleEncryptChange}
                          require={false}
                          value={encryptType}
                        />
                        {/* </div>
                        <div className="flex flex-col items-start mx-2"> */}
                        <CustomeInput
                          label="Privacy Password"
                          name="privacy_password"
                          value={
                            snmpv3Object.credential_context.privacy_password
                          }
                          onChange={handleInputSnmpv3Change}
                          type="password"
                          disable={false}
                          require={true}
                        />
                        {/* </div> */}
                      </div>
                    </div>
                  ) : msg_flag === "auth.no.priv" ? (
                    <div className="flex">
                      {/* <div className="flex flex-col items-start mx-2"> */}
                      <SecSingleSelect
                        label="Authentication Protocol"
                        selectData={[
                          { id: "no.auth", name: "None" },
                          { id: "MD5", name: "MD5" },
                          { id: "SHA", name: "SHA" },
                          { id: "SHA224", name: "SHA224" },
                          { id: "SHA256", name: "SHA256" },
                          { id: "SHA384", name: "SHA384" },
                          { id: "SHA512", name: "SHA512" },
                        ]}
                        onChange={handleAuthChange}
                        require={false}
                        value={authType}
                      />
                      {/* </div>
                      <div className="flex flex-col items-start mx-2"> */}
                      <CustomeInput
                        label="Authentication Password"
                        name="authentication_password"
                        value={
                          snmpv3Object.credential_context
                            .authentication_password
                        }
                        onChange={handleInputSnmpv3Change}
                        type="password"
                        disable={false}
                        require={true}
                      />
                      {/* </div> */}
                    </div>
                  ) : (
                    " "
                  )}
                </div>
                {/* <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                <div >
                  <SubmitButton title="Save" />
                </div>
                <div>
                  <CustomeCancelButton title="Cancel" />
                </div>
              </div> */}
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

                {/* <div className="fixed bottom-0 right-0 p-2 flex justify-end mt-6">
                  <div >
                    <SubmitButton title="Save" />
                  </div>
                  <div onClick={handleDrawerClose}>
                    <CustomeCancelButton title="Cancel" />
                  </div>
                </div> */}
              </div>
            ) : (
              ""
            )}
            <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
              <div>
                {/* <SubmitButton title="Save" /> */}
                <button
                  className=" mx-2 inline-flex items-center justify-center rounded-md py-1 px-6 text-center font-medium text-white bg-primary2 hover:bg-opacity-90 lg:px-6 xl:px-6 cursor-pointer"
                  type="submit"
                >
                  save
                </button>
              </div>
              <div onClick={handleDrawerClose}>
                <CustomeCancelButton title="Cancel" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Drawer>
  );
};

export default EditCredentialProfileDrawer;
