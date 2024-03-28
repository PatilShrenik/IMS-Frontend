import React, { useState, useEffect } from "react";
import {
  replacePeriodsWithUnderscoresArrayOfObjects,
  replaceUnderscoresWithDots,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import { Button, ButtonGroup, InputLabel, Zoom } from "@mui/material";
import CustomeButton, { CustomeCancelButton } from "../Components/Buttons";
import CustomeInput, { CustomeTextArea } from "../Components/Inputs";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SingleSelect from "../Components/Selects";
import { getAllDevice } from "../api/api/DeviceManagementAPI";
import { getAllGropus } from "../api/api/GroupsAPI";
import { v4 as uuidv4 } from "uuid";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider, DateRangePicker, Tooltip } from "rsuite";
import {
  getIndicatorMapper,
  getIndicatorMapperMetric,
} from "../api/api/MiscAPI";
import SecSingleSelect from "../Components/Selects/secSelect";
import { useAppContext } from "../Components/AppContext";
import moment from "moment";
import { addChartWidget } from "../api/api/ReportsAPI";
import { toast } from "react-toastify";
import { useWebSocketContext } from "../Components/WebSocketContext";
import PieChartComponent from "../Components/Charts/PieChart";
import TimeRangePicker from "../Components/TimeRnangePicker";

const TOPNWidget = (props: any) => {
  const { handleAddDrawerClose } = props;
  const { toggleWidgetApiState, themeSwitch } = useAppContext();

  const options = ["Metric"];
  // const [timePeriod, setTimePeriod] = React.useState<any>([
  //   new Date(time),
  //   new Date(timeEnd),
  // ]);
  const [timePeriod, setTimePeriod] = useState({
    start_timestamp: null,
    end_timestamp: null,
  }) as any;
  const [dropdowns, setDropdowns] = useState([
    { indicator: "", aggregation: "", indicator_type: "" },
  ]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [allDevices, setAllDevices] = React.useState([]);
  const [selection, setSelection] = React.useState("device");
  const [activeButton, setActiveButton] = React.useState<string | null>(
    "device"
  );
  const [resultByactiveButton, setResultByActiveButton] = React.useState<
    string | null
  >("device");

  const [groupByArray, setGroupByArray] = React.useState([
    { name: "device", id: "device" },
  ]);
  const [mapperdData, setMappersData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [indicatorType, setIndicatorType] = React.useState("");
  const [indicatorsArray, setIndicatorsArray] = React.useState([]);
  const [indicatorValues, setIndicatorValues] = React.useState([]) as any;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [data, setData] = React.useState<any>({
    name: "",
    description: "",
    widget_type: "topN",
    datasource: "",
    limit: "",
    indicator_group: "",
    indicators: [{ aggregation: "", indicator: "", indicator_type: "" }],
    group_by: "",
    order_by: {
      indicator: "",
      indicator_type: "",
      direction: "",
    },
    time_range: "custom",
    start_timestamp: "",
    end_timestamp: "",
    filters: {
      device_filter: {
        entity_type: activeButton,
        entities: [],
      },
    },
  });

  const pageID: any = Math.floor(Math.random() * 999999) + 1; // to give a random ID to each widget
  const eventType = "ws.visualization";
  const { Subscribe, emit, unsubscribe } = useWebSocketContext();
  const [queryOutput, setQueryOutput] = useState<string>("");

  const today = moment();
  const financialYearStartMonth = 3;
  let financialYearStart;
  let financialYearEnd;
  if (today.month() < financialYearStartMonth) {
    financialYearStart = moment()
      .subtract(1, "year")
      .month(financialYearStartMonth)
      .startOf("month")
      .hour(15)
      .minute(30)
      .second(0)
      .millisecond(0);
    financialYearEnd = today.hour(15).minute(30).second(0).millisecond(0);
  } else {
    financialYearStart = moment()
      .month(financialYearStartMonth)
      .startOf("month")
      .hour(15)
      .minute(30)
      .second(0)
      .millisecond(0);
    financialYearEnd = today.hour(15).minute(30).second(0).millisecond(0);
  }
  const predefinedRanges: any = [
    {
      label: "Last day",

      value: [
        new Date(moment().subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 7 days",

      value: [
        new Date(moment().subtract(7, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 15 days",

      value: [
        new Date(moment().subtract(15, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 30 days",

      value: [
        new Date(moment().subtract(30, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 90 days",

      value: [
        new Date(moment().subtract(90, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },
    {
      label: "Last 120 days",

      value: [
        new Date(moment().subtract(120, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },
    {
      label: "Last 180 days",

      value: [
        new Date(moment().subtract(180, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },
    {
      label: "Current FY",
      value: [
        new Date(financialYearStart.format("YYYY-MM-DDTHH:mm:ss")),
        new Date(financialYearEnd.format("YYYY-MM-DDTHH:mm:ss")),
      ],
      placement: "left",
    },
  ];
  const { afterToday }: any = DateRangePicker;

  const isBrowser = typeof window !== "undefined";

  // State to store the color theme
  const [colorTheme, setColorTheme] = useState<any>(
    isBrowser ? localStorage.getItem("color-theme") : null
  );
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage change detected");
      const newColorTheme = localStorage.getItem("color-theme");
      console.log("New color theme:", newColorTheme);
      setColorTheme(newColorTheme);
    };
    handleStorageChange();
  }, [themeSwitch]);

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
    const getMapper = async () => {
      let response = await getIndicatorMapperMetric();
      const modified: any = replacePeriodsWithUnderscoresArrayOfObjects(
        response.result
      );
      setIndicatorsArray(modified.map((item: any) => item.indicator));
      setMappersData(modified);
    };
    getMapper();
  }, []);

  const groupValues = allGroups.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
  const deviceValues = allDevices.map((item: any) => ({
    label: item.hostname,
    value: item._id,
  }));

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    // if (name == "limit") {
    //   let limit_value = Number(value);
    //   setData({ ...data, [name]: limit_value });
    // } else {
    setData({ ...data, [name]: value });
    // }
  };

  // const handleGranTimeChange = (value: any) => {
  //   // const { value } = event.target;
  //   setData({ ...data, granuality: value });
  // };

  const handleIndiGroupChange = (value: any) => {
    // const { value } = event.target;
    setData({ ...data, indicator_group: value });
  };

  const handleButtonClick = (value: any) => {
    setSelection(value);
    setActiveButton(value);
    setData({
      ...data,
      filters: {
        ...data.filters,
        device_filter: {
          ...data.filters.device_filter,
          entity_type: value,
        },
      },
    });
  };
  const handleresultByButtonClick = (value: any) => {
    // setSelection(value);
    setResultByActiveButton(value);
    setData({ ...data, result_by: value });
  };

  const handleAddDropdown = () => {
    setDropdowns([
      ...dropdowns,
      { indicator: "", aggregation: "", indicator_type: "" },
    ]);
  };

  const handleRemoveDropdown = (index: any) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns.splice(index, 1);
    setDropdowns(updatedDropdowns);
  };

  const IndicatorType = (value: any) => {
    const matchingObject = mapperdData.find(
      (item: any) => item.indicator === value
    );
    if (matchingObject) {
      const { indicator_type } = matchingObject;
      console.log("indicator type in order bgy", indicator_type);
      setData({
        ...data,
        order_by: {
          ...data.order_by,
          indicator_type: indicator_type,
        },
      });
    }
  };

  const handleOrderByChange = (value: any) => {
    console.log("orderby value", value);
    let tempindicator = value;
    const matchingObject = mapperdData.find(
      (item: any) => item.indicator === value
    );
    if (matchingObject) {
      const { indicator_type } = matchingObject;
      setData({
        ...data,
        order_by: {
          ...data.order_by,
          indicator: tempindicator,
          indicator_type: indicator_type,
        },
      });
    }

    // IndicatorType(value);
  };
  const handleEntities = (values: any) => {
    console.log("entities", values);
    setData({
      ...data,
      filters: {
        ...data.filters,
        device_filter: {
          ...data.filters.device_filter,
          entities: values,
        },
      },
    });
  };

  React.useEffect(() => {
    setData({ ...data, indicators: dropdowns });
  }, [dropdowns]);

  const handleDropdownChange = (index: any, field: any, value: any) => {
    console.log("in function", index, field, value);
    const updatedDropdowns: any = [...dropdowns];
    let filtered: any = [];
    let matchingIndicators: any = [];
    const matchingObject = mapperdData.find(
      (item: any) => item.indicator === value
    );
    if (matchingObject) {
      const { indicator_type } = matchingObject;

      setIndicatorType(indicator_type);
      updatedDropdowns[index]["indicator_type"] = indicator_type;
    }

    if (field == "aggregation") {
      let tempindicator = dropdowns[index].indicator;

      const matchingObject = mapperdData.find(
        (item: any) => item.indicator === tempindicator
      );
    }
    updatedDropdowns[index][field] = value;
    const indicatorValues = updatedDropdowns.map(
      (dropdown: any) => dropdown.indicator
    );
    setIndicatorValues(indicatorValues);
    if (index == 0 && field == "indicator") {
      // Check if a matching object is found
      if (matchingObject) {
        const { object_type, plugin_type, datasource } = matchingObject;
        console.log("group array", groupByArray);
        if (!groupByArray.some((item: any) => item.value === object_type)) {
          setGroupByArray((prevGroupByArray: any) => {
            const newArray = [...prevGroupByArray];
            newArray[1] = { name: object_type, id: object_type };
            return newArray;
          });
        }

        setData({
          ...data,
          datasource: datasource,
          // plugin_type: plugin_type,
          // object_type: object_type,
        });

        filtered = mapperdData.filter(
          (item: any) =>
            item.object_type === object_type && item.plugin_type === plugin_type
        );

        matchingIndicators = filtered.map((item: any) => item.indicator);

        const filteredArray = matchingIndicators.filter(
          (value: any) => !indicatorValues.includes(value)
        );
        console.log("matching indi", filteredArray);
        setFilteredData(matchingIndicators);
      }
    }
    // updatedDropdowns[index][field] = value;
    setDropdowns(updatedDropdowns);
  };

  const handleDate = (event: any) => {
    // console.log("date event", event);
    let updatedPayload: any = { ...data };

    if (event.label !== "custom") {
      delete updatedPayload.start_timestamp;
      delete updatedPayload.end_timestamp;
      updatedPayload = {
        ...updatedPayload,
        time_range: event.text,
      };
    } else {
      const startdate = new Date(event.value[0]);
      const startepochTime = startdate.getTime() / 1000;
      const enddate = new Date(event.value[1]);
      const endepochTime = enddate.getTime() / 1000;
      updatedPayload = {
        ...updatedPayload,
        time_range: event.text,
        start_timestamp: startepochTime,
        end_timestamp: endepochTime,
      };
    }
    // console.log("updated payload", updatedPayload);
    setData(updatedPayload);
  };

  useEffect(() => {
    console.log("time", timePeriod);
    setData({
      ...data,
      start_timestamp: timePeriod.start_timestamp,
      end_timestamp: timePeriod.end_timestamp,
    });
  }, [timePeriod]);
  const handleTypeChange = (value: any) => {
    // const { value } = event.target;
    console.log(value);
    setData({ ...data, group_by: value });
  };

  const handleOrderDirection = (value: any) => {
    setData({
      ...data,
      order_by: {
        ...data.order_by,
        direction: value,
      },
    });
  };

  function getWidgetData(data: any) {
    // if (pageID == data.pageID) {
    console.log("widget data", data, pageID);
    setQueryOutput(data);
    // }
  }

  useEffect(() => {
    Subscribe("ChartReport-" + pageID, eventType, getWidgetData);
    return () => {
      unsubscribe("ChartReport-" + pageID, eventType);
    };
  }, []);

  const handleExecute = () => {
    const randomId = uuidv4();
    const modified = replaceUnderscoresWithDots(data);
    modified["event.type"] = "ws.visualization";
    modified["query.id"] = randomId;
    modified.userName = "admin";
    modified["pageID"] = pageID;

    emit(eventType, modified);
  };

  const handleSave = () => {
    // console.log("chart data", data);
    try {
      const addWidget = async () => {
        data.limit = parseInt(data.limit);
        const modifiedData = replaceUnderscoresWithDots(data);
        console.log("topn widget data", modifiedData);
        // const ent  ities = Object.values(modifiedData.entities);
        // modifiedData.entities = entities;

        // const indicators = Object.values(modifiedData.indicators);
        // modifiedData.indicators = indicators;
        // modifiedData["query.id"] = 124453455;
        // modifiedData.userName = "admin";

        // // console.log("chart data", modifiedData);
        let response = await addChartWidget(modifiedData);
        if (response.status === "success") {
          toast.success(response.status, {
            position: "bottom-right",
            autoClose: 1000,
          });
          handleAddDrawerClose();
        } else {
          toast.error(response.message, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
        toggleWidgetApiState();
      };
      addWidget();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full px-2 dark:bg-dark-menu-color">
      <div className="flex">
        <CustomeInput
          label="Name"
          name="name"
          value={data.name}
          onChange={handleInputChange}
          type="text"
          require={true}
        />
        <CustomeInput
          label="Description"
          name="description"
          value={data.description}
          onChange={handleInputChange}
          type="text"
          require={true}
        />
        <CustomeInput
          label="Limit"
          name="limit"
          value={data.limit}
          onChange={handleInputChange}
          type="number"
          require={true}
        />
        {/* <SecSingleSelect
          label="Granuality"
          value={data.granuality}
          selectData={granuality_time}
          onChange={handleGranTimeChange}
          require={true}
        /> */}
        <div className="h-max mt-[1.20rem] w-[18rem] mx-3">
          <TimeRangePicker onTimeRangeChange={handleDate} />
        </div>
        <div>
          <SecSingleSelect
            label="Indicator Group"
            value={data.indicator_group}
            selectData={options}
            onChange={handleIndiGroupChange}
            require={true}
          />
        </div>
      </div>
      <div className="h-full flex justify-around">
        <div className="w-[58%] flex items-center">
          {queryOutput ? (
            <div className="w-full mt-12 border-[2px] p-8 dark:text-textColor">
              <PieChartComponent data={queryOutput} />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <p className="dark:text-textColor">Widget Preview</p>
            </div>
          )}
        </div>
        <div className="w-[42%] ml-3">
          <div>
            {dropdowns.map((dropdown, index) => (
              <div key={index}>
                <div className="flex">
                  <SecSingleSelect
                    label="Select Indicator"
                    value={dropdown.indicator}
                    selectData={index == 0 ? indicatorsArray : filteredData}
                    // onChange={(e: any) =>
                    //   handleDropdownChange(index, "indicator", e.target.value)
                    // }
                    onChange={handleDropdownChange}
                    index={index}
                    type="indicator"
                  />
                  {dropdown.indicator_type == "METRIC" ||
                  dropdown.indicator_type == "Metric" ||
                  dropdown.indicator_type == "metric" ? (
                    <SecSingleSelect
                      label="Select Aggregation"
                      value={dropdown.aggregation}
                      selectData={["MIN", "MAX", "SUM", "AVG", "LAST"]}
                      onChange={handleDropdownChange}
                      index={index}
                      type="aggregation"
                    />
                  ) : (
                    <SecSingleSelect
                      label="Select Aggregation"
                      value={dropdown.aggregation}
                      selectData={["LAST"]}
                      onChange={handleDropdownChange}
                      index={index}
                      type="aggregation"
                    />
                  )}
                  <div
                    className="text-primary2 flex items-center"
                    onClick={handleAddDropdown}
                  >
                    <ControlPointIcon />
                  </div>
                  {dropdowns.length > 1 && (
                    <div
                      className="text-primary2 flex items-center ml-[3px]"
                      onClick={() => handleRemoveDropdown(index)}
                    >
                      <RemoveCircleOutlineIcon />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col ml-4">
            {/* <InputLabel className="dark:text-textColor">Filters</InputLabel> */}
            <div className="flex">
              <ButtonGroup className="mr-5 my-4">
                <Button
                  className={`dark:text-textColor border-primary2 !px-[2.75rem] rounded-lg   ${
                    activeButton == "device" &&
                    "bg-primary2 hover:bg-primary2 text-white discButtonGroup"
                  }`}
                  onClick={() => handleButtonClick("device")}
                >
                  Device
                </Button>
                <Button
                  className={`dark:text-textColor border-primary2 !px-[2.75rem] rounded-lg   ${
                    activeButton == "group" &&
                    "bg-primary2 hover:bg-primary2 text-white discButtonGroup"
                  }`}
                  onClick={() => handleButtonClick("group")}
                >
                  Group
                </Button>
              </ButtonGroup>
              {selection == "device" ? (
                <SingleSelect
                  label="Select Devices"
                  // value={data.entities}
                  selectData={deviceValues}
                  // apiData={[""]}
                  onChange={handleEntities}
                  isMulti={true}
                />
              ) : (
                <SingleSelect
                  label="Select Groups"
                  selectData={groupValues}
                  apiData={[""]}
                  onChange={handleEntities}
                  isMulti={true}
                />
              )}
            </div>
          </div>
          <div className="flex">
            <SecSingleSelect
              label="Group By"
              value={data.group_by}
              selectData={groupByArray}
              onChange={handleTypeChange}
              require={true}
            />
          </div>
          <div className="flex">
            <SecSingleSelect
              label="Order By"
              value={data.order_by.indicator}
              selectData={indicatorValues}
              onChange={handleOrderByChange}
              require={true}
            />
            <SecSingleSelect
              label="Order Direction"
              value={data.order_by.direction}
              selectData={["Ascending", "Descending"]}
              onChange={handleOrderDirection}
              require={true}
            />
          </div>

          {/* <div className="flex flex-col justify-start  ml-4 py-3">
            <InputLabel className="dark:text-textColor mr-4">
              Result By :{" "}
            </InputLabel>
            <ButtonGroup className="mr-36 my-4">
              <Button
                className={`dark:text-textColor border-primary2 py-[.65rem] px-[1.38rem] rounded-lg ${
                  resultByactiveButton == "device" &&
                  "bg-primary2 hover:bg-primary2 text-white"
                }`}
                onClick={() => handleresultByButtonClick("device")}
              >
                Device
              </Button>
              <Button
                className={`dark:text-textColor border-primary2 py-[.65rem] px-[1.38rem] rounded-lg ${
                  resultByactiveButton == "group" &&
                  "bg-primary2 hover:bg-primary2 text-white"
                }`}
                onClick={() => handleresultByButtonClick("group")}
              >
                Group
              </Button>
              <Button
                className={`dark:text-textColor border-primary2 py-[.65rem] px-[1.38rem] rounded-lg ${
                  resultByactiveButton == "sites" &&
                  "bg-primary2 hover:bg-primary2 text-white"
                }`}
                onClick={() => handleresultByButtonClick("sites")}
              >
                Sites
              </Button>
            </ButtonGroup>
          </div>
          <div className="mx-4">
            <p className="dark:text-textColor pb-8">Pre Filters :</p>
            <p className="dark:text-textColor pb-8">Post Filters :</p>
          </div> */}
          <div className="w-[42%] flex justify-end absolute bottom-0 my-2 z-auto">
            <div onClick={handleExecute}>
              <CustomeButton title="Execute" />
            </div>
            <div onClick={handleSave}>
              <CustomeButton title="Create" />
            </div>
            <div onClick={handleAddDrawerClose}>
              <CustomeCancelButton title="Cancel" />
            </div>
            <CustomeCancelButton title="Reset" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOPNWidget;
