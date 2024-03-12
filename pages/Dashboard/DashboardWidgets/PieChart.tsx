import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import moment from "moment";
import { useWebSocketContext } from "@/pages/Components/WebSocketContext";
import { GetWidgetsData } from "@/pages/api/api/DashboardWidgetsAPI";


const PieChartDashboardComponent = (props: any) => {
  useEffect(() => {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);
    NoDataToDisplay(Highcharts);
  }, []);
  const eventType = "ws.visualization";
  const [data, setData] = useState<any>();
  const { Subscribe, emit, unsubscribe, connection } = useWebSocketContext();
  // console.log("props.keys", props);
  function renderer(payload: any) {
    if (props.keys.endsWith(`${payload._id}`)){
      // console.log("payload - "+props.keys, payload);
      setData(payload);
    }
  }
  async function getWidgetData() {
    // console.log("props - ",props.id, props.keys);
    return await GetWidgetsData(props.id);
  }
  useEffect(() => {
    // console.log(props.keys, eventType)
    if (!connection) return
    Subscribe(props.keys, eventType, renderer);
    
    return () => {
      unsubscribe(props.keys, eventType);
    };
  }, [Subscribe, emit, props.id, props.keys, unsubscribe, connection]);
  useEffect(()=>{
    if (!connection) return

    getWidgetData().then((res: any) => {
      // console.log("line chart res",res, props.keys)
      emit(eventType, res.result);
    });
  },[connection])

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
    const firstData = initialData[0]?.event || 0;
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
      indexes.forEach((index: any, i: any) => {
        if (groupBy != "device") {
          Object.keys(totalGroupsKeys).forEach((key: any, i: any) => {
            const data = parseInt(
              initialData.find(
                (item: any) =>
                  item?.event?.device === device && item?.event[groupBy] == key
              )?.event?.[index]
            );
            const legendName =
              groupBy == "device"
                ? device + "-" + index
                : device +
                  "-" +
                  groupBy +
                  `(${key})` +
                  "-" +
                  index;
            // console.log("resham", data, legendName, i, key)
            lines.push({ name: legendName, y: data });
          });
        } else {
          const data = parseInt(
            initialData.find((item: any) => item?.event?.device === device)
              ?.event?.[index]
          );
          const legendName =
            groupBy == "device"
              ? device + "-" + index
              : device +
                "-" +
                groupBy +
                `(${initialData[index]?.event[groupBy]})` +
                "-" +
                index;
          lines.push({ name: legendName, y: data });
        }
      });
    });
    // console.log("lines", lines);
    return lines;
  };

  useEffect(() => {
    if (chartContainer.current && data) {
      // console.log(props.data);
      // const newData: any = morphData(DummyData);
      const newData: any = morphData(data);
      const options: any = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: data?.name || "",
          align: "left",
          style: {
            fontWeight: "bold",
            fontSize: "12px",
          },
        },
        plotOptions: {
          pie: {
            // size: props.height / 3 || "200px",
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "{point.percentage:.1f} %",
            },
            showInLegend: true,
            center: ["50%", "50%"],
          },
        },
        tooltip: {
          headerFormat: "",
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            `Total: <b>{point.y} ({point.percentage:.1f}%) </b> ${
              props?.data?.xAxis || ""
            }<br/>`,
        },
        lang: {
          noData: "No Data to Display",
        },
        noData: {
          style: {
            fontWeight: "bold",
            fontSize: "15px",
            color: "#303030",
          },
        },
        legend: {
          enabled: props.legendEnabled ?? true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          itemStyle: {
            fontSize: "10px",
          },
          itemWidth: 150,
          itemDistance: 5,
        },
        series: [
          {
            type: "pie",
            minPointSize: 100,
            innerSize: "40%",
            zMin: 0,
            name: props?.data?.name || "TopN",
            borderRadius: 0,
            colorByPoint: true,
            data: newData || [],
          },
        ],
      };

      Highcharts.chart(chartContainer.current, options);
    }
  }, [data, props.id]);

  return <div className="p-2" id={props.keys} ref={chartContainer} />;
};

export default PieChartDashboardComponent;
