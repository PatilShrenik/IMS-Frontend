import React, { useState, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Drawer } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ChartWidget from "@/pages/Widgets/ChartWidget";
import GridWidget from "@/pages/Widgets/GridWidget";
import TOPNWidget from "@/pages/Widgets/TopNWidget";
import GaugeWidget from "@/pages/Widgets/GaugeWidget";
import { getWidgetById } from "@/pages/api/api/ReportsAPI";
import replacePeriodsWithUnderscoresSingleObject, {
  replaceDotWithUnderscore2,
  replacePeriodsWithUnderscoresnested,
} from "@/functions/genericFunctions";
import EditChartWidget from "@/pages/Widgets/EditChartWidget";
import EditGridWidget from "@/pages/Widgets/EditGridWidget";
import EditGaugeWidget from "@/pages/Widgets/EditGaugeWidget";
import EditTopnWidget from "@/pages/Widgets/EditTOPNWidget";
import { useAppContext } from "../AppContext";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "100%",
  },
}));

const EditWidgetDrawer = (props: any) => {
  const { rowId, open, handleDrawerClose } = props;
  const classes = useStyles();
  const { getWidgetApiState } = useAppContext();
  const [value, setValue] = React.useState("chart");
  const [data, setData] = React.useState({});

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    try {
      const getById = async () => {
        let response = await getWidgetById(rowId);
        const modifiedData = replaceDotWithUnderscore2(response.result);
        console.log("Final Data:", modifiedData);
        setData(modifiedData);
        setValue(modifiedData.widget_type);
        // const transformedArray: any = Object.entries(
        //   modifiedData && modifiedData.scalar_oid
        // ).map(([key, value]) => ({ key, value }));
        // setFormData(transformedArray);
        // modifiedData.name ? setName(modifiedData.name) : setName("");
        // modifiedData.description
        //   ? setDescription(modifiedData.description)
        //   : setDescription("");
        // const resultArray: any = Object.keys(modifiedData.objects).map(
        //   (key) => {
        //     const innerObject = modifiedData.objects[key];
        //     const innerArray = Object.keys(innerObject).map((innerKey) => {
        //       return { key: innerKey, value: innerObject[innerKey] };
        //     });

        //     return { key, values: innerArray };
        //   }
        // );
        // setNestedFormData(resultArray);
      };
      getById();
    } catch (error) {
      console.log(error);
    }
  }, [rowId, getWidgetApiState]);

  return (
    <Drawer
      anchor="right"
      open={open}
      variant="temporary"
      classes={{ paper: classes.drawer }}
      className="shadow-sm shadow-dark-container w-full overflow-y-auto dark:bg-dark-menu-color"
    >
      <div className="h-full w-full dark:bg-dark-menu-color bg-white ">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
              <p className="text-primary2 font-semibold">Edit Widget</p>
              <div className="flex justify-between">
                <TabList
                  className="mr-16"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Chart"
                    value="chart"
                    className="dark:text-textColor"
                    disabled={value == "chart" ? false : true}
                  />
                  <Tab
                    label="Grid"
                    value="grid"
                    className="dark:text-textColor"
                    disabled={value == "grid" ? false : true}
                  />
                  <Tab
                    label="TopN"
                    value="topN"
                    className="dark:text-textColor"
                    disabled={value == "topN" ? false : true}
                  />
                  <Tab
                    label="Gauge"
                    value="gauge"
                    className="dark:text-textColor"
                    disabled={value == "gauge" ? false : true}
                  />
                  {/* <Tab
                    label="Sankey"
                    value="sankey"
                    className="dark:text-textColor"
                  />
                  <Tab
                    label="Histogram"
                    value="histogram"
                    className="dark:text-textColor"
                  /> */}
                </TabList>
                <CloseSharpIcon
                  className="cursor-pointer mr-3 dark:text-textColor"
                  onClick={handleDrawerClose}
                />
              </div>
            </div>
            <div className="py-6 px-6">
              <Box>
                {/* <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Chart"
                    value="chart"
                    className="dark:text-textColor"
                  />
                  <Tab
                    label="Grid"
                    value="grid"
                    className="dark:text-textColor"
                  />
                  <Tab
                    label="TopN"
                    value="topn"
                    className="dark:text-textColor"
                  />
                  <Tab
                    label="Gauge"
                    value="gauge"
                    className="dark:text-textColor"
                  />
                  <Tab
                    label="Sankey"
                    value="sankey"
                    className="dark:text-textColor"
                  />
                  <Tab
                    label="Histogram"
                    value="histogram"
                    className="dark:text-textColor"
                  />
                </TabList> */}
              </Box>
              <TabPanel style={{ padding: "0", height: "100%" }} value="chart">
                <EditChartWidget
                  handleAddDrawerClose={handleDrawerClose}
                  widgetData={data}
                />
              </TabPanel>
              <TabPanel style={{ padding: "0", height: "100%" }} value="grid">
                <EditGridWidget
                  handleAddDrawerClose={handleDrawerClose}
                  widgetData={data}
                />
              </TabPanel>
              <TabPanel style={{ padding: "0", height: "100%" }} value="topN">
                <EditTopnWidget
                  handleAddDrawerClose={handleDrawerClose}
                  widgetData={data}
                />
              </TabPanel>
              <TabPanel style={{ padding: "0", height: "100%" }} value="gauge">
                <EditGaugeWidget
                  handleAddDrawerClose={handleDrawerClose}
                  widgetData={data}
                />
              </TabPanel>
              <TabPanel value="sankey">Sankey</TabPanel>
              <TabPanel value="histogram">TopN</TabPanel>
            </div>
          </TabContext>
        </Box>
      </div>
    </Drawer>
  );
};

export default EditWidgetDrawer;
