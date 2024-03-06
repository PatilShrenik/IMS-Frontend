import React, { useState, useEffect } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CustomeInput, { CustomeTextArea } from "../Components/Inputs";
import SingleSelect from "../Components/Selects";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
} from "@mui/material";
import { getIndicatorMapper } from "../api/api/MiscAPI";
import { replacePeriodsWithUnderscoresArrayOfObjects } from "@/functions/genericFunctions";
import { getAllGropus } from "../api/api/GroupsAPI";
import { getAllDevice } from "../api/api/DeviceManagementAPI";
import CustomeButton, { CustomeCancelButton } from "../Components/Buttons";
const granuality_time = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "None",
    value: "none",
  },
  {
    name: "Second",
    value: "second",
  },
  {
    name: "Minute",
    value: "minute",
  },
  {
    name: "Five Minute",
    value: "five_minute",
  },
  {
    name: "Tem Minute",
    value: "ten_minute",
  },
  {
    name: "Fifteen Minute",
    value: "fifteen_minute",
  },
  {
    name: "Thirty Minute",
    value: "thirty_minute",
  },
  {
    name: "Hour",
    value: "hour",
  },
  {
    name: "Six Hour",
    value: "six_hour",
  },
  {
    name: "Eight Hour",
    value: "eight_hour",
  },
  {
    name: "Day",
    value: "day",
  },
  {
    name: "Week",
    value: "week",
  },
  {
    name: "Month",
    value: "month",
  },
  {
    name: "Quarter",
    value: "quarter",
  },
  {
    name: "Year",
    value: "year",
  },
];

const ChartWidget = () => {
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
    limit: "",
    time_range: "",
    // entity_type: activeButton,
    entities: [],
  });
  const [dropdowns, setDropdowns] = useState([
    { indicator: "", aggregation: "" },
  ]);
  const [allGroups, setAllGroups] = React.useState([]);
  const [allDevices, setAllDevices] = React.useState([]);
  const [selection, setSelection] = React.useState("device");
  const [activeButton, setActiveButton] = React.useState<string | null>(
    "device"
  );
  const [groupByArray, setGroupByArray] = React.useState(["device"]);
  const [mapperdData, setMappersData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [indicatorType, setIndicatorType] = React.useState("");
  const [indicatorsArray, setIndicatorsArray] = React.useState([]);

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
    name: item.name,
    id: item._id,
  }));
  const deviceValues = allDevices.map((item: any) => ({
    name: item.hostname,
    id: item._id,
  }));

  const handleButtonClick = (value: any) => {
    setSelection(value);
    setActiveButton(value);
    setData({ ...data, entity_type: value });
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
    setData({ ...data, entities: values });
  };

  const handleDropdownChange = (index: any, field: any, value: any) => {
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
      if (matchingObject) {
        const { object_type, plugin_type, datasource } = matchingObject;

        if (!groupByArray.includes(object_type)) {
          setGroupByArray((prevGroupByArray) => {
            const newArray = [...prevGroupByArray];
            newArray[1] = object_type;
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

  const handleTypeChange = (event: any) => {
    const { value } = event.target;
    setData({ ...data, group_by: value });
  };

  return (
    <div className="h-full px-2">
      <div className="flex">
        <CustomeInput
          label="Name"
          name="hostname"
          //   value={data.hostname}
          //   onChange={handleInputChange}
          type="text"
          require={true}
        />
        <CustomeTextArea
          label="Description"
          name="hostname"
          //   value={data.hostname}
          //   onChange={handleInputChange}
          type="text"
          require={true}
          rows={1}
        />
        <SingleSelect
          label="Granuality"
          selectData={granuality_time}
          //   onChange={handleCredProfile}
          require={true}
        />
      </div>
      <div className="h-full flex justify-between">
        <div className="w-1/2 flex justify-center items-center">
          <p className="dark:text-textColor">Chart Will be Displayed here</p>
        </div>
        <div className="w-1/2">
          <div>
            {dropdowns.map((dropdown, index) => (
              <div key={index}>
                <div className="flex">
                  <SingleSelect
                    label="Select Indicator"
                    value={dropdown.indicator}
                    selectData={index == 0 ? indicatorsArray : filteredData}
                    onChange={(e: any) =>
                      handleDropdownChange(index, "indicator", e.target.value)
                    }
                  />
                  {indicatorType == "METRIC" ||
                  indicatorType == "Metric" ||
                  indicatorType == "metric" ? (
                    <SingleSelect
                      label="Select Aggregation"
                      value={dropdown.aggregation}
                      selectData={["MIN", "MAX", "SUM", "AVG", "LAST"]}
                      onChange={(e: any) =>
                        handleDropdownChange(
                          index,
                          "aggregation",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <SingleSelect
                      label="Select Aggregation"
                      value={dropdown.aggregation}
                      selectData={["MIN", "MAX", "SUM", "AVG", "LAST"]}
                      onChange={(e: any) =>
                        handleDropdownChange(
                          index,
                          "aggregation",
                          e.target.value
                        )
                      }
                    />
                    //   <FormControl
                    //     variant="standard"
                    //     sx={{ m: 1, minWidth: 120 }}
                    //   >
                    //     <InputLabel id="demo-simple-select-standard-label">
                    //       Select Aggregation
                    //     </InputLabel>
                    //     <Select
                    //       value={dropdown.aggregation}
                    //       onChange={(e: any) =>
                    //         handleDropdownChange(
                    //           index,
                    //           "aggregation",
                    //           e.target.value
                    //         )
                    //       }
                    //       label="Select Aggregation"
                    //     >
                    //       <MenuItem value="MIN" disabled>
                    //         MIN
                    //       </MenuItem>
                    //       <MenuItem value="MAX" disabled>
                    //         MAX
                    //       </MenuItem>
                    //       <MenuItem value="SUM" disabled>
                    //         SUM
                    //       </MenuItem>
                    //       <MenuItem value="AVG" disabled>
                    //         AVG
                    //       </MenuItem>
                    //       <MenuItem value="LAST">LAST</MenuItem>
                    //     </Select>
                    //   </FormControl>
                  )}
                  <Button onClick={handleAddDropdown}>
                    <ControlPointIcon />
                  </Button>
                  {dropdowns.length > 1 && (
                    <Button onClick={() => handleRemoveDropdown(index)}>
                      <RemoveCircleOutlineIcon />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <SingleSelect
              label="Group By"
              value={data.group_by}
              selectData={groupByArray}
              onChange={handleTypeChange}
            />
          </div>
          <div className="flex flex-col mt-4 ml-4">
            {/* <InputLabel className="dark:text-textColor">Filters</InputLabel> */}
            <div className="flex">
              <ButtonGroup className="mr-36 my-4">
                <Button
                  className="dark:text-textColor border-primary"
                  onClick={() => handleButtonClick("device")}
                  style={{
                    backgroundColor:
                      activeButton === "device" ? "#0F3464" : "inherit",
                    // color: activeButton === "device" ? "white" : "inherit",
                  }}
                >
                  Device
                </Button>
                <Button
                  className="dark:text-textColor border-primary"
                  onClick={() => handleButtonClick("group")}
                  style={{
                    backgroundColor:
                      activeButton === "group" ? "#0F3464" : "inherit",
                    // color: activeButton === "group" ? "white" : "inherit",
                  }}
                >
                  Group
                </Button>
              </ButtonGroup>
              {selection == "device" ? (
                <SingleSelect
                  label="Select Devices"
                  selectData={deviceValues}
                  apiData={[""]}
                  onChange={handleEntities}
                />
              ) : (
                <SingleSelect
                  label="Select Groups"
                  selectData={groupValues}
                  apiData={[""]}
                  onChange={handleEntities}
                />
              )}
            </div>
          </div>
          <div className="flex items-center ml-4 py-3">
            <InputLabel className="dark:text-textColor">
              Result By :{" "}
            </InputLabel>
            <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              className="mx-4"
            >
              <Button>Device</Button>
              <Button>Group</Button>
              <Button>Site</Button>
            </ButtonGroup>
          </div>
          <div className="flex mt-12">
            <CustomeButton title="Create & Add" />
            <CustomeButton title="Create" />
            <CustomeButton title="Add" />
            <CustomeCancelButton title="Reset" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartWidget;
