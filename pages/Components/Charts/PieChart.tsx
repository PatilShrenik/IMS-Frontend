import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsVariablePie from "highcharts/modules/variable-pie";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsAccessibility from "highcharts/modules/accessibility";

// Initialize Highcharts modules

const ChartComponent = (props: any) => {
  useEffect(() => {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);
    HighchartsVariablePie(Highcharts);
    NoDataToDisplay(Highcharts);
  }, []);
  useEffect(() => {
    // console.log(props.data.data);
    if (props?.data) {
      const options: any = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          events: {
            fullscreenOpen: function () {
              (this as any).update({
                plotOptions: {
                  pie: {
                    size: "90%",
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                      enabled: true,
                      format: "{point.percentage:.1f} %",
                    },
                    showInLegend: true,
                  },
                },
              });
            },
            fullscreenClose: function () {
              (this as any).update({
                plotOptions: {
                  pie: {
                    size: props.height / 3 || "200px",
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                      enabled: true,
                      format: "{point.percentage:.1f} %",
                    },
                    showInLegend: true,
                  },
                },
              });
            },
          },
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
            size: props.height / 3 || "200px",
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
            name: "networks", //this will come from api
            borderRadius: 0,
            colorByPoint: true,
            data: props?.data?.data || [],
          },
        ],
        //   exporting: {
        //     showTable: true,
        //     csv: {
        //         columnHeaderFormatter: function(item, key) {
        //             if (!item || item instanceof Highcharts.Axis) {
        //                 return 'My new custom name yo'         //this will be the column heading
        //             } else {
        //                 return item.name;
        //             }
        //         }
        //     }
        // }
      };

      Highcharts.chart("container-" + props.id, options);
    }
  }, [props.data]); // Empty dependency array ensures the effect runs once after initial render
  const containerStyle = {
    height: props.height || "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return <div id={"container-" + props.id} style={containerStyle} />;
};

export default ChartComponent;
