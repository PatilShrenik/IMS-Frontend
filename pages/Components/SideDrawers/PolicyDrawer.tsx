import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CustomeInput from "../Inputs";
import { useAppContext } from "../AppContext";
import { Bounce, toast } from "react-toastify";
import {
  getAllKeys,
  replaceDotsWithUnderscores,
  replaceUnderscoresWithDots,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import { createCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import CustomeButton, { CustomeCancelButton } from "../Buttons";
import SingleSelect from "../Selects";
import { makeStyles } from "@material-ui/core/styles";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { getIndicatorMapper } from "@/pages/api/api/MiscAPI";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
import { addPolicies } from "@/pages/api/api/PolicyApi";
import CustomInputWithChips from "../InputChip";

const useStyles = makeStyles(() => ({
  drawer: {
    width: "100%",
    // flexShrink: 100,
  },
}));
const PolicyDrawer = (props: any) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [entityType, setEntityType] = useState("GROUP");
  const [selectedEntity, setSelectedEntity] = useState("");
  const [indicators, setIndicators] = useState("");
  const [indicatorsType, setIndicatorsType] = useState("");
  const [operator, setOperator] = useState("");
  const [warning, setWarning] = useState(0);
  const [major, setMajor] = useState(0);
  const [critical, setCritical] = useState(0);
  const [occurrences, setOccurrences] = useState(0);
  const [timeFrame, setTimeFrame] = useState(0);
  const [timeFrameUnit, setTimeFrameUnit] = useState("sec");
  const [autoClearUnit, setAutoClearUnit] = useState("sec");
  const [autoClear, setAutoClear] = useState(0);
  const [indicatorsData, setIndicatorsData] = useState<any>();
  const [deviceData, setDeviceData] = useState<any>();
  const [selection, setSelection] = React.useState("DEVICE");
  const [allGroups, setAllGroups] = React.useState([]);
  const [allDevices, setAllDevices] = React.useState([]);
  const [allindicatorData, setAllindicatorData] = React.useState<any>();
  const [activeButton, setActiveButton] = React.useState<string | null>(
    "DEVICE"
  );
  const { rowId, open, handleDrawerClose } = props;

  const [change, setChange] = React.useState(true);
  const { togglegetPolicyApiState } = useAppContext();
  React.useEffect(() => {
    const getGroups = async () => {
      let response = await getAllGropus();
      setAllGroups(response.result);
    };
    getGroups();
    const getDevices = async () => {
      let response = await getAllDevice();
      setAllDevices(response.result);
    };
    getDevices();
  }, [open]);
  const groupValues = allGroups.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
  const deviceValues = allDevices.map((item: any) => ({
    label: item.hostname,
    value: item._id,
  }));
  React.useEffect(() => {
    const getGroups = async () => {
      let response = await getAllGropus();
      setAllGroups(response.result);
      const groupValues =
        response.result &&
        response.result.map((item: any) => ({
          label: item.name,
          value: item._id,
        }));
      // console.log("----", groupValues);
    };
    getGroups();
    const getIndicators = async () => {
      let response = await getIndicatorMapper();
      const modifiedData = replaceDotsWithUnderscores(response.result);
      // console.log("mod data--------", modifiedData);
      const groupValues =
        modifiedData &&
        modifiedData.map((item: any) => ({
          label: item.indicator,
          value: item.indicator,
        }));
      setIndicatorsData(groupValues);
      setAllindicatorData(modifiedData);
      // console.log("----indicators", response);
    };
    getIndicators();
    const getDevices = async () => {
      let response = await getAllDevice();
      setDeviceData(response.result);
      const groupValues =
        response.result &&
        response.result.map((item: any) => ({
          label: item.name,
          value: item._id,
        }));
      // console.log("----", groupValues);
    };
    getDevices();
  }, []);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create payload

    const convertTimeToSeconds = (value: any, unit: any) => {
      switch (unit) {
        case "SEC":
          return value;
        case "MIN":
          return value * 60;
        case "HOUR":
          return value * 3600;
        default:
          return null; // Handle invalid unit
      }
    };

    // Function to convert auto clear value to seconds
    const convertAutoClearToSeconds = (value: any, unit: any) => {
      switch (unit) {
        case "SEC":
          return value;
        case "MIN":
          return value * 60;
        case "HOUR":
          return value * 3600;
        default:
          return null; // Handle invalid unit
      }
    };
    const payload = {
      policy_name: name,
      description: description, //testing is  pending for this
      tags: [tags],
      entity_type: entityType,
      entities: selectedEntity,
      policy_context: {
        object_type: indicatorsType,
        indicator: indicators,
        operator: operator,
      },
      threshold: {
        critical: critical,
        major: major,
        warning: warning,
      },
      alert_context: {
        occurrence: occurrences,
        time_frame_sec: convertTimeToSeconds(timeFrame, timeFrameUnit),
        time_frame_unit: timeFrameUnit,
        auto_clear_sec: convertAutoClearToSeconds(autoClear, autoClearUnit),
        auto_clear_unit: autoClearUnit,
      },
      notification_context: {
        email_recipients: [email],
        message: message,
      },
    };
    // console.log("payload", payload);
    const modifiedData = replaceUnderscoresWithDots(payload);
    // Handle saving logic
    // console.log("modifiifed payload", modifiedData);
    const addPolicyy = async () => {
      let response = await addPolicies(modifiedData);
      // console.log(response);
      if (response.status === "success") {
        props.handleDrawerClose();
        togglegetPolicyApiState();
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
    try {
      addPolicyy();
    } catch (error) {
      console.log(error);
    }
  };

  const timeFrameUnitOptions = [
    { label: "SEC", value: "SEC" },
    { label: "MIN", value: "MIN" },
    { label: "HOUR", value: "HOUR" },
  ];

  const operatorOptions = [
    {
      label: "GREATER THAN",
      value: ">",
    },
    {
      label: "LESS THAN",
      value: "<",
    },
    {
      label: "EQUAL TO",
      value: "=",
    },
    {
      label: "GREATER THAN EQUAL TO",
      value: ">=",
    },
    {
      label: "LESS THAN EQUAL TO",
      value: "<=",
    },
    {
      label: "NOT EQUAL TO",
      value: "!=",
    },
  ];
  const handleButtonClick = (value: any) => {
    setChange(!change);
    setSelection(value);
    setActiveButton(value);
    // setData({ ...data, entity_type: value, entities: [] });
  };
  const handleDeviceEntities = (values: any) => {
    setSelectedEntity(values);
  };
  const handleGroupEntities = (values: any) => {
    setSelectedEntity(values);
  };

  const handleEmail = (event: any) => {
    // console.log("email", event.target.value);
    setEmail(event.target.value);
  };

  const handleIndicator = (values: any) => {
    // console.log("indicator values", values);
    setIndicators(values);
    const filteredData = allindicatorData.filter(
      (item: any) => values == item.indicator
    );
    const objectTypes =
      filteredData && filteredData[0] && filteredData[0].object_type;
    // console.log("objecttype", objectTypes);
    setIndicatorsType(objectTypes);
  };

  return (
    <Drawer
      anchor="right"
      open={props.open}
      variant="temporary"
      classes={{
        paper: classes.drawer,
      }}
      className={`shadow-sm shadow-dark-container dark:border-l-0`}
    >
      <div className="h-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-5 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Add Policy</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={props.handleDrawerClose}
          />
        </div>
        <div className="px-2 dark:bg-dark-menu-color">
          <form onSubmit={handleSave}>
            <div className="flex flex-col">
              <div className="border-b dark:border-b-dark-border p-4">
                <div className="flex">
                  <CustomeInput
                    label="Name"
                    name="policy_name"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    type="text"
                    disable={false}
                    require={true}
                  />
                  <CustomeInput
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                    type="text"
                    disable={false}
                    require={true}
                  />
                </div>
                <div className="flex ">
                  <Box>
                    <ButtonGroup
                      variant="outlined"
                      aria-label="Basic button group"
                      className="my-4 mx-4"
                    >
                      <Button
                        className={`dark:text-textColor border-primary2 px-[2.75rem] py-2.5 rounded-lg ${
                          activeButton == "DEVICE" &&
                          "bg-primary2 hover:bg-primary2 text-white"
                        }`}
                        onClick={() => {
                          handleButtonClick("DEVICE");
                        }}
                      >
                        Device
                      </Button>
                      <Button
                        className={`dark:text-textColor border-primary2 px-[2.75rem] rounded-lg ${
                          activeButton == "GROUP" &&
                          "bg-primary2 hover:bg-primary2 text-white"
                        }`}
                        onClick={() => {
                          handleButtonClick("GROUP");
                        }}
                      >
                        Group
                      </Button>
                    </ButtonGroup>
                  </Box>
                  <div className="">
                    {selection == "DEVICE" ? (
                      <SingleSelect
                        label="Select Devices"
                        isMulti={true}
                        change={change}
                        title="Select Devices"
                        selectData={deviceValues}
                        onChange={handleDeviceEntities}
                      />
                    ) : (
                      <SingleSelect
                        label="Select Groups"
                        isMulti={true}
                        change={change}
                        title="Select Groups"
                        selectData={groupValues}
                        onChange={handleGroupEntities}
                      />
                    )}
                  </div>
                </div>
                <div className="flex">
                  <CustomeInput
                    label="Tags"
                    name="tags"
                    value={tags}
                    onChange={(e: any) => setTags(e.target.value)}
                    type="text"
                    disable={false}
                    require={true}
                  />
                  {/* <CustomInputWithChips
                    label="Tags"
                    name="tags"
                    value={tags}
                    onChange={(e: any) => setTags(e.target.value)}
                    type="text"
                    disable={false}
                    require={true}
                  /> */}
                  <SingleSelect
                    label="Indicators"
                    selectData={indicatorsData}
                    onChange={handleIndicator}
                    require={true}
                    isMulti={false}
                  />
                  <SingleSelect
                    label="Operator"
                    selectData={operatorOptions}
                    onChange={(value: any) => setOperator(value)}
                    require={true}
                    isMulti={false}
                  />
                </div>
                <div className="flex">
                  <CustomeInput
                    label="Warning"
                    name="warning"
                    value={warning}
                    onChange={(e: any) => setWarning(parseInt(e.target.value))}
                    type="number"
                    disable={false}
                    require={false}
                    color="red-600"
                  />
                  <CustomeInput
                    label="Major"
                    name="major"
                    value={major}
                    onChange={(e: any) => setMajor(parseInt(e.target.value))}
                    type="number"
                    disable={false}
                    require={false}
                    color="orange-400"
                  />
                  <CustomeInput
                    label="Critical"
                    name="critical"
                    value={critical}
                    onChange={(e: any) => setCritical(parseInt(e.target.value))}
                    type="number"
                    disable={false}
                    require={false}
                    color="yellow-400"
                  />
                </div>
                <div className="flex">
                  <CustomeInput
                    label="Occurrences"
                    name="occurrences"
                    value={occurrences}
                    onChange={(e: any) =>
                      setOccurrences(parseInt(e.target.value))
                    }
                    type="number"
                    disable={false}
                    require={true}
                  />

                  <CustomeInput
                    label="Time Frame"
                    name="timeFrame"
                    value={timeFrame}
                    onChange={(e: any) =>
                      setTimeFrame(parseInt(e.target.value))
                    }
                    type="number"
                    disable={false}
                    require={true}
                  />

                  <SingleSelect
                    label="Unit"
                    selectData={timeFrameUnitOptions}
                    onChange={(value: any) => setTimeFrameUnit(value)}
                    require={true}
                    isMulti={false}
                  />
                </div>
                <div className="flex">
                  <CustomeInput
                    label="Auto Clear"
                    name="autoClear"
                    value={autoClear}
                    onChange={(e: any) =>
                      setAutoClear(parseInt(e.target.value))
                    }
                    type="number"
                    disable={false}
                    require={true}
                  />
                  <SingleSelect
                    label="Unit"
                    selectData={timeFrameUnitOptions}
                    onChange={(value: any) => setAutoClearUnit(value)}
                    require={true}
                    isMulti={false}
                  />
                </div>
              </div>
              <div className="p-4">
                <div>
                  <p className="ml-4 dark:text-textColor">Notify to : </p>
                </div>
                <div className="flex">
                  <CustomeInput
                    label="Email"
                    name="notifyTo"
                    value={email}
                    onChange={(e: any) => handleEmail(e)}
                    type="text"
                    disable={false}
                    require={true}
                  />
                  <CustomeInput
                    label="Message"
                    name="message"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    type="text"
                    disable={false}
                    require={true}
                  />
                </div>
              </div>
            </div>
            <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
              <div>
                <button
                  className="mx-2 inline-flex items-center justify-center rounded-md py-1 px-6 text-center font-medium text-white bg-primary2 hover:bg-opacity-90 lg:px-6 xl:px-6 cursor-pointer"
                  type="submit"
                  disabled={warning == 0 && major == 0 && critical == 0}
                >
                  Save
                </button>
              </div>
              <div onClick={props.handleDrawerClose}>
                <CustomeCancelButton title="Cancel" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Drawer>
  );
};

export default PolicyDrawer;
