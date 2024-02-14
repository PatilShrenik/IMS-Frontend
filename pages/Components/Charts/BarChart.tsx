import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarGraph = (props: any) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const options: any = {
        chart: {
          // height: (9 / 16 * 100) + '%',
          height: props.height || 500,
          type: props?.data?.type || "column",
        },
        title: {
          text: props?.data?.title || "",
          align: "left",
          style: {
            fontWeight: "bold",
            fontSize: "12px",
          },
        },
        xAxis: {
          categories: props?.data?.categories || [],
          title: {
            text: props?.data?.xAxis || "",
          },
        },
        lang: {
          noData: "No Data to Display",
        },
        credits: {
          enabled: false,
        },
        noData: {
          style: {
            fontWeight: "bold",
            fontSize: "15px",
            color: "#303030",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: props?.data?.yAxis || "",
          },
          stackLabels: {
            enabled: false,
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
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}",
        },
        plotOptions: {
          column: {
            stacking:
              props?.data?.stacking == "true" || props?.data?.stacking == true
                ? "normal"
                : false,
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: props?.data?.data || [], //name should be passed here and it will come from api
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

      // console.log(props.data)

      Highcharts.chart(chartContainer.current, options);
    }
  }, [props.data]); // Empty dependency array ensures the effect runs once after initial render

  return <div ref={chartContainer} />;
};

export default BarGraph;
