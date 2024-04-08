import { replaceUnderscoresWithDots } from "@/functions/genericFunctions";
import { getAllCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import { addDeviceManager } from "@/pages/api/api/DeviceManagementAPI";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { FormControlLabel, Checkbox, Typography, Switch } from "@mui/material";
import React, { useEffect } from "react";
import countries from "country-list";
import timezones from "timezones-list";
import { toast, Bounce } from "react-toastify";
import { useAppContext } from "../AppContext";
import { SubmitButton, CustomeCancelButton } from "../Buttons";
import CustomeInput from "../Inputs";
import SingleSelect from "../Selects";

const Editcidr = (props: any) => {
  const { toggleDeviceTableState } = useAppContext();
  const { handleDrawerClose } = props;
  const initialState = {
    plugin_type: "SNMP",
    profile_type: "cidr",
    profile_name: "",
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

  const countryNames = countries.getNames();
  const countriesArray = countryNames.map((name) => ({
    label: name,
    value: name,
  }));

  const tzCodes = timezones.map((timezone) => timezone.tzCode);
  const timezonesArray = tzCodes.map((tzCode) => ({
    label: tzCode,
    value: tzCode,
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

  const handleCountry = (value: any) => {
    setData({
      ...data,
      country: value,
    });
  };
  const handleTimeZone = (value: any) => {
    setData({
      ...data,
      timeZone: value,
    });
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
                label="Host Name"
                name="profile_name"
                value={data.profile_name}
                onChange={handleInputChange}
                type="text"
                require={true}
              />
              {errorKeys && errorKeys.includes("profile_name") && (
                <p className="text-danger text-sm ml-2">
                  HostName is {errors["profile_name"]}*
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
              value={data.credential_profiles[0]}
              isMulti={false}
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
              values={data.group}
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
            <CustomeInput
              label="Site Code"
              name="site_code"
              value={data.site_code}
              onChange={handleInputChange}
              type="text"
              require={false}
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
              label="Service"
              name="service"
              value={data.service}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Latitude"
              name="latitide"
              value={data.latitide}
              onChange={handleInputChange}
              type="text"
              require={false}
            />
            <CustomeInput
              label="Longitude"
              name="longitude"
              value={data.longitude}
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
              require={true}
              // values={[]}
            />
            <SingleSelect
              label="Country"
              selectData={countriesArray}
              onChange={handleCountry}
              require={false}
              values={data.country}
            />
            <SingleSelect
              label="TimeZone"
              selectData={timezonesArray}
              onChange={handleTimeZone}
              require={false}
              values={data.timeZone}
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
            {/* <FormControlLabel
              className="mx-4 dark:text-textColor"
              control={<Checkbox defaultChecked />}
              label="Flow Enabled"
            /> */}
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
export default Editcidr;
