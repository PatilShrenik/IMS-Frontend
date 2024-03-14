import React, { useState, useEffect } from "react";
import {
  replacePeriodsWithUnderscoresArrayOfObjects,
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
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider, DateRangePicker, Tooltip } from "rsuite";
import { getIndicatorMapper } from "../api/api/MiscAPI";
import SecSingleSelect from "../Components/Selects/secSelect";
import { useAppContext } from "../Components/AppContext";
import moment from "moment";
import { addChartWidget } from "../api/api/ReportsAPI";
import { toast } from "react-toastify";

const ChartWidget = (props: any) => {
  const { handleAddDrawerClose } = props;
  const { time, toggleTime, timeEnd, toggleTimeEnd, themeSwitch } =
    useAppContext();
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
  const options = ["Availability", "Metric", "Flow", "Alert"];
  // const [timePeriod, setTimePeriod] = React.useState<any>([
  //   new Date(time),
  //   new Date(timeEnd),
  // ]);
  const [timePeriod, setTimePeriod] = useState({
    startDate: null,
    endDate: null,
  }) as any;
  const [dropdowns, setDropdowns] = useState([
    { indicator: "", aggregation: "" },
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
    widget_type: "chart",
    granularity: "",
    datasource: "",
    object_type: "",
    plugin_type: "",
    indicators: [{ aggregation: "", indicator: "", indicator_type: "" }],
    group_by: "",
    time_range: timePeriod,
    entity_type: activeButton,
    entities: [],
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

  const handleGranTimeChange = (value: any) => {
    // const { value } = event.target;
    setData({ ...data, granuality: value });
  };

  const handleButtonClick = (value: any) => {
    setSelection(value);
    setActiveButton(value);
    setData({ ...data, entity_type: value });
  };
  const handleresultByButtonClick = (value: any) => {
    // setSelection(value);
    setResultByActiveButton(value);
    setData({ ...data, result_by: value });
  };

  const handleAddDropdown = () => {
    setDropdowns([...dropdowns, { indicator: "", aggregation: "" }]);
  };

  const handleRemoveDropdown = (index: any) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns.splice(index, 1);
    setDropdowns(updatedDropdowns);
  };

  const handleEntities = (values: any) => {
    console.log("entities", values);
    setData({ ...data, entities: values });
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
        console.log("indi", indicator_type);
        setIndicatorType(indicator_type);
      }
    }
    updatedDropdowns[index][field] = value;
    const indicatorValues = updatedDropdowns.map(
      (dropdown: any) => dropdown.indicator
    );
    // setIndicatorValues(indicatorValues);
    if (index == 0 && field == "indicator") {
      // Check if a matching object is found
      console.log("in condition");
      if (matchingObject) {
        const { object_type, plugin_type, datasource } = matchingObject;

        if (!groupByArray.some((item) => item.value === object_type)) {
          setGroupByArray((prevGroupByArray: any) => {
            const newArray = [...prevGroupByArray];
            newArray[1] = { label: object_type, value: object_type };
            return newArray;
          });
        }

        setData({
          ...data,
          datasource: datasource,
          plugin_type: plugin_type,
          object_type: object_type,
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
    // Handle the change in the selected date range
    console.log("Selected Date Range:", value);
    setTimePeriod(value);
    // setData({ ...data, time_range: value });
    // You can do additional processing if needed
  };

  useEffect(() => {
    console.log("time", timePeriod);
    setData({ ...data, time_range: timePeriod });
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
        const modifiedData = replaceUnderscoresWithDotsNested(data);
        console.log("chart widget data", modifiedData);
        // const ent  ities = Object.values(modifiedData.entities);
        // modifiedData.entities = entities;

        // const indicators = Object.values(modifiedData.indicators);
        // modifiedData.indicators = indicators;
        // modifiedData["query.id"] = 124453455;
        // modifiedData.userName = "admin";

        // // console.log("chart data", modifiedData);
        // let response = await addChartWidget(modifiedData);
        // if (response.status === "success") {
        //   toast.success(response.status, {
        //     position: "bottom-right",
        //     autoClose: 1000,
        //   });
        //   // props.onClose();
        // } else {
        //   toast.error(response.message, {
        //     position: "bottom-right",
        //     autoClose: 2000,
        //   });
        // }
        // toggleWidgetApiState();
      };
      addWidget();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full px-2">
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
        <SecSingleSelect
          label="Granuality"
          selectData={granuality_time}
          onChange={handleGranTimeChange}
          require={true}
        />
        <CustomProvider theme="dark">
          <DateRangePicker
            placement="bottomStart"
            value={data.time_range}
            onChange={handleDateRangeChange}
            appearance="subtle"
            ranges={predefinedRanges}
            // showOneCalendar
            style={{
              margin: "1rem 1rem",
              width: "100%",
              height: "max-content",
              border:
                colorTheme == "light"
                  ? "1px solid #e5e7eb"
                  : "1px solid #3C3C3C",
              padding: ".4rem",
            }}
            shouldDisableDate={afterToday()}
            placeholder="Select Date Range"
            format="yyyy-MM-dd"
            className="rounded-lg border-dark-border dark:hover:bg-transparent dark:text-textColor dark:bg-dark-menu-color z-50"
          />
        </CustomProvider>
      </div>
      <div className="h-full flex justify-around">
        <div className="w-[58%] flex justify-center items-center">
          <p className="dark:text-textColor">Chart Will be Displayed here</p>
        </div>
        <div className="w-[42%]">
          <div className="flex justify-end px-4">
            <div>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: "17ch",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    className="bg-textColor dark:bg-tabel-header dark:text-textColor hover:dark:bg-tabel-header"
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
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
                  className={`dark:text-textColor border-primary2 px-[2.75rem] rounded-lg ${
                    activeButton == "device" &&
                    "bg-primary2 hover:bg-primary2 text-white"
                  }`}
                  onClick={() => handleButtonClick("device")}
                >
                  Device
                </Button>
                <Button
                  className={`dark:text-textColor border-primary2 px-[2.75rem] rounded-lg ${
                    activeButton == "group" &&
                    "bg-primary2 hover:bg-primary2 text-white"
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
            <SingleSelect
              label="Group By"
              value={data.group_by}
              selectData={groupByArray}
              onChange={handleTypeChange}
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
          <div className="w-[42%] flex justify-end absolute bottom-0 my-2">
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

export default ChartWidget;
// import React from "react";
// import CustomeInput, { CustomeTextArea } from "../Components/Inputs";
// import SingleSelect from "../Components/Selects";
// import SecSingleSelect from "../Components/Selects/secSelect";

// const ChartWidget = () => {
//   const granuality_time = [
//     {
//       name: "All",
//       id: "all",
//     },
//     {
//       name: "None",
//       id: "none",
//     },
//     {
//       name: "Second",
//       id: "second",
//     },
//     {
//       name: "Minute",
//       id: "minute",
//     },
//     {
//       name: "Five Minute",
//       id: "five_minute",
//     },
//     {
//       name: "Tem Minute",
//       id: "ten_minute",
//     },
//     {
//       name: "Fifteen Minute",
//       id: "fifteen_minute",
//     },
//     {
//       name: "Thirty Minute",
//       id: "thirty_minute",
//     },
//     {
//       name: "Hour",
//       id: "hour",
//     },
//     {
//       name: "Six Hour",
//       id: "six_hour",
//     },
//     {
//       name: "Eight Hour",
//       id: "eight_hour",
//     },
//     {
//       name: "Day",
//       id: "day",
//     },
//     {
//       name: "Week",
//       id: "week",
//     },
//     {
//       name: "Month",
//       id: "month",
//     },
//     {
//       name: "Quarter",
//       id: "quarter",
//     },
//     {
//       name: "Year",
//       id: "year",
//     },
//   ];
//   return (
//     <div className="absolute h-full px-2">
//       <div>
//         <div className="flex">
//           <CustomeInput
//             label="Name"
//             name="hostname"
//             //   value={data.hostname}
//             //   onChange={handleInputChange}
//             type="text"
//             require={true}
//           />
//           <CustomeTextArea
//             label="Description"
//             name="hostname"
//             //   value={data.hostname}
//             //   onChange={handleInputChange}
//             type="text"
//             require={true}
//             rows={1}
//           />
//           <SecSingleSelect
//             label="Granuality"
//             selectData={granuality_time}
//             onChange=""
//             require={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartWidget;
