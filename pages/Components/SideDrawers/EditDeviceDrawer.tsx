import {
  Button,
  ButtonGroup,
  Checkbox,
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
import CustomeButton, { CustomeCancelButton, SubmitButton } from "../Buttons";
import SingleSelect from "../Selects";
import { makeStyles } from "@material-ui/core/styles";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import {
  addDeviceManager,
  addSingleDevice,
} from "@/pages/api/api/DeviceManagementAPI";
import EditIPAddress from "../DeviceForms/EditIPaddress";
import EditIPRange from "../DeviceForms/EditIPrange";
import Editcidr from "../DeviceForms/Editcird";
// import MultiSelect from "../MultiSelect";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "100%",
  },
}));
const EditDeviceDrawer = (props: any) => {
  const { rowId, open, handleDrawerClose } = props;
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
      // hideBackdrop = {false}temporary
      anchor="right"
      open={open}
      variant="temporary"
      classes={{ paper: classes.drawer }}
      className="shadow-sm shadow-dark-container w-full overflow-y-auto"
    >
      <div className="h-full w-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Edit Asset</p>
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
              <AddSingleDeviceTab
                device_id={rowId}
                handleDrawerClose={handleDrawerClose}
              />
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

export default EditDeviceDrawer;

const AddSingleDeviceTab = (props: any) => {
  const { device_id, handleDrawerClose } = props;

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
          <EditIPAddress
            device_id={device_id}
            handleDrawerClose={handleDrawerClose}
          />
        ) : value == "range" ? (
          <EditIPRange
            device_id={device_id}
            handleDrawerClose={handleDrawerClose}
          />
        ) : (
          <Editcidr device_id={device_id} handleDrawerClose={handleDrawerClose} />
          // <p>hi</p>
        )}
      </div>
    </Box>
  );
};

