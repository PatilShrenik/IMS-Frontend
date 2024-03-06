import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import replacePeriodsWithUnderscoresSingleObject, {
  replaceUnderscoresWithDots,
} from "@/functions/genericFunctions";
import { getAllCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import {
  addSingleDevice,
  getDeviceByID,
  updateSingleDevice,
} from "@/pages/api/api/DeviceManagementAPI";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { FormControlLabel, Checkbox, Typography, Switch } from "@mui/material";
import { toast, Bounce } from "react-toastify";
import { SubmitButton, CustomeCancelButton } from "../Buttons";
import CustomeInput from "../Inputs";
import SingleSelect from "../Selects";
import Select from "react-select";
import { AnyNsRecord } from "dns";
const EditIPAddress = (props: any) => {
  const { device_id, handleDrawerClose } = props;
  const { toggleDeviceTableState } = useAppContext();
  const initialState = {
    plugin_type: "SNMP",
    profile_type: "ip.address",
    hostname: "",
    ip_address: null,
    port: "161",
    credential_profiles: [],
    discovery_schedulers: [],
    groups: [1000000001011],
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
  const [selectedValue, setSelectedValue] = useState();
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
    };
    getGroups();
    const getDiscoveryScheduler = async () => {
      let response = await getAllDiscoverySch();
      setAllDiscoverySch(response.result);
    };
    getDiscoveryScheduler();
  }, []);

  // console.log("data in assets", data.credential_profiles[0]);
  React.useEffect(() => {
    const getDataById = async () => {
      let response = await getDeviceByID(device_id);
      const modifiedData = replacePeriodsWithUnderscoresSingleObject(
        response.result
      );
      setData(modifiedData);
      console.log("single device data", modifiedData);
    };
    getDataById();
  }, [device_id]);
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
  console.log("groups", groupValues);

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

  const handleCheckboxChange = (event: any) => {
    setData({ ...data, flow_enabled: event.target.checked });
  };

  const handleDeviceType = (selectedOption: any) => {
    setData({
      ...data,
      device_type: selectedOption.value,
    });
  };

  const handleCredProfile = (values: any) => {
    const val = parseInt(values);
    setData({
      ...data,
      credential_profiles: [val],
    });
  };

  useEffect(() => {
    if (data && data.credential_profiles) {
      setSelectedValue(data.credential_profiles[0]);
    }
  }, [data]);

  const handleGroupDropdown = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setData({
      ...data,
      groups: selectedValues,
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
    response = await updateSingleDevice(modifiedData, device_id);
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
  const [selectedValues, setSelectedValues] = useState([]);

  // const handleGroupDropdown = (selectedOptions) => {
  //   setSelectedValues(selectedOptions);
  //   // Your other logic here
  // };

  // Extracting groups from the data
  const groups = data.groups;

  // Filtering groupValues array to find objects whose value matches the values in groups
  const defaultSelectedOptions = groupValues.filter((option) =>
    groups.includes(option.value)
  );
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
                value={data && data.hostname}
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
                value={data && data.ip_address}
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
              value={data && data.port}
              onChange={handleInputChange}
              type="text"
              require={true}
            />
          </div>
          {/* <div className="flex"> */}
          <div className="flex flex-col">
            {/* <SingleSelect
              // label="Select Credential Profile"
              selectData={credsProfileValues}
              onChange={handleCredProfile}
              require={true}
              value={data.credential_profiles[0]}
              isMulti={false}
            /> */}

            <Select
              onChange={handleCredProfile}
              value={credsProfileValues.find(
                (option) => option.value === selectedValue
              )}
              // defaultValue={data.credential_profiles[0]}
              required={true}
              options={credsProfileValues}
              className="my-react-select-container w-[18rem] rounded-lg  mx-4 my-4 z-999"
              classNamePrefix="my-react-select"
            />

            {errorKeys && errorKeys.includes("credential.profiles") && (
              <p className="text-danger text-sm ml-2">
                Credential Profiles is {errors["credential.profiles"]} *
              </p>
            )}
          </div>
          <div className="flex flex-col">
            {/* <SingleSelect
              label="Select Group"
              selectData={groupValues}
              onChange={handleGroupDropdown}
              require={true}
              values={data && data.group}
              isMulti={true}
            /> */}

            <Select
              onChange={handleGroupDropdown}
              value={defaultSelectedOptions}
              isMulti={true}
              required={true}
              options={groupValues}
              className="my-react-select-container w-[18rem] rounded-lg mx-4 my-4 z-999"
              classNamePrefix="my-react-select"
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
              value={data && data.alias}
              onChange={handleInputChange}
              type="text"
              require={false}
            />

            <CustomeInput
              label="Site"
              name="site"
              value={data && data.site}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            {/* <SingleSelect
              label="Device Type"
              selectData={[
                { label: "Router", value: "Router" },
                { label: "Switch", value: "Switch" },
                { label: "FireWall", value: "FireWall" },
              ]}
              onChange={handleDeviceType}
              require={true}
              values={[]}
            /> */}
            <Select
              onChange={handleDeviceType}
              value={{ label: data.device_type, value: data.device_type }} // Setting value based on data.device_type
              required={true}
              options={[
                { label: "Router", value: "Router" },
                { label: "Switch", value: "Switch" },
                { label: "FireWall", value: "FireWall" },
              ]}
              className="my-react-select-container w-[18rem] rounded-lg mx-4 my-4 z-999"
              classNamePrefix="my-react-select"
            />
            <CustomeInput
              label="OEM"
              name="oem"
              value={data && data.oem}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System"
              name="os"
              value={data && data.os}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Vendor"
              name="vendor"
              value={data && data.vendor}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Operating System Version"
              name="os_version"
              value={data && data.os_version}
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
                  checked={data && data.flow_enabled}
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
                checked={data && data.auto_provision === "discovery"}
                onChange={() =>
                  handleRadioChange({
                    target: {
                      name: "auto_provision",
                      value:
                        data && data.auto_provision === "monitoring"
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

export default EditIPAddress;
