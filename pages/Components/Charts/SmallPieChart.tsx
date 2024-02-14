import React, { useEffect } from "react";
import Highcharts from "highcharts";
import "highcharts/themes/dark-unica";
import "highcharts/themes/grid";
import HighchartsVariablePie from "highcharts/modules/variable-pie";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import { useAppContext } from "../AppContext";

const SmallPieCHart = (props: any) => {
  const { themeSwitch } = useAppContext();

  useEffect(() => {
    HighchartsAccessibility(Highcharts);
    HighchartsVariablePie(Highcharts);
    NoDataToDisplay(Highcharts);
  }, []);

  useEffect(() => {
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
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
              [0, "#2a2a2b"],
              [1, "#3e3e40"],
            ],
          },
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
          gridLineColor: "#707073",
          labels: {
            style: {
              color: "#E0E0E3",
            },
          },
          lineColor: "#707073",
          minorGridLineColor: "#505053",
          tickColor: "#707073",
          title: {
            style: {
              color: "#A0A0A3",
            },
          },
        },
        yAxis: {
          gridLineColor: "#707073",
          labels: {
            style: {
              color: "#E0E0E3",
            },
          },
          lineColor: "#707073",
          minorGridLineColor: "#505053",
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
            marker: {
              lineColor: "#333",
            },
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
            color: themeSwitch && "#DEE4EE",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "uppercase",
          },
        },
        tooltip: {
          borderWidth: 0,
          backgroundColor: "rgba(219,219,216,0.8)",
          shadow: false,
        },
        legend: {
          itemStyle: {
            color: "black",
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

    // console.log("Available themes:", Highcharts.theme);

    if (Highcharts.theme && Highcharts.theme[selectedTheme]) {
      // console.log(`Setting options for theme: ${selectedTheme}`);
      Highcharts.setOptions(Highcharts.theme[selectedTheme]);
    } else {
      // console.error(`Theme not found: ${selectedTheme}`);
    }
  }, [themeSwitch]);

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
            style: {
              backgroundColor: "#101D2E",
            },
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
      };

      Highcharts.chart("container-" + props.id, options);
    }
  }, []); // Empty dependency array ensures the effect runs once after initial render
  const containerStyle = {
    height: props.height || "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return <div id={"container-" + props.id} style={containerStyle} />;
};

export default SmallPieCHart;
