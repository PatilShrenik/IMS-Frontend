import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StackChartComponent = (props: any) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const options: any = {
        chart: {
          type: "column",
        },
        title: {
          text: props.data.title,
          align: "left",
        },
        xAxis: {
          categories: props.data.categories,
          title: {
            text: props.data.xAxis,
          },
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
        yAxis: {
          min: 0,
          title: {
            text: props.data.yAxis,

          },
          stackLabels: {
            enabled: true,
          },
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
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: props.data.data,
      };

      Highcharts.chart(chartContainer.current, options);
    }
  }, [props.data]); // Empty dependency array ensures the effect runs once after initial render

  return <div ref={chartContainer} style={{ height: "500px" }} />;
};

export default StackChartComponent;
