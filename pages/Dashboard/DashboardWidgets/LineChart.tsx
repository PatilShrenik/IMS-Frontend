import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import moment from "moment";
import { useWebSocketContext } from "@/pages/Components/WebSocketContext";
import { GetWidgetsData } from "@/pages/api/api/DashboardWidgetsAPI";
import { useAppContext } from "@/pages/Components/AppContext";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";

const LineChartDashboardComponent = (props: any) => {
  useEffect(() => {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);
    NoDataToDisplay(Highcharts);
  }, []);
  const [allDevices, setAllDevices] = React.useState([]);
  const eventType = "ws.visualization";
  const [data, setData] = useState<any>();
  const { Subscribe, emit, unsubscribe, connection } = useWebSocketContext();
  // console.log("props.keys", props);
  function renderer(payload: any) {
    if (props.keys.endsWith(`${payload._id}`)) {
      console.log("payload - " + props.keys, payload);
      setData(payload);
    }
  }
  async function getWidgetData() {
    // console.log("props - ",props.id, props.keys);
    return await GetWidgetsData(props.id);
  }
  const { themeSwitch, toggleThemeSwitch } = useAppContext();

  const isBrowser = typeof window !== "undefined";

  const [colorTheme, setColorTheme] = useState<any>(
    isBrowser ? localStorage.getItem("color-theme") : null
  );
  useEffect(() => {
    const handleStorageChange = () => {
      // console.log("Storage change detected");
      const newColorTheme = localStorage.getItem("color-theme");
      // console.log("New color theme:", newColorTheme);
      setColorTheme(newColorTheme);
    };
    handleStorageChange();
  }, [themeSwitch]);

  React.useEffect(() => {
    const getDevices = async () => {
      let response = await getAllDevice();
      setAllDevices(response.result);
    };
    getDevices();
  }, []);

  useEffect(() => {
    // console.log(props.keys, eventType)
    if (!connection) return;
    Subscribe(props.keys, eventType, renderer);

    return () => {
      unsubscribe(props.keys, eventType);
    };
  }, [Subscribe, emit, props.id, props.keys, unsubscribe, connection]);
  useEffect(() => {
    if (!connection) return;

    getWidgetData().then((res: any) => {
      // console.log("line chart res",res, props.keys)
      emit(eventType, res.result);
    });
  }, [connection]);

  const chartContainer = useRef(null);

  const morphData = (data: any) => {
    const initialData = data?.result || [];
    const groupBy = data?.["group.by"];
    const totalGroupsKeys: any = {};
    if (groupBy != "device") {
      initialData.filter((item: any) => {
        if (!totalGroupsKeys[item?.event[groupBy]]) {
          totalGroupsKeys[item?.event[groupBy]] = true;
        }
      });
    }
    // console.log("totalGroupsKeys", totalGroupsKeys);
    const devices = Array.from(
      new Set(initialData.map((item: any) => item?.event?.device))
    );
    const devicesAsNumbers = devices.map((device) => Number(device));

    const deviceValues: any[] =
      allDevices &&
      allDevices
        .filter((item: any) => devicesAsNumbers.includes(item._id))
        .map((item: any) => ({ id: item._id, hostname: item.hostname }));
    // console.log("device values", deviceValues);
    const firstData = initialData[0]?.event || {};
    const allKeys = Object.keys(firstData);
    const indexes = Array.from(
      new Set(
        allKeys.filter((keys: any) => {
          if (keys != "device" && keys != groupBy) {
            return keys;
          }
        })
      )
    );
    const lines: any[] = [];
    devices.forEach((device: any) => {
      const deviceObject : any = deviceValues.find((item: any) => item.id === parseInt(device));
      const hostname = deviceObject ? deviceObject.hostname : "";
      console.log("---", deviceObject)
      console.log("====", hostname)
      indexes.forEach((index: any, i: any) => {
        if (groupBy != "device") {
          Object.keys(totalGroupsKeys).forEach((key: any, i: any) => {
            const data = initialData
              .filter(
                (item: any) =>
                  item?.event?.device === device && item?.event[groupBy] == key
              )
              .map((item: any) => [
                moment(item?.timestamp).format("lll"),
                parseInt(`${item?.event?.[index]}`),
              ]);
            const legendName =
              groupBy == "device"
                ? hostname + "-" + index
                : hostname +
                  "-" +
                  groupBy +
                  `(${initialData[i]?.event[groupBy]})` +
                  "-" +
                  index;
            lines.push({ name: legendName, data: data });
          });
        } else {
          const data = initialData
            .filter((item: any) => item?.event?.device === device)
            .map((item: any) => [
              moment(item?.timestamp).format("lll"),
              parseInt(`${item?.event?.[index]}`),
            ]);
          const legendName =
            groupBy == "device"
              ? hostname + "-" + index
              : hostname +
                "-" +
                groupBy +
                `(${initialData[i]?.event[groupBy]})` +
                "-" +
                index;
          lines.push({ name: legendName, data: data });
        }
      });
    });
    console.log("lines", lines);
    return lines;
  };

  useEffect(() => {
    if (chartContainer.current && data) {
      // console.log(props.data);
      // const newData: any = morphData(DummyData);
      const backgroundColor = colorTheme == "dark" ? "#2C2C38" : "#fff";
      const fontColor = colorTheme == "dark" ? "white" : "black ";
      const newData: any = morphData(data);
      const options: any = {
        chart: {
          animation: false,
          // height: 200, // Adjust the height of the chart based on the reports prop
          zoomType: "x",
          // backgroundColor,
        },
        title: {
          text: data.name || "",
          align: "left",
          style: {
            fontWeight: "bold",
            fontSize: "14px",
            // color: fontColor,
          },
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          crosshairs: true,
          animation: true,
          shared: true,
        },

        yAxis: {
          title: {
            text: "",
          },
          // style: {
          //   color: fontColor,
          // },
        },

        xAxis: {
          title: {
            text: "",
          },
          type: "category",
          // style: {
          //   color: fontColor,
          // },
        },
        legend: {
          enabled: true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          itemStyle: {
            fontSize: "10px",
            // style: {
            // color: fontColor,
            // }, // Adjust font size of legends
          },
          itemWidth: 150, // Set the width of each legend item
          itemDistance: 5,
        },

        noData: {
          style: {
            fontWeight: "bold",
            fontSize: "15px",
            color: "#303030",
          },
        },
        lang: {
          noData: "No Data to Display",
        },
        plotOptions: {
          // color: fontColor,
          series: {
            label: {
              connectorAllowed: false,
            },
            // color: fontColor,
          },
        },

        series: newData,
      };

      Highcharts.chart(chartContainer.current, options);
    }
  }, [data, props.id]);

  return (
    <div className="p-2 overflow-hidden" id={props.keys} ref={chartContainer} />
  );
};

export default LineChartDashboardComponent;
