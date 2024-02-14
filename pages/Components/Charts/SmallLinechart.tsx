import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppContext } from "../AppContext";
// import { getUnBlendedCost } from "@/pages/api/FinopsApi/GetUnblendedCost";

const SmallLineChartComponent = (props: any) => {
  const chartContainer = useRef(null);
  const { themeSwitch } = useAppContext();
  useEffect(() => {
    console.log(themeSwitch);
    const theme = themeSwitch ? "dark-unica" : "grid";
    const selectedTheme = theme as keyof typeof Highcharts.theme;

    console.log("Available themes:", Highcharts.theme);

    if (Highcharts.theme && Highcharts.theme[selectedTheme]) {
      console.log(`Setting options for theme: ${selectedTheme}`);
      Highcharts.setOptions(Highcharts.theme[selectedTheme]);
    } else {
      console.error(`Theme not found: ${selectedTheme}`);
    }
  }, []);
  useEffect(() => {
    if (chartContainer.current) {
      const newData =
        props &&
        props.data &&
        props.data.data &&
        props?.data?.data.map((e: any) => {
          let changedData = e.data?.map((x: any) => {
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
          return {
            name: e.name,
            data: changedData,
            color: e.name == "AWS" && "#FF4500",
          };
        });

      Highcharts.theme = {
        "dark-unica": {
          colors: [
            "#2B908F",
            "#90EE7E",
            "#F45B5B",
            "#7798BF",
            "#aaeeee",
            "#ff0066",
            "#eeaaee",
            "#55BF3B",
            "#DF5353",
            "#7798BF",
          ],
          chart: {
            backgroundColor: "#101D2E",
            // {
            //   linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            //   stops: [
            //     [0, "#2a2a2b"],
            //     [1, "#3e3e40"],
            //   ],
            // },
            style: {
              fontFamily: "'Unica One', sans-serif",
            },
            plotBorderColor: "#606063",
          },
          title: {
            style: {
              color: "#E0E0E3",
              textTransform: "uppercase",
              // fontSize: "20px",
            },
          },
          subtitle: {
            style: {
              color: "#E0E0E3",
              textTransform: "uppercase",
            },
          },
          xAxis: {
            // gridLineColor: "#707073",
            labels: {
              style: {
                color: "black",
              },
            },
            // lineColor: "#707073",
            // minorGridLineColor: "#505053",
            tickColor: "#707073",
            title: {
              style: {
                color: "#A0A0A3",
              },
            },
          },
          yAxis: {
            // gridLineColor: "#707073",
            labels: {
              style: {
                color: "black",
              },
            },
            // lineColor: "#707073",
            // minorGridLineColor: "#505053",
            tickColor: "#707073",
            tickWidth: 1,
            title: {
              style: {
                color: "#A0A0A3",
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            style: {
              color: "#F0F0F0",
            },
          },
          plotOptions: {
            series: {
              dataLabels: {
                color: "#B0B0B3",
              },
              // marker: {
              //   lineColor: "#333",
              // },
            },
            boxplot: {
              fillColor: "#505053",
            },
            candlestick: {
              lineColor: "white",
            },
            errorbar: {
              color: "white",
            },
          },
          legend: {
            itemStyle: {
              color: "#E0E0E3",
            },
            itemHoverStyle: {
              color: "#FFF",
            },
            itemHiddenStyle: {
              color: "#606063",
            },
          },
          credits: {
            style: {
              color: "#666",
            },
          },
          labels: {
            style: {
              color: "#707073",
            },
          },
          drilldown: {
            activeAxisLabelStyle: {
              color: "#F0F0F3",
            },
            activeDataLabelStyle: {
              color: "#F0F0F3",
            },
          },
          navigation: {
            buttonOptions: {
              symbolStroke: "#DDDDDD",
              theme: {
                fill: "#505053",
              },
            },
          },
        },
        grid: {
          colors: [
            "#058DC7",
            "#50B432",
            "#ED561B",
            "#DDDF00",
            "#24CBE5",
            "#64E572",
            "#FF9655",
            "#FFF263",
            "#6AF9C4",
          ],
          chart: {
            backgroundColor: null,
            style: {
              fontFamily: "Dosis, sans-serif",
            },
          },
          title: {
            style: {
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
            },
          },
          tooltip: {
            borderWidth: 0,
            // backgroundColor: "rgba(219,219,216,0.8)",
            shadow: false,
          },
          legend: {
            itemStyle: {
              color : "black",
              fontWeight: "bold",
              fontSize: "13px",
            },
          },
          xAxis: {
            gridLineWidth: 1,
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
          yAxis: {
            minorTickInterval: "auto",
            title: {
              style: {
                textTransform: "uppercase",
              },
            },
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
          plotOptions: {
            candlestick: {
              lineColor: "#404048",
            },
          },
        },
        // ... other themes
      };

      const theme = themeSwitch ? "dark-unica" : "grid";
      const selectedTheme = theme as keyof typeof Highcharts.theme;

      console.log("Available themes:", Highcharts.theme);

      if (Highcharts.theme && Highcharts.theme[selectedTheme]) {
        console.log(`Setting options for theme: ${selectedTheme}`);
        Highcharts.setOptions(Highcharts.theme[selectedTheme]);
      } else {
        console.error(`Theme not found: ${selectedTheme}`);
      }

      const options: any = {
        title: {
          text: props?.data?.title ?? "Consumption Trend",
          align: "left",
          style: {
            color: props?.titleColor ?? "#000",
            fontWeight: "bold",
          },
        },

        yAxis: [
          {
            title: {
              text: props?.data?.firstYAxis || "Rupees",
            },
          },
          {
            title: {
              text: props?.data?.secondYAxis || "Dollar",
            },
            opposite: true, // Place this y-axis on the opposite side
          },
        ],
        xAxis: {
          title: {
            text: props?.data?.xAxis || "",
          },
          type: "category",
        },
        credits: {
          enabled: false,
        },
        legend: {
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

        chart: {
          height: 245, // Adjust the height of the chart based on the reports prop
        },

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
      };

      Highcharts.chart(chartContainer.current, options);
    }
  }, [props?.data, props?.reports, themeSwitch]);

  return <div ref={chartContainer} />;
};

export default SmallLineChartComponent;
