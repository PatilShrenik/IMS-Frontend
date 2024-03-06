import replacePeriodsWithUnderscoresSingleObject, {
  replaceUnderscoresWithDots,
} from "@/functions/genericFunctions";
import { getAllCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import {
  addDeviceManager,
  getDeviceByID,
  getDeviceManagerById,
  updateSingleDeviceManager,
} from "@/pages/api/api/DeviceManagementAPI";
import { getAllDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { FormControlLabel, Checkbox, Typography, Switch } from "@mui/material";
import React, { useEffect } from "react";
import { toast, Bounce } from "react-toastify";
import { useAppContext } from "../AppContext";
import { SubmitButton, CustomeCancelButton } from "../Buttons";
import CustomeInput from "../Inputs";
import SingleSelect from "../Selects";

const EditIPRange = (props: any) => {
  const { device_id, handleDrawerClose } = props;
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

  React.useEffect(() => {
    const getDataById = async () => {
      let response = await getDeviceManagerById(device_id);
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
    response = await updateSingleDeviceManager(modifiedData, device_id);
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
            <FormControlLabel
              className="mx-4 dark:text-textColor"
              control={<Checkbox defaultChecked />}
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

export default EditIPRange;
