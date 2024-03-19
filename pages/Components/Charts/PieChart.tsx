import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsVariablePie from "highcharts/modules/variable-pie";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsAccessibility from "highcharts/modules/accessibility";

// Initialize Highcharts modules

const PieChartComponent = (props: any) => {
  useEffect(() => {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);
    HighchartsVariablePie(Highcharts);
    NoDataToDisplay(Highcharts);
  }, []);
  const morphData = (data: any) => {
    const initialData = data?.result || [];
    const groupBy = data["group.by"];
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
                : device + "-" + groupBy + `(${key})` + "-" + index;
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
    // console.log(props);

    if (props?.data) {
      const newData: any = morphData(props.data);
      console.log("newData", newData);
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
          text: props?.data?.title || "",
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

      Highcharts.chart("container-" + props.id, options);
    }
  }, [props.data]); // Empty dependency array ensures the effect runs once after initial render

  return <div id={"container-" + props.id} />;
};

export default PieChartComponent;
