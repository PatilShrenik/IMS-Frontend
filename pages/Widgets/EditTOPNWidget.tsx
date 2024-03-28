import React, { useState, useEffect } from "react";
import {
  replacePeriodsWithUnderscoresArrayOfObjects,
  replaceUnderscoresWithDots,
} from "@/functions/genericFunctions";
import { Button, ButtonGroup, InputLabel, Zoom } from "@mui/material";
import CustomeButton, { CustomeCancelButton } from "../Components/Buttons";
import CustomeInput, { CustomeTextArea } from "../Components/Inputs";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SingleSelect from "../Components/Selects";
import { getAllDevice } from "../api/api/DeviceManagementAPI";
import { getAllGropus } from "../api/api/GroupsAPI";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider, DateRangePicker, Tooltip } from "rsuite";
import {
  getIndicatorMapper,
  getIndicatorMapperMetric,
} from "../api/api/MiscAPI";
import { v4 as uuidv4 } from "uuid";
import SecSingleSelect from "../Components/Selects/secSelect";
import { useAppContext } from "../Components/AppContext";
import moment from "moment";
import TimeRangePicker from "../Components/TimeRnangePicker";
import { updateWidget } from "../api/api/ReportsAPI";
import { Bounce, toast } from "react-toastify";
import { useWebSocketContext } from "../Components/WebSocketContext";
import PieChartComponent from "../Components/Charts/PieChart";

const EditTopnWidget = (props: any) => {
  const { widgetData, handleAddDrawerClose } = props;
  const { toggleWidgetApiState, themeSwitch } = useAppContext();
  const pageID: any = Math.floor(Math.random() * 999999) + 1; // to give a random ID to each widget
  const eventType = "ws.visualization";
  const { Subscribe, emit, unsubscribe } = useWebSocketContext();
  const [queryOutput, setQueryOutput] = useState<string>("");
  const options = ["Metric"];

  const [timePeriod, setTimePeriod] = useState({
    start_timestamp: null,
    end_timestamp: null,
  }) as any;
  const [dropdowns, setDropdowns] = useState([
    { indicator: "", aggregation: "", indicator_type: "" },
  ]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [allDevices, setAllDevices] = React.useState([]);
  const [selection, setSelection] = React.useState(
    widgetData &&
      widgetData.filters &&
      widgetData.filters.device_filter &&
      widgetData.filters.device_filter.entity_type
  );
  const [activeButton, setActiveButton] = React.useState<string | null>(
    widgetData &&
      widgetData.filters &&
      widgetData.filters.device_filter &&
      widgetData.filters.device_filter.entity_type
  );
  const [groupByArray, setGroupByArray] = React.useState([
    { name: "device", id: "device" },
  ]);
  const [mapperdData, setMappersData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [indicatorValues, setIndicatorValues] = React.useState([]) as any;
  const [indicatorType, setIndicatorType] = React.useState("");
  const [indicatorsArray, setIndicatorsArray] = React.useState([]);
  const [selectedGroups, setSelectedGroups] = React.useState([]) as any;
  const [formattedData, setFormattedData] = useState([]) as any;
  const [selectedDevices, setSelectedDevices] = React.useState([]) as any;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [data, setData] = React.useState<any>(widgetData);
  const today = moment();
  const financialYearStartMonth = 3;

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

  useEffect(() => {
    setActiveButton(
      data &&
        data.filters &&
        data.filters.device_filter &&
        data.filters.device_filter.entity_type
    );
    setSelection(
      data &&
        data.filters &&
        data.filters.device_filter &&
        data.filters.device_filter.entity_type
    );
    setDropdowns(data && data.indicators);
    // setGroupByArray([{ name: data.group_by, id: data.group_by }]);
  }, [widgetData]);

  // useEffect(() => {
  //   const formatTimestamp = (timestamp: any) => {
  //     const milliseconds = timestamp * 1000;
  //     const date = new Date(milliseconds);
  //     return date.toString(); // Adjust the format as needed
  //   };

  //   console.log("---", data.start_timestamp)
  //   const formattedStart: any = formatTimestamp(data.start_timestamp);
  //   const formattedEnd: any = formatTimestamp(data.end_timestamp);
  //   console.log("---", formattedEnd, formattedStart)
  //   setFormattedData([formattedStart, formattedEnd]);
  // }, [data]);

  useEffect(() => {
    if (
      data &&
      data.filters &&
      data.filters.device_filter &&
      data.filters.device_filter.entity_type == "device"
    ) {
      setSelectedDevices(
        data &&
          data.filters &&
          data.filters.device_filter &&
          data.filters.device_filter.entities
      );
    } else {
      setSelectedGroups(
        data &&
          data.filters &&
          data.filters.device_filter &&
          data.filters.device_filter.entities
      );
    }
  }, [data]);

  const groupValues = allGroups.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
  const deviceValues = allDevices.map((item: any) => ({
    label: item.hostname,
    value: item._id,
  }));

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    // if (name == "limit") {
    //   let limit_value = Number(value);
    //   setData({ ...data, [name]: limit_value });
    // } else {
    setData({ ...data, [name]: value });
    // }
  };

  //   const handleGranTimeChange = (value: any) => {
  //     // const { value } = event.target;
  //     setData({ ...data, granularity: value });
  //   };

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
    let filtered: any = [];
    let matchingIndicators: any = [];
    const updatedDropdowns: any = [...dropdowns];
    const matchingObject = mapperdData.find(
      (item: any) => item.indicator === updatedDropdowns[0].indicator
    );
    if (matchingObject) {
      const { object_type, plugin_type, datasource } = matchingObject;

      if (!groupByArray.some((item: any) => item.value === object_type)) {
        setGroupByArray((prevGroupByArray: any) => {
          const newArray = [...prevGroupByArray];
          newArray[1] = { name: object_type, id: object_type };
          return newArray;
        });
      }

      const indicatorValues = updatedDropdowns.map(
        (dropdown: any) => dropdown.indicator
      );
      setIndicatorValues(indicatorValues);
      filtered = mapperdData.filter(
        (item: any) =>
          item.object_type === object_type && item.plugin_type === plugin_type
      );

      matchingIndicators = filtered.map((item: any) => item.indicator);

      const filteredArray = matchingIndicators.filter(
        (value: any) => !indicatorValues.includes(value)
      );
      console.log("matching indi", matchingIndicators);
      setFilteredData(matchingIndicators);
    }
    setData({ ...data, indicators: dropdowns });
  }, [mapperdData, dropdowns]);

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
    console.log("date event", event);
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
    // console.log("time", timePeriod);
    setData({
      ...data,
      start_timestamp: timePeriod.start_timestamp,
      end_timestamp: timePeriod.end_timestamp,
    });
  }, [timePeriod]);

  const handleTypeChange = (value: any) => {
    // const { value } = event.target;
    console.log("------------", value);
    console.log(value);
    setData({ ...data, group_by: value });
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

  const handleOrderDirection = (value: any) => {
    setData({
      ...data,
      order_by: {
        ...data.order_by,
        direction: value,
      },
    });
  };

  const handleExecute = () => {
    const randomId = uuidv4();
    const modified = replaceUnderscoresWithDots(data);
    modified["event.type"] = "ws.visualization";
    modified["query.id"] = randomId;
    modified.userName = "admin";
    modified["pageID"] = pageID;
    console.log("chart widget called");
    emit(eventType, modified);
  };

  const handleSave = () => {
    try {
      const addWidget = async () => {
        const modifiedData = replaceUnderscoresWithDots(data);
        console.log("chart widget data", modifiedData);
        let response = await updateWidget(modifiedData, widgetData._id);
        if (response.status === "success") {
          toast.success(response.status, {
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
          handleAddDrawerClose();
        } else {
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
          value={data && data.name}
          onChange={handleInputChange}
          type="text"
          require={true}
        />
        <CustomeInput
          label="Description"
          name="description"
          value={data && data.description}
          onChange={handleInputChange}
          type="text"
          require={true}
          // rows={1}
        />
        <CustomeInput
          label="Limit"
          name="limit"
          value={data && data.limit}
          onChange={handleInputChange}
          type="number"
          require={true}
          // rows={1}
        />
        {/* <SecSingleSelect
          label="Granuality"
          value={data.granularity}
          selectData={granuality_time}
          onChange={handleGranTimeChange}
          require={true}
        /> */}
        <div className="h-max mt-[1.20rem] w-[18rem] mx-3">
          <TimeRangePicker
            onTimeRangeChange={handleDate}
            // text={data.time_range}
            // formatedTime = {formattedData}
          />
        </div>
        <div>
          <SecSingleSelect
            label="Indicator Group"
            value={data && data.indicator_group}
            selectData={options}
            onChange={handleIndiGroupChange}
            require={true}
          />
        </div>
      </div>
      <div className="h-full flex justify-around">
        <div className="w-[58%] flex items-center">
          {queryOutput ? (
            <div className="w-full mt-12 p-8 dark:text-textColor">
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
            {dropdowns &&
              dropdowns.map((dropdown, index) => (
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
                        selectData={["MIN", "MAX", "SUM", "AVG"]}
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
                    {dropdowns && dropdowns.length > 1 && (
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
                  value={
                    deviceValues &&
                    deviceValues.filter(
                      (option: any) =>
                        selectedDevices &&
                        selectedDevices.includes(option.value)
                    )
                  }
                  selectData={deviceValues}
                  // apiData={[""]}
                  onChange={handleEntities}
                  isMulti={true}
                />
              ) : (
                <SingleSelect
                  label="Select Groups"
                  value={
                    groupValues &&
                    groupValues.filter(
                      (option: any) =>
                        selectedGroups && selectedGroups.includes(option.value)
                    )
                  }
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
              value={data && data.group_by}
              selectData={groupByArray}
              onChange={handleTypeChange}
              require={true}
            />
          </div>
          <div className="flex">
            <SecSingleSelect
              label="Order By"
              value={data && data.order_by.indicator}
              selectData={indicatorValues}
              onChange={handleOrderByChange}
              require={true}
            />
            <SecSingleSelect
              label="Order Direction"
              value={data && data.order_by.direction}
              selectData={["Ascending", "Descending"]}
              onChange={handleOrderDirection}
              require={true}
            />
          </div>
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
            <div
              onClick={() => {
                setData([]);
              }}
            >
              <CustomeCancelButton title="Reset" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTopnWidget;
