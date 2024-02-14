import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import { getUnBlendedCost } from "@/pages/api/FinopsApi/GetUnblendedCost";

const LineChartComponent = (props: any) => {
  const chartContainer = useRef(null);
  // const props : any = {}
  useEffect(() => {
    if (chartContainer.current) {
      const newData =
        props &&
        props.data &&
        props.data.data &&
        props?.data?.data.map((e: any) => {
          let changedData =
            e &&
            e.data &&
            e.data?.map((x: any) => {
              const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

              const isValidMonth = monthNames.includes(x[0]);
              const formattedDate = isValidMonth
                ? x[0] // If it's a valid month name, use it as-is
                : new Date(x[0]).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                  });

              return [formattedDate, x[1]];
            });
          return { name: e.name, data: changedData };
        });
      // console.log("newdata",newData)
      const options: any = {
        chart: {
          animation: false,
          height: props?.height || 500, // Adjust the height of the chart based on the reports prop
          zoomType: "x",
        },
        title: {
          text: props?.data?.title,
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
            text: props?.data?.yAxis || "",
          },
        },

        xAxis: {
          title: {
            text: props?.data?.xAxis || "",
          },
          type: "category",
        },
        legend: {
          enabled: props?.legendEnabled ?? true,
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

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
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

      Highcharts.chart(chartContainer.current, options);
    }
  }, [props?.data, props?.reports]);

  return <div ref={chartContainer} />;
};

export default LineChartComponent;
