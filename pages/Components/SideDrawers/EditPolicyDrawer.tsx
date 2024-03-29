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
  replaceDotsWithUnderscoresSEC,
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
import {
  addPolicies,
  getPolicyById,
  updatePolicy,
} from "@/pages/api/api/PolicyApi";
import SecSingleSelect from "../Selects/secSelect";

const useStyles = makeStyles(() => ({
  drawer: {
    width: "75%",
    // flexShrink: 100,
  },
}));
const EditPolicyDrawer = (props: any) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("");
  const [indicatorsData, setIndicatorsData] = useState<any>();
  const [deviceData, setDeviceData] = useState<any>();
  const [selection, setSelection] = React.useState("DEVICE");
  const [allGroups, setAllGroups] = React.useState([]);
  const [allDevices, setAllDevices] = React.useState([]);
  const [allindicatorData, setAllindicatorData] = React.useState<any>();
  const [activeButton, setActiveButton] = React.useState<string | null>(
    "DEVICE"
  );
  const [selectedGroupValue, setSelectedGroupValue] = React.useState<any>([]);
  const [selectedIndicator, setSelectedIndicator] = React.useState<any>([]);
  const [selectedOperator, setSelectedOperator] = React.useState<any>([]);
  const [SelectedTimeFrameUnit, setSelectedTimeFrameUnit] = React.useState<any>(
    []
  );
  const [SelectedAlertFrameUnit, setSelectedAlertFrameUnit] =
    React.useState<any>([]);
  const [covertedTimeFrame, setConvertedTimeFrame] = useState<any>();
  const [covertedAutoClear, setConvertedAutoClear] = useState<any>();
  const [covertedTimeFrameUnit, setConvertedTimeFrameUnit] = useState<any>();
  const [covertedAutoClearUnit, setConvertedAutoClearUnit] = useState<any>();
  const [selectedDeviceValue, setSelectedDeviceValue] = React.useState<any>([]);
  const [data, setData] = useState<any>({});
  const [dataToModify, setDataToModify] = useState<any>({});
  const [change, setChange] = React.useState(true);
  const { togglegetPolicyApiState } = useAppContext();
  const { rowId, open, handleDrawerClose } = props;

  function convertKeys(obj: any) {
    const newObj: any = {};
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey: any = key.replace(/\./g, "_");
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          newObj[newKey] = convertKeys(obj[key]);
        } else {
          newObj[newKey] = obj[key];
        }
      }
    }
    return newObj;
  }
  useEffect(() => {
    if (open) {
      const getById = async () => {
        let response = await getPolicyById(rowId);
        const modifiedData = convertKeys(response.result);
        // console.log("OG data------", response.result);
        // console.log("modi data------", modifiedData);
        setData(modifiedData);
      };
      getById();
    }
  }, [open]);
  //   console.log("data------", data);

  useEffect(() => {
    if (data) {
      setDataToModify(data);
    }
  }, [data]);
  // console.log("converted timeframe", covertedTimeFrame);
  useEffect(() => {
    if (dataToModify) {
      dataToModify.entity_type && setActiveButton(dataToModify.entity_type);
      dataToModify.entity_type && setSelection(dataToModify.entity_type);
      dataToModify &&
        dataToModify.operator &&
        setSelectedOperator([dataToModify.operator]);
      dataToModify &&
        dataToModify.time_frame_unit &&
        setSelectedTimeFrameUnit([dataToModify.time_frame_unit]);

      dataToModify &&
        dataToModify.time_frame_sec &&
        dataToModify.time_frame_unit &&
        setConvertedTimeFrame(
          convertTimeFrameToOG(
            dataToModify.time_frame_sec,
            dataToModify.time_frame_unit
          )
        );

      dataToModify &&
        dataToModify.auto_clear_sec &&
        dataToModify.auto_clear_unit &&
        setConvertedAutoClear(
          convertTimeFrameToOG(
            dataToModify.auto_clear_sec,
            dataToModify.auto_clear_unit
          )
        );

      dataToModify &&
        dataToModify.auto_clear_unit &&
        setSelectedAlertFrameUnit([dataToModify.auto_clear_unit]);
      dataToModify &&
        dataToModify.indicator &&
        setSelectedIndicator([dataToModify.indicator]);
      if (dataToModify && dataToModify.entity_type === "DEVICE") {
        setSelectedDeviceValue(dataToModify.entities);
      }
      if (dataToModify && dataToModify.entity_type === "GROUP") {
        setSelectedGroupValue(dataToModify.entities);
      }
    }
  }, [dataToModify]);

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
      //   console.log("----", groupValues);
    };
    getGroups();
    const getIndicators = async () => {
      let response = await getIndicatorMapper();
      const modifiedData = replaceDotsWithUnderscores(response.result);
      //   console.log("mod data--------", modifiedData);
      const groupValues =
        modifiedData &&
        modifiedData.map((item: any) => ({
          label: item.indicator,
          value: item.indicator,
        }));
      setIndicatorsData(groupValues);
      setAllindicatorData(modifiedData);
      //   console.log("----indicators", response);
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

  const convertTimeFrameToSeconds = (value: any, unit: any) => {
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
  const convertTimeFrameToOG = (value: any, unit: any) => {
    console.log("time in connber", value, unit);
    switch (unit) {
      case "SEC":
        return value;
      case "MIN":
        return value / 60;
      case "HOUR":
        return value / 3600;
      default:
        return null; // Handle invalid unit
    }
  };
  // const convertAutoClearToOG = (value: any, unit: any) => {
  //   switch (unit) {
  //     case "SEC":
  //       return value;
  //     case "MIN":
  //       return value / 60;
  //     case "HOUR":
  //       return value / 3600;
  //     default:
  //       return null; // Handle invalid unit
  //   }
  // };
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
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create payload

    const payload = {
      name: dataToModify.name,
      description: dataToModify.description,
      tags: dataToModify.tags,
      entity_type: dataToModify.entity_type,
      entities: dataToModify.entities,
      object_type: dataToModify.object_type,
      indicator: dataToModify.indicator,
      operator: dataToModify.operator,
      threshold: {
        critical: dataToModify.threshold.critical,
        major: dataToModify.threshold.major,
        warning: dataToModify.threshold.warning,
      },
      occurrences: dataToModify.occurrences,
      time_frame_sec: convertTimeFrameToSeconds(
        covertedTimeFrame,
        SelectedTimeFrameUnit
      ),
      time_frame_unit: SelectedTimeFrameUnit,
      auto_clear_sec: convertAutoClearToSeconds(
        covertedAutoClear,
        SelectedAlertFrameUnit
      ),
      auto_clear_unit: SelectedAlertFrameUnit,
      notification_context: {
        email_recipients: [dataToModify.notification_context.email_recipients],
        message: dataToModify.notification_context.message,
      },
    };
    // console.log("payload------------", payload);
    const modifiedData = replaceUnderscoresWithDots(payload);
    // Handle saving logic
    // console.log("modifiifed payload", modifiedData);
    const editPolicy = async () => {
      let response = await updatePolicy(modifiedData, data._id);
      //   console.log(response);
      if (response.status === "success") {
        props.handleDrawerClose();
        togglegetPolicyApiState();
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
          autoClose: 1000,
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
    try {
      editPolicy();
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
    setDataToModify({
      ...dataToModify,
      entity_type: value,
    });
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
    // setIndicators(values);

    const filteredData = allindicatorData.filter(
      (item: any) => values == item.indicator
    );
    const objectTypes =
      filteredData && filteredData[0] && filteredData[0].object_type;
    // console.log("objecttype", objectTypes);
    // setIndicatorsType(objectTypes);

    setDataToModify((prevData: any) => ({
      ...prevData,

      object_type: objectTypes,
      indicator: values,
    }));
  };
  const handleEntities = (values: any) => {
    // console.log("--------#########", values);
    setDataToModify({
      ...dataToModify,
      entities: values,
    });
  };
  const handleOperator = (values: any) => {
    // console.log("--------#########", values);
    setDataToModify((prevData: any) => ({
      ...prevData,

      operator: values,
    }));
  };

  const handleAlertContextTimeFrame = (value: any) => {
    // setConvertedTimeFrameUnit(value);
    setSelectedTimeFrameUnit(value);
    // setDataToModify((prevData: any) => ({
    //   ...prevData,

    //   time_frame_unit: value,
    // }));
  };

  const handleAlertContextAlertFrame = (value: any) => {
    // setConvertedAutoClearUnit(value);
    setSelectedAlertFrameUnit(value);
    // setDataToModify((prevData: any) => ({
    //   ...prevData,

    //   auto_clear_unit: value,
    // }));
  };
  const handleThreshold = (event: any) => {
    // console.log("--------#########", values);
    const { name, value } = event.target;
    // console.log("values", name, value);
    setDataToModify((prevData: any) => ({
      ...prevData,
      threshold: {
        ...prevData.threshold,
        [name]: value,
      },
    }));
  };

  const handleAlertContext = (event: any) => {
    // console.log("--------#########", values);
    const { name, value } = event.target;
    // console.log("values", name, value);
    // setDataToModify((prevData: any) => ({
    //   ...prevData,

    //   [name]: value,
    // }));
    if (name == "time_frame_sec") {
      setConvertedTimeFrame(value);
    } else if (name == "auto_clear_sec") {
      setConvertedAutoClear(value);
    }
    // setDataToModify((prevData: any) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };

  const handleNotificationEmail = (event: any) => {
    // console.log("--------#########", values);
    const { name, value } = event.target;
    console.log("values", name, value);
    setDataToModify((prevData: any) => ({
      ...prevData,
      notification_context: {
        ...prevData.notification_context,
        [name]: value,
      },
    }));
    // value &&
    //   Array.isArray(value) &&
    //   value.map((d: any, i: any) => {
    //     setDataToModify((prevData: any) => ({
    //       ...prevData,
    //       notification_context: {
    //         ...prevData.notification_context,
    //         [name]: d,
    //       },
    //     }));
    //   });
  };

  const handleTags = (event: any) => {
    setDataToModify((prevData: any) => ({
      ...prevData,
      tags: [event.target.value],
    }));
  };

  const handlePayload = (event: any) => {
    const { name, value } = event.target;
    setDataToModify((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
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
          <p className="text-primary2 font-semibold">Edit Policy</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={() => {
              props.handleDrawerClose();
            }}
          />
        </div>
        <div className="px-2 dark:bg-dark-menu-color">
          <form onSubmit={handleSave}>
            <div className="flex flex-col">
              <div className="border-b dark:border-b-dark-border p-4">
                <div className="flex">
                  <CustomeInput
                    label="Name"
                    name="name"
                    value={dataToModify.name}
                    onChange={(e: any) => handlePayload(e)}
                    type="text"
                    disable={false}
                    require={true}
                  />
                  <CustomeInput
                    label="Description"
                    name="description"
                    value={dataToModify.description}
                    onChange={(e: any) => handlePayload(e)}
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
                        value={deviceValues.filter((option: any) =>
                          selectedDeviceValue.includes(option.value)
                        )}
                        selectData={deviceValues}
                        onChange={handleEntities}
                      />
                    ) : (
                      <SingleSelect
                        label="Select Groups"
                        isMulti={true}
                        value={groupValues.filter((option: any) =>
                          selectedGroupValue.includes(option.value)
                        )}
                        selectData={groupValues}
                        onChange={handleEntities}
                      />
                    )}
                  </div>
                </div>
                <div className="flex">
                  <CustomeInput
                    label="Tags"
                    name="tags"
                    value={dataToModify.tags}
                    onChange={(e: any) => handleTags(e)}
                    type="text"
                    disable={false}
                    require={true}
                  />
                  <SingleSelect
                    label="Indicators"
                    selectData={indicatorsData}
                    onChange={handleIndicator}
                    require={true}
                    isMulti={false}
                    value={
                      indicatorsData &&
                      indicatorsData.filter((option: any) =>
                        selectedIndicator.includes(option.value)
                      )
                    }
                  />
                  <SingleSelect
                    label="Operator"
                    selectData={operatorOptions}
                    onChange={handleOperator}
                    require={true}
                    isMulti={false}
                    value={
                      operatorOptions &&
                      operatorOptions.filter((option: any) =>
                        selectedOperator.includes(option.value)
                      )
                    }
                  />
                </div>
                <div className="flex">
                  <CustomeInput
                    label="Warning"
                    name="warning"
                    value={
                      dataToModify &&
                      dataToModify.threshold &&
                      dataToModify.threshold.warning
                    }
                    onChange={(e: any) => handleThreshold(e)}
                    type="number"
                    disable={false}
                    require={false}
                    color="red-600"
                  />
                  <CustomeInput
                    label="Major"
                    name="major"
                    value={
                      dataToModify &&
                      dataToModify.threshold &&
                      dataToModify.threshold.major
                    }
                    onChange={(e: any) => handleThreshold(e)}
                    type="number"
                    disable={false}
                    require={false}
                    color="orange-400"
                  />
                  <CustomeInput
                    label="Critical"
                    name="critical"
                    value={
                      dataToModify &&
                      dataToModify.threshold &&
                      dataToModify.threshold.critical
                    }
                    onChange={(e: any) => handleThreshold(e)}
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
                    value={dataToModify && dataToModify.occurrences}
                    onChange={(e: any) => handleAlertContext(e)}
                    type="number"
                    disable={false}
                    require={true}
                  />

                  <CustomeInput
                    label="Time Frame"
                    name="time_frame_sec"
                    // value={dataToModify && dataToModify.time_frame_sec}
                    value={covertedTimeFrame}
                    // value={
                    //   dataToModify &&
                    //   dataToModify.time_frame_sec &&
                    //   SelectedTimeFrameUnit &&
                    //   SelectedTimeFrameUnit[0]
                    //     ? SelectedTimeFrameUnit[0] === "MIN"
                    //       ? dataToModify.time_frame_sec / 60
                    //       : SelectedTimeFrameUnit[0] === "HOUR"
                    //       ? dataToModify.time_frame_sec / 3600
                    //       : dataToModify.time_frame_sec
                    //     : ""
                    // }
                    onChange={(e: any) => handleAlertContext(e)}
                    type="number"
                    disable={false}
                    require={true}
                  />
                  <SingleSelect
                    label="Unit"
                    selectData={timeFrameUnitOptions}
                    onChange={handleAlertContextTimeFrame}
                    require={true}
                    isMulti={false}
                    value={
                      timeFrameUnitOptions &&
                      timeFrameUnitOptions.filter((option: any) =>
                        SelectedTimeFrameUnit.includes(option.value)
                      )
                    }
                  />
                </div>
                <div className="flex">
                  <CustomeInput
                    label="Auto Clear"
                    name="auto_clear_sec"
                    // value={dataToModify && dataToModify.auto_clear_sec}
                    value={covertedAutoClear}
                    onChange={(e: any) => handleAlertContext(e)}
                    type="number"
                    disable={false}
                    require={true}
                  />
                  <SingleSelect
                    label="Unit"
                    selectData={timeFrameUnitOptions}
                    onChange={handleAlertContextAlertFrame}
                    require={true}
                    isMulti={false}
                    value={
                      timeFrameUnitOptions &&
                      timeFrameUnitOptions.filter((option: any) =>
                        SelectedAlertFrameUnit.includes(option.value)
                      )
                    }
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
                    name="email_recipients"
                    value={
                      dataToModify &&
                      dataToModify.notification_context &&
                      dataToModify.notification_context.email_recipients
                    }
                    onChange={(e: any) => handleNotificationEmail(e)}
                    type="text"
                    disable={false}
                    require={true}
                  />
                  <CustomeInput
                    label="Message"
                    name="message"
                    value={
                      dataToModify &&
                      dataToModify.notification_context &&
                      dataToModify.notification_context.message
                    }
                    onChange={(e: any) => handleNotificationEmail(e)}
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
                  //   disabled={warning == 0 && major == 0 && critical == 0}
                >
                  Save
                </button>
              </div>

              <div
                onClick={() => {
                  props.handleDrawerClose();
                }}
              >
                <CustomeCancelButton title="Cancel" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Drawer>
  );
};

export default EditPolicyDrawer;
