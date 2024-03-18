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
import "rsuite/dist/rsuite.min.css";
import { CustomProvider, DateRangePicker, Tooltip } from "rsuite";
import { getIndicatorMapper } from "../api/api/MiscAPI";
import SecSingleSelect from "../Components/Selects/secSelect";
import { useAppContext } from "../Components/AppContext";
import moment from "moment";
import { addChartWidget } from "../api/api/ReportsAPI";
import { toast } from "react-toastify";

const GridWidget = (props: any) => {
  const { handleAddDrawerClose } = props;
  const { toggleWidgetApiState, themeSwitch } = useAppContext();
  const granuality_time = [
    {
      name: "All",
      id: "all",
    },
    {
      name: "None",
      id: "none",
    },
    {
      name: "Second",
      id: "second",
    },
    {
      name: "Minute",
      id: "minute",
    },
    {
      name: "Five Minute",
      id: "five_minute",
    },
    {
      name: "Tem Minute",
      id: "ten_minute",
    },
    {
      name: "Fifteen Minute",
      id: "fifteen_minute",
    },
    {
      name: "Thirty Minute",
      id: "thirty_minute",
    },
    {
      name: "Hour",
      id: "hour",
    },
    {
      name: "Six Hour",
      id: "six_hour",
    },
    {
      name: "Eight Hour",
      id: "eight_hour",
    },
    {
      name: "Day",
      id: "day",
    },
    {
      name: "Week",
      id: "week",
    },
    {
      name: "Month",
      id: "month",
    },
    {
      name: "Quarter",
      id: "quarter",
    },
    {
      name: "Year",
      id: "year",
    },
  ];
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
  const [selection, setSelection] = React.useState("device");
  const [activeButton, setActiveButton] = React.useState<string | null>(
    "device"
  );
  const [resultByactiveButton, setResultByActiveButton] = React.useState<
    string | null
  >("device");
  const [groupByArray, setGroupByArray] = React.useState(
    [] as { label: string; value: string }[]
  );
  const [mapperdData, setMappersData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [indicatorType, setIndicatorType] = React.useState("");
  const [indicatorsArray, setIndicatorsArray] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [data, setData] = React.useState<any>({
    name: "",
    description: "",
    widget_type: "grid",
    datasource: "",
    indicator_group: "",
    indicators: [{ aggregation: "", indicator: "", indicator_type: "" }],
    group_by: "",
    time_range: "custome",
    start_timestamp: "",
    end_timestamp: "",
    filters: {
      device_filters: {
        entity_type: activeButton,
        entities: [],
      },
    },
  });
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
      let response = await getIndicatorMapper();
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
        device_filters: {
          ...data.filters.device_filters,
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

  const handleEntities = (values: any) => {
    console.log("entities", values);
    setData({
      ...data,
      filters: {
        ...data.filters,
        device_filters: {
          ...data.filters.device_filters,
          entities: values,
        },
      },
    });
  };

  React.useEffect(() => {
    setData({ ...data, indicators: dropdowns });
  }, [dropdowns]);

  const handleDropdownChange = (index: any, field: any, value: any) => {
    console.log(index, field, value);
    const updatedDropdowns: any = [...dropdowns];
    let filtered: any = [];
    let matchingIndicators: any = [];
    const matchingObject = mapperdData.find(
      (item: any) => item.indicator === value
    );

    if (field == "aggregation") {
      let tempindicator = dropdowns[index].indicator;

      const matchingObject = mapperdData.find(
        (item: any) => item.indicator === tempindicator
      );
      if (matchingObject) {
        const { indicator_type } = matchingObject;

        setIndicatorType(indicator_type);
        updatedDropdowns[index]["indicator_type"] = indicator_type;
      }
    }
    updatedDropdowns[index][field] = value;
    const indicatorValues = updatedDropdowns.map(
      (dropdown: any) => dropdown.indicator
    );
    // setIndicatorValues(indicatorValues);
    if (index == 0 && field == "indicator") {
      // Check if a matching object is found
      if (matchingObject) {
        const { object_type, plugin_type, datasource } = matchingObject;

        if (!groupByArray.some((item) => item.value === object_type)) {
          setGroupByArray((prevGroupByArray: any) => {
            const newArray = [...prevGroupByArray];
            newArray[1] = { name: object_type, id: object_type };
            return newArray;
          });
        }

        setData({
          ...data,
          datasource: datasource,
          //   plugin_type: plugin_type,
          //   object_type: object_type,
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
        setFilteredData(filteredArray);
      }
    }
    // updatedDropdowns[index][field] = value;
    setDropdowns(updatedDropdowns);
  };

  const handleDateRangeChange = (value: any) => {
    console.log("Selected Date Range:", value);
    const start = value[0].getTime() / 1000;
    const end = value[1].getTime() / 1000;
    console.log(start, end);
    setTimePeriod({
      ...timePeriod,
      start_timestamp: start,
      end_timestamp: end,
    });
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

  const handleSave = () => {
    // console.log("chart data", data);
    try {
      const addWidget = async () => {
        const modifiedData = replaceUnderscoresWithDots(data);
        console.log("chart widget data", modifiedData);
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
          // rows={1}
        />
        {/* <SecSingleSelect
          label="Granuality"
          value={data.granuality}
          selectData={granuality_time}
          onChange={handleGranTimeChange}
          require={true}
        /> */}
        <CustomProvider theme="dark">
          <DateRangePicker
            placement="bottomStart"
            value={timePeriod}
            onChange={handleDateRangeChange}
            appearance="subtle"
            ranges={predefinedRanges}
            // showOneCalendar
            style={{
              margin: "1rem 1rem",
              width: "18rem",
              height: "max-content",
              border:
                colorTheme == "light"
                  ? "1px solid #e5e7eb"
                  : "1px solid #3C3C3C",
              padding: ".4rem",
            }}
            // shouldDisableDate={afterToday()}
            placeholder="Select Date Range"
            format="yyyy-MM-dd"
            className="rounded-lg border-dark-border dark:hover:bg-transparent dark:text-textColor dark:bg-dark-menu-color z-50"
          />
        </CustomProvider>
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
        <div className="w-[58%] flex justify-center items-center">
          <p className="dark:text-textColor">Chart Will be Displayed here</p>
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
                  {indicatorType == "METRIC" ||
                  indicatorType == "Metric" ||
                  indicatorType == "metric" ? (
                    <SecSingleSelect
                      label="Select Aggregation"
                      value={dropdown.aggregation}
                      selectData={["MIN", "MAX", "SUM", "AVG", "LAST"]}
                      // onChange={(e: any) =>
                      //   handleDropdownChange(
                      //     index,
                      //     "aggregation",
                      //     e.target.value
                      //   )
                      // }
                      onChange={handleDropdownChange}
                      index={index}
                      type="aggregation"
                    />
                  ) : (
                    <SecSingleSelect
                      label="Select Aggregation"
                      value={dropdown.aggregation}
                      selectData={["MIN", "MAX", "SUM", "AVG", "LAST"]}
                      onChange={handleDropdownChange}
                      index={index}
                      type="aggregation"
                      // onChange={(e: any) =>
                      //   handleDropdownChange(
                      //     index,
                      //     "aggregation",
                      //     e.target.value
                      //   )
                      // }
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
            {/* <SingleSelect
              label="Sites"
              value={data.group_by}
              selectData={[
                { label: "Pune", value: "Pune" },
                { label: "Mumbai", value: "Mumbai" },
                { label: "Banglore", value: "Banglore" },
                { label: "Chennai", value: "Chennai" },
                { label: "Hyderabad", value: "Hyderabad" },
              ]}
              onChange={handleTypeChange}
            /> */}
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
            {/* <CustomeButton title="Create & Add" /> */}
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

export default GridWidget;
