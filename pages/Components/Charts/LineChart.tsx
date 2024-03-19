import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import moment from "moment";

const LineChartComponent = (props: any) => {
  useEffect(() => {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);
    NoDataToDisplay(Highcharts);
  }, []);
  const chartContainer = useRef(null);

  const morphData = (data: any) => {
    const initialData = data?.result || [];
    const groupBy = "interface";
    const totalGroupsKeys: any = {};
    if (groupBy != "device") {
      initialData.filter((item: any) => {
        if (!totalGroupsKeys[item?.event[groupBy]]) {
          totalGroupsKeys[item?.event[groupBy]] = true;
        }
      });
    }
    console.log("totalGroupsKeys", totalGroupsKeys);
    const devices = Array.from(
      new Set(initialData.map((item: any) => item?.event?.device))
    );
    console.log("devices", devices);
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
    console.log("indexes", indexes);
    const lines: any[] = [];
    devices.forEach((device: any) => {
      indexes.forEach((index: any, i: any) => {
        if (groupBy != "device") {
          console.log("if");
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
                ? device + "-" + index
                : device +
                  "-" +
                  groupBy +
                  `(${initialData[i]?.event[groupBy]})` +
                  "-" +
                  index;
            lines.push({ name: legendName, data: data });
          });
        } else {
          console.log("else");
          const data = initialData
            .filter((item: any) => item?.event?.device === device)
            .map((item: any) => [
              moment(item?.timestamp).format("lll"),
              parseInt(`${item?.event?.[index]}`),
            ]);
          const legendName =
            groupBy == "device"
              ? device + "-" + index
              : device +
                "-" +
                groupBy +
                `(${initialData[i]?.event[groupBy]})` +
                "-" +
                index;
          lines.push({ name: legendName, data: data });
        }
      });
    });
    // console.log("lines", lines);
    return lines;
  };

  useEffect(() => {
    console.log("data in line chart", props.data);
    if (chartContainer.current) {
      // const newData: any = morphData(DummyData);
      const newData: any = morphData(props && props.data && props.data);
      const options: any = {
        chart: {
          animation: false,
          // height: 200, // Adjust the height of the chart based on the reports prop
          zoomType: "x",
        },
        title: {
          text: "",
          align: "left",
          style: {
            fontWeight: "bold",
            fontSize: "12px",
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
        },

        xAxis: {
          title: {
            text: "",
          },
          type: "category",
        },
        legend: {
          enabled: true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          itemStyle: {
            fontSize: "10px", // Adjust font size of legends
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
          series: {
            label: {
              connectorAllowed: false,
            },
          },
        },

        series: newData,
      };

      Highcharts.chart(chartContainer.current, options);
    }
  }, [props.data]);

  return <div ref={chartContainer} />;
};

export default LineChartComponent;
