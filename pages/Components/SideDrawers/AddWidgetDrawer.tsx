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

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "100%",
  },
}));

const AddWidgetDrawer = (props: any) => {
  const { open, handleAddDrawerClose } = props;
  const classes = useStyles();

  const [value, setValue] = React.useState("chart");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
              <p className="text-primary2 font-semibold">Add Widget</p>
              <div className="flex justify-between">
                <TabList
                  className="mr-16"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Chart"
                    value="chart"
                    className="dark:text-textColor text-black items-baseline mx-4"
                  />
                  <Tab
                    label="Grid"
                    value="grid"
                    className="dark:text-textColor text-black items-baseline mx-4"
                  />
                  <Tab
                    label="TopN"
                    value="topn"
                    className="dark:text-textColor text-black items-baseline mx-4"
                  />
                  <Tab
                    label="Gauge"
                    value="gauge"
                    className="dark:text-textColor text-black items-baseline mx-4"
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
                  onClick={handleAddDrawerClose}
                />
              </div>
            </div>
            <div className="py-6 px-6 dark:bg-dark-menu-color">
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
              <TabPanel style={{ padding: "0", height: "100%", width:"93%" }} value="chart">
                <ChartWidget handleAddDrawerClose={handleAddDrawerClose} />
              </TabPanel>
              <TabPanel style={{ padding: "0", height: "100%" , width:"93%" }} value="grid">
                <GridWidget handleAddDrawerClose={handleAddDrawerClose} />
              </TabPanel>
              <TabPanel style={{ padding: "0", height: "100%" , width:"93%"}} value="topn">
                <TOPNWidget handleAddDrawerClose={handleAddDrawerClose} />
              </TabPanel>
              <TabPanel style={{ padding: "0", height: "100%" , width:"93%" }} value="gauge">
                <GaugeWidget handleAddDrawerClose={handleAddDrawerClose} />
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

export default AddWidgetDrawer;
