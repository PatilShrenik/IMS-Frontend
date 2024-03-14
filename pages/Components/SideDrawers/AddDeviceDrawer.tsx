import {
  Button,
  ButtonGroup,
  Checkbox,
  Drawer,
  FormControlLabel,
  Switch,
  Tabs,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import countries from "country-list";
import timezones from "timezones-list";
import Select from "react-select";
import CustomeInput, { CustomeTextArea } from "../Inputs";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../AppContext";
import { Bounce, toast } from "react-toastify";
import { replaceUnderscoresWithDots } from "@/functions/genericFunctions";
import { getAllCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import CustomeButton, { CustomeCancelButton, SubmitButton } from "../Buttons";
import SingleSelect from "../Selects";
import { makeStyles } from "@material-ui/core/styles";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import {
  addDeviceManager,
  addSingleDevice,
} from "@/pages/api/api/DeviceManagementAPI";
// import MultiSelect from "../MultiSelect";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "100%",
  },
}));
const AddDeviceDrawer = (props: any) => {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ padding: "0 1rem" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  // function a11yProps(index: number) {
  //   return {
  //     id: `vertical-tab-${index}`,
  //     "aria-controls": `vertical-tabpanel-${index}`,
  //   };
  // }
  return (
    <Drawer
      anchor="right"
      open={open}
      variant="temporary"
      classes={{ paper: classes.drawer }}
      className="shadow-sm shadow-dark-container w-full overflow-y-auto"
    >
      <div className="h-full w-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Add Asset</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <div className="py-8 px-6">
          <Box
            sx={{
              flexGrow: 1,
              // bgcolor: "background.paper",
              display: "flex",
              // height: 224,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              // sx={{ borderRight: 1, borderColor: "#3C3C3C" }}
            >
              <Tab
                label="SNMP"
                className="dark:text-textColor text-black items-baseline mx-4"
              />
              <Tab
                label="SSH"
                disabled
                className="dark:text-textColor text-black items-baseline mx-4"
              />
              <Tab
                label="WinRM"
                // {...a11yProps(2)}
                disabled
                className="dark:text-textColor text-black items-baseline mx-4"
              />
              <Tab
                label="API"
                // {...a11yProps(3)}
                disabled
                className="dark:text-textColor text-black items-baseline mx-4"
              />
              <Tab
                label="Cloud"
                // {...a11yProps(4)}
                disabled
                className="dark:text-textColor text-black items-baseline mx-4"
              />
              <Tab
                label="ICMP"
                // {...a11yProps(5)}
                disabled
                className="dark:text-textColor text-black items-baseline mx-4"
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <AddSingleDeviceTab handleDrawerClose={handleDrawerClose} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Linux SSH
            </TabPanel>
            <TabPanel value={value} index={2}>
              Windows WinRm
            </TabPanel>
            <TabPanel value={value} index={3}>
              API
            </TabPanel>
            <TabPanel value={value} index={4}>
              Cloud
            </TabPanel>
            <TabPanel value={value} index={5}>
              ICMP
            </TabPanel>
          </Box>
        </div>
      </div>
    </Drawer>
  );
};

export default AddDeviceDrawer;

const AddSingleDeviceTab = (props: any) => {
  const { handleDrawerClose } = props;

  const [value, setValue] = React.useState("address");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <ButtonGroup
        variant="outlined"
        aria-label="Basic button group"
        className="mx-8"
      >
        <Button
          onClick={() => setValue("address")}
          style={{
            backgroundColor: value == "address" ? "#0078d4" : "",
            color: value == "address" ? "white" : "",
          }}
          className={`${
            value == "address" && "bg-primary2 text-white"
          } text-primary2`}
        >
          IP Address
        </Button>
        <Button
          onClick={() => setValue("range")}
          style={{
            backgroundColor: value == "range" ? "#0078d4" : "",
            color: value == "range" ? "white" : "",
          }}
          className={`${
            value == "range" && "bg-primary2 text-white"
          } text-primary2`}
        >
          IP Range
        </Button>
        <Button
          onClick={() => setValue("cidr")}
          style={{
            backgroundColor: value == "cidr" ? "#0078d4" : "",
            color: value == "cidr" ? "white" : "",
          }}
          className={`${
            value == "cidr" && "bg-primary2 text-white"
          } text-primary2`}
        >
          CIDR
        </Button>
      </ButtonGroup>
      <div>
        {value == "address" ? (
          <IPAddress handleDrawerClose={handleDrawerClose} />
        ) : value == "range" ? (
          <IPRange handleDrawerClose={handleDrawerClose} />
        ) : (
          <CIDR handleDrawerClose={handleDrawerClose} />
          // <p>hi</p>
        )}
      </div>
    </Box>
  );
};

const IPAddress = (props: any) => {
  const { handleDrawerClose } = props;
  const { toggleDeviceTableState } = useAppContext();
  const initialState = {
    plugin_type: "SNMP",
    profile_type: "ip.address",
    hostname: "",
    ip_address: null,
    port: "161",
    credential_profiles: [],
    discovery_schedulers: [],
    groups: [],
    device_type: "",
    oem: "",
    os: "",
    os_version: "",
    vendor: "",
    // device_name: "",
    // description: "",
    alias: "",
    // country: "",
    // location: "",
    site: "",
    // site_code: 0,
    // service: "",
    // latitude: 0,
    // longitude: 0,
    // timezone: "",
    flow_enabled: false,
    device_status: "new",
    // availability_interval: 60,
    auto_provision: "discovery",
    // check_without_save: "yes",
  };

  const [data, setData] = React.useState<any>(initialState);
  const [protocol, setProtocol] = React.useState("10");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [allCredsPrfile, setAllCredsProfil] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [errorKeys, setErrorKeys] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<any>({});
  const [allDiscoverySch, setAllDiscoverySch] = React.useState([]);

  // Add your dialog content and functionality here

  React.useEffect(() => {
    const getCredsProfile = async () => {
      let response = await getAllCredsProfile();
      setAllCredsProfil(response.result);
    };
    getCredsProfile();
    const getGroups = async () => {
      let response = await getAllGropus();
      setAllGroups(response.result);
      const groupValues =
        response.result &&
        response.result.map((item: any) => ({
          label: item.name,
          value: item._id,
        }));
      console.log("----", groupValues);
    };
    getGroups();
    const getDiscoveryScheduler = async () => {
      let response = await getAllDiscoverySch();
      setAllDiscoverySch(response.result);
    };
    getDiscoveryScheduler();
  }, []);

  const credsProfileValues =
    allCredsPrfile &&
    allCredsPrfile.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  const groupValues =
    allGroups &&
    allGroups.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleChange = (event: any) => {
    const proto: any = event.target.value as string;
    console.log(proto);
    // setFormValue(true);
    setProtocol(proto);
    // setData({ ...data, port: proto == "10" ? "161" : "22" });
  };

  const handleRadioChange = (event: any) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleAutoProvisionCheck = (event: any) => {
    setData({
      ...data,
      auto_provision: event.target.checked == true ? "yes" : "no",
    });
  };

  const handleCheckWithoudSaveCheck = (event: any) => {
    setData({
      ...data,
      check_without_save: event.target.checked == true ? "yes" : "no",
    });
  };

  const handleTimeZoneDropdown = (value: any) => {
    setData({
      ...data,
      timezone: value,
    });
  };

  const handleCheckboxChange = (event: any) => {
    setData({ ...data, flow_enabled: event.target.checked });
  };

  const handleDeviceType = (value: any) => {
    setData({
      ...data,
      device_type: value,
    });
  };

  const handleCredProfile = (values: any) => {
    const val = parseInt(values);
    setData({
      ...data,
      credential_profiles: [val],
    });
  };
  const handleGroupDropdown = (value: any) => {
    setData({
      ...data,
      groups: value,
    });
  };

  useEffect(() => {
    const errorKey = errors && Object.keys(errors);
    setErrorKeys(errorKey);
  }, [errors]);

  const handleSave = async (event: any) => {
    event.preventDefault();
    let response;
    data.port = parseInt(data.port);
    // if(data.hostname == "") {
    //   setErrors({})
    // }
    const modifiedData = replaceUnderscoresWithDots(data);
    console.log("ip address save data", modifiedData);
    response = await addSingleDevice(modifiedData);
    response && console.log(response);
    if (response) {
      if (response.status == "success") {
        toast.success(response && response.message, {
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
        toggleDeviceTableState();
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
  return (
    <div className=" rounded-lg m-2 p-2">
      {/* <SingleSelect
        label="Protocol"
        selectData={["SNMP"]}
        onChange={handleChange}
      /> */}
      {data.plugin_type == "SNMP" && (
        <form onSubmit={handleSave} method="POST">
          <div className="grid grid-flow-row-dense grid-cols-4">
            <div className="flex flex-col">
              <CustomeInput
                label="Host Name"
                name="hostname"
                value={data.hostname}
                onChange={handleInputChange}
                type="text"
                require={true}
              />
              {errorKeys && errorKeys.includes("hostname") && (
                <p className="text-danger text-sm ml-2">
                  HostName is {errors["hostname"]} *
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <CustomeInput
                label="IP Address"
                name="ip_address"
                value={data.ip_address}
                onChange={handleInputChange}
                type="text"
                require={true}
              />
              {errorKeys && errorKeys.includes("ip.address") && (
                <p className="text-danger text-sm ml-2">
                  IP Address is {errors["ip.address"]} *
                </p>
              )}
            </div>

            <CustomeInput
              label="Port"
              name="port"
              value={data.port}
              onChange={handleInputChange}
              type="text"
              require={true}
            />
          </div>
          {/* <div className="flex"> */}
          <div className="flex flex-col">
            <SingleSelect
              label="Select Credential Profile"
              selectData={credsProfileValues}
              onChange={handleCredProfile}
              require={true}
              isMulti={true}
            />
            {errorKeys && errorKeys.includes("credential.profiles") && (
              <p className="text-danger text-sm ml-2">
                Credential Profiles is {errors["credential.profiles"]} *
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <SingleSelect
              label="Select Group"
              selectData={groupValues}
              onChange={handleGroupDropdown}
              require={true}
              isMulti={true}
            />
            {errorKeys && errorKeys.includes("groups") && (
              <p className="text-danger text-sm ml-2">
                Groups is {errors["groups"]} *
              </p>
            )}
          </div>
          <div className="grid grid-flow-row-dense grid-cols-4">
            <CustomeInput
              label="Alias"
              name="alias"
              value={data.alias}
              onChange={handleInputChange}
              type="text"
              require={false}
            />

            <CustomeInput
              label="Site"
              name="site"
              value={data.site}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <SingleSelect
              label="Device Type"
              selectData={[
                { label: "Router", value: "Router" },
                { label: "Switch", value: "Switch" },
                { label: "FireWall", value: "FireWall" },
              ]}
              onChange={handleDeviceType}
              require={false}
              // values={[]}
            />
            <CustomeInput
              label="OEM"
              name="oem"
              value={data.oem}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System"
              name="os"
              value={data.os}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Vendor"
              name="vendor"
              value={data.vendor}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System Version"
              name="os_version"
              value={data.os_version}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
          </div>
          <div className="flex items-center">
            <FormControlLabel
              className="mx-4 dark:text-gray-400 text-sm"
              control={
                <Checkbox
                  className="dark:text-primary2"
                  checked={data.flow_enabled}
                  onChange={handleCheckboxChange}
                />
              }
              label="Flow Enabled"
            />
            <div
              style={{
                margin: ".5rem 1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography className="dark:text-gray-400">
                Auto Provision
              </Typography>
              <Switch
                checked={data.auto_provision === "discovery"}
                onChange={() =>
                  handleRadioChange({
                    target: {
                      name: "auto_provision",
                      value:
                        data.auto_provision === "monitoring"
                          ? "discovery"
                          : "monitoring",
                    },
                  })
                }
                color="primary"
              />
              <Typography
                className="dark:text-gray-400"
                // style={{ marginLeft: "1rem" }}
              >
                Discovery Only
              </Typography>
            </div>
          </div>
          <div className=" fixed bottom-0 right-0 p-2 my-2 flex justify-end mt-6">
            {/* <div onClick={handleSave}> */}
            <SubmitButton title="Save" />
            {/* </div> */}
            <div onClick={handleDrawerClose}>
              <CustomeCancelButton title="Cancel" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const IPRange = (props: any) => {
  const { handleDrawerClose } = props;
  const { toggleDeviceTableState } = useAppContext();
  const initialState = {
    plugin_type: "SNMP",
    profile_type: "ip.range",
    hostname: "",
    start_ip: null,
    end_ip: null,
    port: "161",
    credential_profiles: [],
    discovery_schedulers: [],
    groups: [],
    device_type: "",
    oem: "",
    os: "",
    os_version: "",
    vendor: "",
    // device_name: "",
    // description: "",
    alias: "",
    // country: "",
    // location: "",
    site: "",
    // site_code: 0,
    // service: "",
    // latitude: 0,
    // longitude: 0,
    // timezone: "",
    device_status: "new",
    availability_interval: 60,
    auto_provision: "yes",
    check_without_save: "yes",
  };

  // const { togglegetTableApiState } = useAppContext();
  const [data, setData] = React.useState<any>(initialState);
  const [protocol, setProtocol] = React.useState("10");
  const [allCredsPrfile, setAllCredsProfil] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [errorKeys, setErrorKeys] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<any>({});
  const [allDiscoverySch, setAllDiscoverySch] = React.useState([]);

  const countryNames = countries.getNames();
  const tzCodes = timezones.map((timezone) => timezone.tzCode);

  React.useEffect(() => {
    const getCredsProfile = async () => {
      let response = await getAllCredsProfile();
      setAllCredsProfil(response.result);
    };
    getCredsProfile();
    const getGroups = async () => {
      let response = await getAllGropus();
      setAllGroups(response.result);
    };
    getGroups();
    const getDiscoveryScheduler = async () => {
      let response = await getAllDiscoverySch();
      setAllDiscoverySch(response.result);
    };
    getDiscoveryScheduler();
  }, []);

  const credsProfileValues =
    allCredsPrfile &&
    allCredsPrfile.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  const groupValues =
    allGroups &&
    allGroups.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));

  //Functions to set value into the state

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleChange = (event: any) => {
    const proto: any = event.target.value as string;
    console.log(proto);
    // setFormValue(true);
    setProtocol(proto);
    // setData({ ...data, port: proto == "10" ? "161" : "22" });
  };

  const handleRadioChange = (event: any) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleTimeZoneDropdown = (value: any) => {
    setData({
      ...data,
      timezone: value,
    });
  };
  const handleCountryDropdown = (value: any) => {
    setData({
      ...data,
      country: value,
    });
  };

  const handleDeviceType = (value: any) => {
    setData({
      ...data,
      device_type: value,
    });
  };
  const handleCheckboxChange = (event: any) => {
    setData({ ...data, flow_enabled: event.target.checked });
  };

  const handleCredProfile = (values: any) => {
    setData({
      ...data,
      credential_profiles: [values],
    });
  };
  const handleGroupDropdown = (value: any) => {
    setData({
      ...data,
      groups: [value],
    });
  };

  useEffect(() => {
    const errorKey = errors && Object.keys(errors);
    setErrorKeys(errorKey);
  }, [errors]);
  // console.log("errorkey", errorKeys && errorKeys.includes("ip.address"));

  const handleSave = async (event: any) => {
    event.preventDefault();
    let response;
    data.port = parseInt(data.port);
    const modifiedData = replaceUnderscoresWithDots(data);
    response = await addDeviceManager(modifiedData);
    response && console.log(response);
    if (response) {
      if (response.status == "success") {
        toast.success(response && "Device Created Successfully", {
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
        toggleDeviceTableState();
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

  return (
    <div className=" rounded-lg m-2 p-2">
      {/* <SingleSelect
        label="Protocol"
        selectData={["SNMP"]}
        onChange={handleChange}
      /> */}
      {data.plugin_type == "SNMP" && (
        <form onSubmit={handleSave} method="POST">
          <div className="grid grid-flow-row-dense grid-cols-4">
            <div className="flex flex-col">
              <CustomeInput
                label="Name"
                name="hostname"
                value={data.hostname}
                onChange={handleInputChange}
                type="text"
                require={true}
              />
              {errorKeys && errorKeys.includes("hostname") && (
                <p className="text-danger text-sm ml-2">
                  HostName is {errors["hostname"]}*
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <CustomeInput
                label="Start IP"
                name="start_ip"
                value={data.start_ip}
                onChange={handleInputChange}
                type="text"
                require={true}
              />
              {errorKeys && errorKeys.includes("start.ip") && (
                <p className="text-danger text-sm ml-2">
                  Start IP is {errors["start.ip"]}*
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <CustomeInput
                label="End IP"
                name="end_ip"
                value={data.end_ip}
                onChange={handleInputChange}
                type="text"
                require={true}
              />
              {errorKeys && errorKeys.includes("end.ip") && (
                <p className="text-danger text-sm ml-2">
                  End IP is {errors["end.ip"]}*
                </p>
              )}
            </div>

            <CustomeInput
              label="Port"
              name="port"
              value={data.port}
              onChange={handleInputChange}
              type="text"
              require={true}
            />
          </div>
          {/* <div className="flex"> */}
          <div className="flex flex-col">
            <SingleSelect
              label="Select Credential Profile"
              selectData={credsProfileValues}
              onChange={handleCredProfile}
              require={true}
              isMulti={true}
            />
            {errorKeys && errorKeys.includes("credential.profiles") && (
              <p className="text-danger text-sm ml-2">
                Credential Profiles is {errors["credential.profiles"]}*
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <SingleSelect
              label="Select Group"
              selectData={groupValues}
              onChange={handleGroupDropdown}
              require={true}
              isMulti={true}
            />
            {errorKeys && errorKeys.includes("groups") && (
              <p className="text-danger text-sm ml-2">
                Groups is {errors["groups"]}*
              </p>
            )}
          </div>
          <div className="grid grid-flow-row-dense grid-cols-4">
            <CustomeInput
              label="Alias"
              name="alias"
              value={data.alias}
              onChange={handleInputChange}
              type="text"
              require={false}
            />

            <CustomeInput
              label="Site"
              name="site"
              value={data.site}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <SingleSelect
              label="Device Type"
              selectData={[
                { value: "Router", label: "Router" },
                { value: "Switch", label: "Switch" },
                { value: "FireWall", label: "FireWall" },
              ]}
              onChange={handleDeviceType}
              require={false}
              // values={[]}
            />
            <CustomeInput
              label="OEM"
              name="oem"
              value={data.oem}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System"
              name="os"
              value={data.os}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Vendor"
              name="vendor"
              value={data.vendor}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System Version"
              name="os_version"
              value={data.os_version}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
          </div>
          <div className="flex items-center">
            <FormControlLabel
              className="mx-4 dark:text-gray-400 text-sm"
              control={
                <Checkbox
                  className="dark:text-primary2"
                  checked={data.flow_enabled}
                  onChange={handleCheckboxChange}
                />
              }
              label="Flow Enabled"
            />
            <div
              style={{
                margin: ".5rem 1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography className="dark:text-gray-400">
                Auto Provision
              </Typography>
              <Switch
                checked={data.auto_provision === "discovery"}
                onChange={() =>
                  handleRadioChange({
                    target: {
                      name: "auto_provision",
                      value:
                        data.auto_provision === "monitoring"
                          ? "discovery"
                          : "monitoring",
                    },
                  })
                }
                color="primary"
              />
              <Typography
                className="dark:text-gray-400"
                // style={{ marginLeft: "1rem" }}
              >
                Discovery Only
              </Typography>
            </div>
          </div>
          <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
            {/* <div onClick={handleSave}> */}
            <SubmitButton title="Save" />
            {/* </div> */}
            <div onClick={handleDrawerClose}>
              <CustomeCancelButton title="Cancel" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const CIDR = (props: any) => {
  const { toggleDeviceTableState } = useAppContext();
  const { handleDrawerClose } = props;
  const initialState = {
    plugin_type: "SNMP",
    profile_type: "cidr",
    hostname: "",
    cidr: null,
    port: "161",
    credential_profiles: [],
    discovery_schedulers: [],
    groups: [],
    device_type: "",
    oem: "",
    os: "",
    os_version: "",
    vendor: "",
    // device_name: "",
    // description: "",
    alias: "",
    // country: "",
    // location: "",
    site: "",
    // site_code: 0,
    // service: "",
    // latitude: 0,
    // longitude: 0,
    // timezone: "",
    device_status: "new",
    availability_interval: 60,
    auto_provision: "yes",
    check_without_save: "yes",
  };

  // const { togglegetTableApiState } = useAppContext();
  const [data, setData] = React.useState<any>(initialState);
  const [protocol, setProtocol] = React.useState("10");
  const [allCredsPrfile, setAllCredsProfil] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [errorKeys, setErrorKeys] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<any>({});
  const [allDiscoverySch, setAllDiscoverySch] = React.useState([]);

  const countryNames = countries.getNames();
  const tzCodes = timezones.map((timezone) => timezone.tzCode);

  React.useEffect(() => {
    const getCredsProfile = async () => {
      let response = await getAllCredsProfile();
      setAllCredsProfil(response.result);
    };
    getCredsProfile();
    const getGroups = async () => {
      let response = await getAllGropus();
      setAllGroups(response.result);
    };
    getGroups();
    const getDiscoveryScheduler = async () => {
      let response = await getAllDiscoverySch();
      setAllDiscoverySch(response.result);
    };
    getDiscoveryScheduler();
  }, []);

  const credsProfileValues =
    allCredsPrfile &&
    allCredsPrfile.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  const groupValues =
    allGroups &&
    allGroups.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));

  //Functions to set value into the state

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleChange = (event: any) => {
    const proto: any = event.target.value as string;
    console.log(proto);
    // setFormValue(true);
    setProtocol(proto);
    // setData({ ...data, port: proto == "10" ? "161" : "22" });
  };

  const handleRadioChange = (event: any) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleTimeZoneDropdown = (value: any) => {
    setData({
      ...data,
      timezone: value,
    });
  };
  const handleCountryDropdown = (value: any) => {
    setData({
      ...data,
      country: value,
    });
  };

  const handleCheckboxChange = (event: any) => {
    setData({ ...data, flow_enabled: event.target.checked });
  };

  const handleDeviceType = (value: any) => {
    setData({
      ...data,
      device_type: value,
    });
  };

  const handleCredProfile = (values: any) => {
    setData({
      ...data,
      credential_profiles: [values],
    });
  };
  const handleGroupDropdown = (value: any) => {
    setData({
      ...data,
      groups: [value],
    });
  };

  useEffect(() => {
    const errorKey = errors && Object.keys(errors);
    setErrorKeys(errorKey);
  }, [errors]);
  // console.log("errorkey", errorKeys && errorKeys.includes("ip.address"));

  const handleSave = async (event: any) => {
    event.preventDefault();
    let response;
    data.port = parseInt(data.port);
    const modifiedData = replaceUnderscoresWithDots(data);
    response = await addDeviceManager(modifiedData);
    response && console.log(response);
    if (response) {
      if (response.status == "success") {
        toast.success(response && "Device Created Successfully", {
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
        toggleDeviceTableState();
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

  return (
    <div className=" rounded-lg m-2 p-2">
      {/* <SingleSelect
        label="Protocol"
        selectData={["SNMP"]}
        onChange={handleChange}
      /> */}
      {data.plugin_type == "SNMP" && (
        <form onSubmit={handleSave} method="POST">
          <div className="grid grid-flow-row-dense grid-cols-4">
            <div className="flex flex-col">
              <CustomeInput
                label="Name"
                name="hostname"
                value={data.hostname}
                onChange={handleInputChange}
                type="text"
                require={true}
              />
              {errorKeys && errorKeys.includes("hostname") && (
                <p className="text-danger text-sm ml-2">
                  HostName is {errors["hostname"]}*
                </p>
              )}
            </div>
            {/* <div className="flex flex-col">
                <CustomeInput
                  label="Start IP"
                  name="start_ip"
                  value={data.start_ip}
                  onChange={handleInputChange}
                  type="text"
                  require={true}
                />
                {errorKeys && errorKeys.includes("start.ip") && (
                  <p className="text-danger text-sm ml-2">
                    Start IP is {errors["start.ip"]}*
                  </p>
                )}
              </div> */}
            <div className="flex flex-col">
              <CustomeInput
                label="CIDR"
                name="cidr"
                value={data.cide}
                onChange={handleInputChange}
                type="text"
                require={true}
              />
              {errorKeys && errorKeys.includes("cidr") && (
                <p className="text-danger text-sm ml-2">
                  End IP is {errors["cidr"]}*
                </p>
              )}
            </div>

            <CustomeInput
              label="Port"
              name="port"
              value={data.port}
              onChange={handleInputChange}
              type="text"
              require={true}
            />
          </div>
          {/* <div className="flex"> */}
          <div className="flex flex-col">
            <SingleSelect
              label="Select Credential Profile"
              selectData={credsProfileValues}
              onChange={handleCredProfile}
              require={true}
              isMulti={true}
            />
            {errorKeys && errorKeys.includes("credential.profiles") && (
              <p className="text-danger text-sm ml-2">
                Credential Profiles is {errors["credential.profiles"]}*
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <SingleSelect
              label="Select Group"
              selectData={groupValues}
              onChange={handleGroupDropdown}
              require={true}
              isMulti={true}
            />
            {errorKeys && errorKeys.includes("groups") && (
              <p className="text-danger text-sm ml-2">
                Groups is {errors["groups"]}*
              </p>
            )}
          </div>
          <div className="grid grid-flow-row-dense grid-cols-4">
            <CustomeInput
              label="Alias"
              name="alias"
              value={data.alias}
              onChange={handleInputChange}
              type="text"
              require={false}
            />

            <CustomeInput
              label="Site"
              name="site"
              value={data.site}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <SingleSelect
              label="Device Type"
              selectData={[
                { label: "Router", value: "Router" },
                { label: "Switch", value: "Switch" },
                { label: "FireWall", value: "FireWall" },
              ]}
              onChange={handleDeviceType}
              require={false}
              // values={[]}
            />
            <CustomeInput
              label="OEM"
              name="oem"
              value={data.oem}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System"
              name="os"
              value={data.os}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Vendor"
              name="vendor"
              value={data.vendor}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System Version"
              name="os_version"
              value={data.os_version}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
          </div>
          <div className="flex items-center">
            <FormControlLabel
              className="mx-4 dark:text-gray-400 text-sm"
              control={
                <Checkbox
                  className="dark:text-primary2"
                  checked={data.flow_enabled}
                  onChange={handleCheckboxChange}
                />
              }
              label="Flow Enabled"
            />
            <div
              style={{
                margin: ".5rem 1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography className="dark:text-gray-400">
                Auto Provision
              </Typography>
              <Switch
                checked={data.auto_provision === "discovery"}
                onChange={() =>
                  handleRadioChange({
                    target: {
                      name: "auto_provision",
                      value:
                        data.auto_provision === "monitoring"
                          ? "discovery"
                          : "monitoring",
                    },
                  })
                }
                color="primary"
              />
              <Typography
                className="dark:text-gray-400"
                // style={{ marginLeft: "1rem" }}
              >
                Discovery Only
              </Typography>
            </div>
          </div>
          <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
            {/* <div onClick={handleSave}> */}
            <SubmitButton title="Save" />
            {/* </div> */}
            <div onClick={handleDrawerClose}>
              <CustomeCancelButton title="Cancel" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
