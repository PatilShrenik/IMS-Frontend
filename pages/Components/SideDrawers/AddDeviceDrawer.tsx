import {
  Button,
  ButtonGroup,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Switch,
  Tabs,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import countries from "country-list";
import timezones from "timezones-list";
import Select from "react-select";
import CustomeInput, { CustomeTextArea } from "../Inputs";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../AppContext";
import { Bounce, toast } from "react-toastify";
import { replaceUnderscoresWithDots } from "@/functions/genericFunctions";
import {
  createCredsProfile,
  getAllCredsProfile,
} from "@/pages/api/api/CredentialProfileAPI";
import CustomeButton, { CustomeCancelButton } from "../Buttons";
import SingleSelect from "../Selects";
import { makeStyles } from "@material-ui/core/styles";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import {
  addDeviceManager,
  addSingleDevice,
} from "@/pages/api/api/DeviceManagementAPI";
// import MultiSelect from "../MultiSelect";

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

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  return (
    <Drawer
      // hideBackdrop = {false}temporary
      anchor="right"
      open={open}
      // elevation={55}
      // transitionDuration
      // className={classes.drawer}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={`shadow-sm shadow-dark-container w-full  ${classes.drawer}`}
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
              sx={{ borderRight: 1, borderColor: "#3C3C3C" }}
            >
              <Tab
                label="Network SNMP"
                {...a11yProps(0)}
                className="dark:text-textColor items-baseline"
              />
              <Tab
                label="Linux SSH"
                {...a11yProps(1)}
                className="dark:text-textColor items-baseline"
              />
              <Tab
                label="Windows WinRM"
                {...a11yProps(2)}
                className="dark:text-textColor items-baseline"
              />
              <Tab
                label="API"
                {...a11yProps(3)}
                className="dark:text-textColor items-baseline"
              />
              <Tab
                label="Cloud"
                {...a11yProps(4)}
                className="dark:text-textColor items-baseline"
              />
              <Tab
                label="ICMP"
                {...a11yProps(5)}
                className="dark:text-textColor items-baseline"
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <AddSingleDeviceTab handleDrawerClose={handleDrawerClose} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Linux SSH
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
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

          {/* <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="IP Address"
                    value="address"
                    className="dark:text-textColor"
                  />
                  <Tab
                    label="IP Range"
                    value="range"
                    className="dark:text-textColor"
                  />
                  <Tab
                    label="CIDR"
                    value="cidr"
                    className="dark:text-textColor"
                  />
                </TabList>
              </Box>
              <TabPanel value="address">
                <AddSingleDeviceTab handleClose={handleDrawerClose} />
              </TabPanel>
              <TabPanel value="range">Item Two</TabPanel>
              <TabPanel value="cidr">Item Three</TabPanel>
            </TabContext>
          </Box> */}
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
          className={`${value == "address" && "bg-primary2 text-white"}`}
        >
          IP Address
        </Button>
        <Button
          onClick={() => setValue("range")}
          className={`${value == "range" && "bg-primary2 text-white"}`}
        >
          IP Range
        </Button>
        <Button
          onClick={() => setValue("cidr")}
          className={`${value == "cidr" && "bg-primary2 text-white"}`}
        >
          CIDR
        </Button>
      </ButtonGroup>
      <div>
        {value == "address" ? (
          <IPAddress />
        ) : value == "range" ? (
          <IPRange />
        ) : (
          <p>cidr</p>
        )}
      </div>
      {/* <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "#3C3C3C" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab
              label="IP Address"
              value="address"
              className="dark:text-textColor"
            />
            <Tab
              label="IP Range"
              value="range"
              className="dark:text-textColor"
            />
            <Tab label="CIDR" value="cidr" className="dark:text-textColor" />
          </TabList>
        </Box>
        <TabPanel value="address">
          <IPAddress handleClose={handleDrawerClose} />
        </TabPanel>
        <TabPanel value="range">
          <IPRange handleDrawerClose={handleDrawerClose} />
        </TabPanel>
        <TabPanel value="cidr">Item Three</TabPanel>
      </TabContext> */}
    </Box>
  );
};

const IPAddress = (props: any) => {
  const { handleDrawerClose } = props;

  const initialState = {
    plugin_type: "SNMP",
    profile_type: "ip.address",
    hostname: "",
    ip_address: null,
    port: "161",
    credential_profiles: [],
    discovery_schedulers: [],
    groups: [],
    // device_name: "",
    description: "",
    alias: "",
    country: "",
    location: "",
    site: "",
    site_code: 0,
    service: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
    device_status: "new",
    availability_interval: 60,
    auto_provision: "discovery",
    // check_without_save: "yes",
  };

  // const { togglegetTableApiState } = useAppContext();
  const [data, setData] = React.useState<any>(initialState);
  const [protocol, setProtocol] = React.useState("10");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [allCredsPrfile, setAllCredsProfil] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [errorKeys, setErrorKeys] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<any>({});
  const [allDiscoverySch, setAllDiscoverySch] = React.useState([]);

  // Add your dialog content and functionality here

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
      name: item.name,
      id: item._id,
    }));
  const groupValues =
    allGroups &&
    allGroups.map((item: any) => ({
      name: item.name,
      id: item._id,
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
  const handleCountryDropdown = (value: any) => {
    setData({
      ...data,
      country: value,
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

  const handleSave = async () => {
    let response;
    data.port = parseInt(data.port);
    const modifiedData = replaceUnderscoresWithDots(data);
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
        // togglegetTableApiState();
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
        <form>
          <>
            <div className="flex flex-wrap">
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
                    HostName is {errors["hostname"]}*
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
                    IP Address is {errors["ip.address"]}*
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
                // values={[]}
              />
              {errorKeys && errorKeys.includes("groups") && (
                <p className="text-danger text-sm ml-2">
                  Groups is {errors["groups"]}*
                </p>
              )}
            </div>
            {/* </div> */}
            {/* <CustomeInput
            label="Device Name"
            name="device_name"
            value={data.device_name}
            onChange={handleInputChange}
            type="text"
            require={true}
          /> */}
            <div className="grid grid-flow-row-dense grid-cols-4">
              <CustomeInput
                label="Alias"
                name="alias"
                value={data.alias}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <CustomeTextArea
                label="Device Description"
                name="description"
                value={data.description}
                onChange={handleInputChange}
                rows="1"
                require={true}
              />
              <SingleSelect
                label="Select Country"
                selectData={countryNames}
                onChange={handleCountryDropdown}
              />
              <CustomeInput
                label="Location"
                name="location"
                value={data.location}
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
              <CustomeInput
                label="Site Code"
                name="site_code"
                value={data.site_code}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <CustomeInput
                label="Service"
                name="service"
                value={data.service}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <CustomeInput
                label="Latitudes"
                name="latitude"
                value={data.latitude}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <CustomeInput
                label="Longitudes"
                name="longitude"
                value={data.longitude}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <SingleSelect
                label="Select TimeZone"
                selectData={tzCodes}
                onChange={handleTimeZoneDropdown}
              />

              {/* <FormControl style={{ margin: ".5rem" }}>
                <RadioGroup
                  style={{ display: "flex", flexDirection: "row" }}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="auto_provision"
                  value={data.auto_provision}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    className="dark:text-textColor"
                    value="monitoring"
                    control={
                      <Radio size="small" className="dark:text-textColor" />
                    }
                    label="Auto Provision"
                  />
                  <FormControlLabel
                    className="dark:text-textColor"
                    value="discovery"
                    control={
                      <Radio size="small" className="dark:text-textColor" />
                    }
                    label="Discovery Only"
                  />
                </RadioGroup>
              </FormControl> */}
            </div>
            <div
              style={{
                margin: ".5rem 1rem",
                display: "flex",
                // justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography
                className="dark:text-textColor"
                // style={{ marginRight: "1rem" }}
              >
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
                className="dark:text-textColor"
                // style={{ marginLeft: "1rem" }}
              >
                Discovery Only
              </Typography>
            </div>
            <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
              <div onClick={handleSave}>
                <CustomeButton title="Save" />
              </div>
              <div onClick={handleDrawerClose}>
                <CustomeCancelButton title="Cancel" />
              </div>
            </div>
          </>
        </form>
      )}
    </div>
  );
};

const IPRange = (props: any) => {
  const { handleDrawerClose } = props;
  const initialState = {
    plugin_type: "SNMP",
    profile_type: "ip.address",
    hostname: "",
    start_ip: null,
    end_ip: null,
    port: "161",
    credential_profiles: [],
    discovery_schedulers: [],
    groups: [],
    device_name: "",
    description: "",
    alias: "",
    country: "",
    location: "",
    site: "",
    site_code: 0,
    service: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
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
      name: item.name,
      id: item._id,
    }));
  const groupValues =
    allGroups &&
    allGroups.map((item: any) => ({
      name: item.name,
      id: item._id,
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

  const handleSave = async () => {
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
        // togglegetTableApiState();
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
        <form>
          <>
            <div className="flex flex-wrap">
              {/* <div className="flex flex-col">
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
                    HostName is {errors["hostname"]}*
                  </p>
                )}
              </div> */}
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
              />
              {errorKeys && errorKeys.includes("groups") && (
                <p className="text-danger text-sm ml-2">
                  Groups is {errors["groups"]}*
                </p>
              )}
            </div>
            <div className="grid grid-flow-row-dense grid-cols-4">
              {/* </div> */}
              {/* <CustomeInput
                label="Device Name"
                name="device_name"
                value={data.device_name}
                onChange={handleInputChange}
                type="text"
                require={true}
              /> */}
              <CustomeInput
                label="Alias"
                name="alias"
                value={data.alias}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <CustomeTextArea
                label="Device Description"
                name="description"
                value={data.description}
                onChange={handleInputChange}
                rows="1"
                require={true}
              />
              <SingleSelect
                label="Select Country"
                selectData={countryNames}
                onChange={handleCountryDropdown}
                require={true}
              />
              <CustomeInput
                label="Location"
                name="location"
                value={data.location}
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
              <CustomeInput
                label="Site Code"
                name="site_code"
                value={data.site_code}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <CustomeInput
                label="Service"
                name="service"
                value={data.service}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <CustomeInput
                label="Latitudes"
                name="latitude"
                value={data.latitude}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <CustomeInput
                label="Longitudes"
                name="longitude"
                value={data.longitude}
                onChange={handleInputChange}
                type="text"
                require={false}
              />
              <SingleSelect
                label="Select TimeZone"
                selectData={tzCodes}
                onChange={handleTimeZoneDropdown}
              />
              {/* <div className="flex ml-2 mt-6">
                <CheckboxTwo
                  label="Auto Provision"
                  checked={data.auto_provision}
                  onChange={handleAutoProvisionCheck}
                />
                <CheckboxTwo
                  label="Check Without Save"
                  checked={data.check_without_save}
                  onChange={handleCheckWithoudSaveCheck}
                />
              </div> */}
            </div>
            <div
              style={{
                margin: ".5rem 1rem",
                display: "flex",
                // justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography
                className="dark:text-textColor"
                // style={{ marginRight: "1rem" }}
              >
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
                className="dark:text-textColor"
                // style={{ marginLeft: "1rem" }}
              >
                Discovery Only
              </Typography>
            </div>
            <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
              <div onClick={handleSave}>
                <CustomeButton title="Save" />
              </div>
              <div onClick={handleDrawerClose}>
                <CustomeCancelButton title="Cancel" />
              </div>
            </div>
          </>
        </form>
      )}
    </div>
  );
};
