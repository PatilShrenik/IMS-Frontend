import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import EventBus from "vertx3-eventbus-client";
import PageHeading from "@/pages/Components/PageHeading";

import "react-toastify/dist/ReactToastify.css";
import { emit } from "process";
import { useWebSocketContext } from "../Components/WebSocketContext";
const LiveAlert = () => {
  const [receivedData, setReceivedData] = useState<any>([]);
  const [PIDs, setPIDs] = useState<any>([]);
  const [severityCounts, setSeverityCounts] = useState<any>({});

  const { Subscribe, unsubscribe, emit, connection } = useWebSocketContext();
  // Get
  useEffect(() => {
    // Initial subscription
    if (connection) {
      Subscribe("live1", "ws.alert.live.view", render);
    }
    // Set up interval for repeated subscriptions every 5 seconds
    // emit("ws.alert.live.view", {});

    // Clean up the interval on component unmount
    return () => {
      // clearInterval(intervalId);
      unsubscribe("live1", "ws.alert.live.view");
    };
  }, [connection]);

  function render(payload: any) {
    // console.log("live alert p", payload);
    const newData = payload;
    const filteredKeys = Object.keys(newData).filter(
      (key) => key !== "event.type"
    );

    // Extract values corresponding to the filtered keys
    const filteredValues = filteredKeys.map((key) => newData[key]);

    // Do something with the arrays if needed
    // console.log("Filtered Keys Array:", filteredKeys);
    // console.log("Filtered Values Array:", filteredValues);

    // Replace existing data in receivedData state
    // console.log("filtered", filteredValues);
    setReceivedData(filteredValues);

    const newSeverityCounts = filteredValues.reduce((acc, value) => {
      const severity = value?.severity;
      if (severity) {
        acc[severity] = (acc[severity] || 0) + 1;
      }
      return acc;
    }, {});

    // Set severityCounts into state
    setSeverityCounts(newSeverityCounts);
  }

  const handleButtonClick = (value: any) => {
    // Filter data where severity is "CRITICAL"
    const criticalData = receivedData.filter(
      (data: any) => data.severity === value
    );
    // console.log("Filtered Critical Data:", criticalData);
    // You can do further processing with the filtered data or update the state as needed
  };

  return (
    <>
      <PageHeading heading="Live Alert" />
      {/* <button
        onClick={() => {
          emit("send", {});
        }}
      >
        Emit
      </button> */}
      <div className="pt-6">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 128,
              height: 128,
            },
          }}
          className=" justify-around"
        >
          <Paper
            onClick={() => handleButtonClick("CRITICAL")}
            elevation={3}
            style={{
              width: "15rem",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            <div className="p-4 ">
              <h5 className="leading-6">CRITICAL</h5>
              <h4 className="pt-2">
                {severityCounts.CRITICAL ? severityCounts.CRITICAL : 0}
              </h4>
            </div>
          </Paper>
          <Paper
            onClick={() => handleButtonClick("MAJOR")}
            elevation={3}
            style={{
              width: "15rem",
              backgroundColor: "#F3B61F",
              color: "white",
              cursor: "pointer",
            }}
          >
            <div className="p-4 ">
              <h5 className="leading-6">MAJOR</h5>
              <h4 className="pt-2">
                {" "}
                {severityCounts.MAJOR ? severityCounts.MAJOR : 0}
              </h4>
            </div>
          </Paper>
          <Paper
            onClick={() => handleButtonClick("WARNING")}
            elevation={3}
            style={{
              width: "15rem",
              backgroundColor: "#88B7B5",
              color: "white",
              cursor: "pointer",
            }}
          >
            <div className="p-4 ">
              <h5 className="leading-6">WARNING</h5>
              <h4 className="pt-2">
                {" "}
                {severityCounts.WARNING ? severityCounts.WARNING : 0}
              </h4>
            </div>
          </Paper>
        </Box>
      </div>
      <div className="py-6">
        {/* <LiveAlertTabel data={receivedData} /> */}
      </div>
    </>
  );
};

export default LiveAlert;
