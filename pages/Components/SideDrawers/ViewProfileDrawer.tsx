import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Drawer } from "@mui/material";
import CustomeInput, { DateInput } from "../Inputs";
import { useAppContext } from "../AppContext";
import {
    replaceDotsWithUnderscores,
    replaceDotsWithUnderscoresSec,
    replaceUnderscoresWithDots,
    replaceUnderscoresWithDotsNested,
  } from "@/functions/genericFunctions";
  import SingleSelect from "../Selects";
  import { styled } from "@mui/material";
  import countries from "country-list";
import timezones from "timezones-list";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { FormControlLabel, Checkbox, Typography, Switch } from "@mui/material";

import { toast, Bounce } from "react-toastify";

import { SubmitButton, CustomeCancelButton } from "../Buttons";

  import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { getDeviceManagerById } from "@/pages/api/api/DeviceManagementAPI";
import { getAllCredsProfile } from "@/pages/api/api/CredentialProfileAPI";

  // const useStyles = makeStyles(() => ({
  //   drawer: {
  //     // width: drawerWidth,
  //     flexShrink: 100,
  //   },
  //   drawerPaper: {
  //     // width: drawerWidth,
  //     backdropFilter: "brightness(80%)", // Adjust the brightness for opacity
  //   },
  // }));

const useStyles = makeStyles((theme) => ({
    drawer: {
      width: "100%",
    },
  }));
const ViewProfileDrawer = (props: any) => {
    const { open, handleDrawerClose, id } = props;
    const classes = useStyles();
    const [data, setData] = React.useState<any>([]);
    const [allCredsPrfile, setAllCredsProfil] = React.useState([]);
    const [allGroups, setAllGroups] = React.useState([]);
    const [selectedCredValue, setSelectedCredValue] = useState<any>([]);
    const [selectedGroupValue, setSelectedGroupValue] = React.useState<any>([]);
    const [selectedCountryValue, setCountrySelectedValue] = React.useState<any>([]);
    const [selectedTimezoneValue, setSelectedTimezoneValue] = React.useState<any>([]);
    const [selectedDeviceType, setSelectedDeviceType] = React.useState<any>([]);
    
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
    const deviceType = [ { label: "Router", value: "Router" },
    { label: "Switch", value: "Switch" },
    { label: "FireWall", value: "FireWall" },
  ]
  const countryNames = countries.getNames();
 // console.log("country names",countryNames)
  const countriesArray = countryNames.map((name) => ({
    label: name,
    value: name,
  }));

  const tzCodes = timezones.map((timezone) => timezone.tzCode);
 // console.log("tzCodes",tzCodes)
  const timezonesArray = tzCodes.map((tzCode) => ({
    label: tzCode,
    value: tzCode,
  }));

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
   
  }, []);

    React.useEffect(() => {
        if (open) {
          try {
            const getDeviceManager = async () => {
            //  console.log("edit id----", id);
              let response = await getDeviceManagerById(id);
              console.log("data----",response.result);
              const modifiedData = replaceDotsWithUnderscores(response.result);
              setData(modifiedData); 
              console.log("data.........",modifiedData);
            };
            getDeviceManager();
          } catch (error) {
            console.log(error);
          }
        }
      }, [id, open]);

      useEffect(() => {
        if (data && data.credential_profiles) {
          setSelectedCredValue(data.credential_profiles);
        }
        if (data && data.groups) {
          data.groups && setSelectedGroupValue(data.groups);
        }
        if (data && data.country){
          data.country && setCountrySelectedValue(data.country)
        }
        if (data && data.timeZone){
          data.timeZone && setSelectedTimezoneValue(data.timeZone)
        }
        if (data && data.device_type){
          data.device_type && setSelectedDeviceType(data.device_type)
        }
      }, [data]);
      

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
          <p className="text-primary2 font-semibold"> View Profile </p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <div className="">
          <div className="grid grid-flow-row-dense grid-cols-4 mt-4">
            <CustomeInput
              label="Host Name"
              name="profile_name"
              value={data.profile_name}
              // onChange={handleInputChange}
              type="text"
              require={true}
            />
            {data.profile_type === "ip.range" && (
              <>
                <CustomeInput
                  label="Start IP"
                  name="start_ip"
                  value={data.start_ip}
                  // onChange={handleInputChange}
                  type="text"
                  require={true}
                />
                <CustomeInput
                  label="End IP"
                  name="end_ip"
                  value={data.end_ip}
                  // onChange={handleInputChange}
                  type="text"
                  require={true}
                />
              </>
            )}

            {data.profile_type === "cidr" && (
              <CustomeInput
                label="CIDR"
                name="cidr"
                value={data.cidr} 
                // onChange={handleInputChange}
                type="text"
                require={true}
              />
            )}
            <CustomeInput
              label="Port"
              name="port"
              value={data.port}
              // onChange={handleInputChange}
              type="text"
              require={true}
            />
    
            <SingleSelect
              label="Select Credential Profile"
            //  selectData={credsProfileValues}
              // onChange={handleCredProfile}
              require={true}
              value={credsProfileValues.filter(
                (option) =>
                  selectedCredValue &&
                  selectedCredValue.includes(option.value)
              )}
              isMulti={true}
            />
            <SingleSelect
              label="Select Group"
            //  selectData={groupValues}
              // onChange={handleGroupDropdown}
              value={groupValues.filter(
                (option) =>
                  selectedGroupValue &&
                  selectedGroupValue.includes(option.value)
              )}
              require={true}
              isMulti={true}
            />
          </div>
          <div className="grid grid-flow-row-dense grid-cols-4">
            <CustomeInput
              label="Alias"
              name="alias"
              value={data.alias}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Site"
              name="site"
              value={data.site}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Site Code"
              name="site_code"
              value={data.site_code}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Location"
              name="location"
              value={data.location}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Service"
              name="service"
              value={data.service}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Latitude"
              name="latitide"
              value={data.latitide}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Longitude"
              name="longitude"
              value={data.longitude}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <SingleSelect
              label="Device Type"
              selectData={deviceType}
              // onChange={handleDeviceType}
              require={true}
              value={deviceType.filter(
                (day) =>
                  selectedDeviceType &&
                  selectedDeviceType.includes(day.value)
              )}
            />
            <SingleSelect
              label="Country"
              selectData={countriesArray}
              // onChange={handleCountry}
              require={false}
              values={data.country}
              value={countriesArray.filter(
                (day: { value: any }) =>
                  selectedCountryValue && selectedCountryValue.includes(day.value)
              )}
            />
            <SingleSelect
              label="TimeZone"
              selectData={timezonesArray}
              // onChange={handleTimeZone}
              require={false}
              value={timezonesArray.filter(
                (day: { value: any }) =>
                selectedTimezoneValue && selectedTimezoneValue.includes(day.value)
              )}
            />
            <CustomeInput
              label="OEM"
              name="oem"
              value={data.oem}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System"
              name="os"
              value={data.os}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Vendor"
              name="vendor"
              value={data.vendor}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System Version"
              name="os_version"
              value={data.os_version}
              // onChange={handleInputChange}
              type="text"
              require={false}
            />
            <FormControlLabel
              className="mx-4 dark:text-textColor"
              //  control={<Checkbox defaultChecked />}
             control={<Checkbox disabled />}
              label="Flow Enabled"
            />
          </div>
          <div
            style={{
              margin: ".5rem 1rem",
              display: "flex",
              // justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography className="dark:text-textColor">
              Auto Provision
            </Typography>
            <Switch
              checked={data.auto_provision === "discovery"}
              // onChange={() =>
              //   handleRadioChange({
              //     target: {
              //       name: "auto_provision",
              //       value:
              //         data.auto_provision === "monitoring"
              //           ? "discovery"
              //           : "monitoring",
              //     },
              //   })
              // }
              color="primary"
            />
            <Typography className="dark:text-textColor">
              Discovery Only
            </Typography>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default ViewProfileDrawer