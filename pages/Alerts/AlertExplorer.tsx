import { baseURL } from "@/constants";
import PageHeading from "@/pages/Components/PageHeading";
// import AlertExplorerTabel from "@/pages/Components/Tables/AlertExplorerTabel";
// import CustomeButtons from "@/pages/Components/UIComponents/Buttons";
// import { MultipleSelectChip } from "@/pages/Components/UIComponents/MultiSelect";
// import SingleSelectDropdown from "@/pages/Components/UIComponents/SingleSelectDropdown";
// import TimeRangePicker from "@/pages/Components/UIComponents/TimeRangePicker";
// import { useWebSocketContext } from "@/pages/Contexts/WebSocketContext";
// import { getAllDevice } from "@/pages/api/DeviceManagementAPI";
// import { getIndicatorMapper } from "@/pages/api/MiscAPI";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useWebSocketContext } from "../Components/WebSocketContext";
import { getAllDevice } from "../api/api/DeviceManagementAPI";
import { getIndicatorMapper } from "../api/api/MiscAPI";
// import EventBus from "vertx3-eventbus-client";
function replaceUnderscoresWithPeriods(obj: any) {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/([^.])(_|_)([^.])/, "$1.$3");
      result[newKey] = obj[key];
    }
  }

  return result;
}
function replaceUnderScoreWithPeriodsArrayOfObjects(arr: any[]) {
  const result: any[] = [];

  for (const obj of arr) {
    const newObj: any = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/_/g, "."); // Replace all periods with underscores
        newObj[newKey] = obj[key];
      }
    }

    result.push(newObj);
  }

  return result;
}

function replaceUnderscoresWithPeriodsnested(obj: any) {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // If the value is an object, recursively replace underscores in nested object
        result[key.replace(/_/g, ".")] = replaceUnderscoresWithPeriods(
          obj[key]
        );
      } else {
        // Replace underscore with period only if it's between non-period characters
        const newKey = key.replace(/([^.])(_)([^.])/, "$1.$3");
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

function replacePeriodsWithUnderscoresArrayOfObjects(arr: any[]) {
  const result: any[] = [];

  for (const obj of arr) {
    const newObj: any = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/\./g, "_"); // Replace all periods with underscores
        newObj[newKey] = obj[key];
      }
    }

    result.push(newObj);
  }

  return result;
}

const AlertExplorer = () => {
  // const newEventBus = new EventBus(baseURL + "/eventbus");
  // useEffect(() => {
  //   const init = () => {
  //     newEventBus.onopen = () => {
  //       console.log("SockJS connection opened:");
  //       newEventBus.registerHandler(
  //         "client.event",
  //         (error: any, message: any) => {
  //           console.log(message);
  //           // displayOutput(message.body);
  //         }
  //       );
  //     };

  //     newEventBus.onclose = () => {
  //       console.log("SockJS connection closed.");
  //       newEventBus.onopen = () => {
  //         console.log("SockJS connection opened:");
  //         newEventBus.registerHandler(
  //           "client.event",
  //           (error: any, message: any) => {
  //             console.log(message);
  //             // displayOutput(message.body);
  //           }
  //         );
  //       };
  //       // Perform any additional actions when the connection is closed if needed.
  //     };
  //   };

  //   init();
  // }, []);

  const [receivedData, setReceivedData] = React.useState<any>([]);
  const { Subscribe, emit, connection } = useWebSocketContext();

  function render(payload: any) {
    // console.log("live alert", payload.result);
    setReceivedData(payload.result);
  }

  useEffect(() => {
    if (connection) {
      Subscribe("history1", "ws.alert.explorer", render);
    }
    // emit("ws.alert.visualisation", {});
  }, [connection]);

  const [indicatorsArray, setIndicatorsArray] = React.useState([]);
  const [allDevices, setAllDevices] = React.useState([]);
  const [data, setData] = React.useState({
    time_range: "",
    filters: [
      {
        entity_type: "",
        entities: [],
      },
      {
        entity_type: "",
        entities: [],
      },
      {
        entity_type: "",
        entities: [],
      },
      {
        entity_type: "",
        entities: [],
      },
    ],
  });
  React.useEffect(() => {
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
    };
    getMapper();
  }, []);

  const handleTimeRangeChange = (timeRange: any) => {
    setData({ ...data, time_range: timeRange.text });
  };

  const handleIndicatorChange = (value: any) => {
    // console.log("value", value.target.value);
    const newData: any = { ...data };
    newData.filters[0].entity_type = "indicator";
    newData.filters[0].entities = [value.target?.value];

    // Update the state
    setData(newData);
  };
  const handleSeverityChange = (value: any) => {
    const newData: any = { ...data };
    newData.filters[1].entity_type = "severity";
    newData.filters[1].entities = [value.target?.value];

    // Update the state
    setData(newData);
  };
  const handleStatusChange = (value: any) => {
    const newData: any = { ...data };
    newData.filters[3].entity_type = "status";
    newData.filters[3].entities = [value.target?.value];

    // Update the state
    setData(newData);
  };
  const handleDeviceChange = (value: any) => {
    const newData: any = { ...data };
    newData.filters[2].entity_type = "device.id";
    newData.filters[2].entities = value;

    // Update the state
    setData(newData);
  };

  const deviceValues = allDevices.map((item: any) => ({
    name: item.hostname,
    id: item._id,
  }));

  const handleSave = () => {
    const modified = replaceUnderscoresWithPeriodsnested(data);

    const filters = Object.values(modified.filters);
    modified.filters = filters;

    const modifiedData = replaceUnderScoreWithPeriodsArrayOfObjects(
      modified.filters
    );
    modified.filters = modifiedData;

    console.log("data", modified);
    emit("ws.alert.explorer", modified);
    // // console.log("data", modifiedData);
    // modified["event.type"] = "ws.alert.visualization";
    // newEventBus.send("server.event", {
    //   "event.type": "ws.alert.visualization",
    //   // payload,
    //   ...JSON.parse(payload),
    //   // "query.id": 123435,
    //   // userName: "admin",
    // });
  };
  return (
    <>
      <PageHeading heading="Alert Explorer" />
      <div className="flex flex-col bg-white my-2 rounded-xl">
        {/* <div className="flex justify-around">
          <div className="flex pt-6">
            <p className="m-2">Select TimeRange</p>
            <TimeRangePicker onTimeRangeChange={handleTimeRangeChange} />
          </div>
          <div>
            <SingleSelectDropdown
              label="Select Severity"
              value={data.filters[1].entities[0]}
              selectData={["CRITICAL", "MAJOR", "WARNING"]}
              onChange={handleSeverityChange}
            />
          </div>
          <div>
            <SingleSelectDropdown
              label="Select Indicator"
              value={data.filters[0].entities[0]}
              selectData={indicatorsArray}
              onChange={handleIndicatorChange}
            />
          </div>
        </div> */}

        {/* <div className="flex justify-around">
          <div>
            <MultipleSelectChip
              title="Select Devices"
              values={deviceValues}
              apiData={[""]}
              onChange={handleDeviceChange}
            />
          </div>
          <div>
            <SingleSelectDropdown
              label="Select Status"
              value={data.filters[3].entities[0]}
              selectData={["OPEN", "CLOSE"]}
              onChange={handleStatusChange}
            />
          </div>
        </div> */}
      </div>
      {/* <div onClick={handleSave}>
        <CustomeButtons title="Search" />
      </div>
      {receivedData && <AlertExplorerTabel data={receivedData} />} */}
    </>
  );
};

export default AlertExplorer;
