import React, { createContext, useEffect, useState } from "react";
import moment from "moment";
const AppContext = createContext<{
  sidebarOpen: boolean;
  toggleSideBarState: () => void;
  toggleSideBarStateWithArgu: (state: any) => void;
  sidebarClick: boolean;
  toggleSideBarClickState: () => void;
  state: boolean;
  toggleState: () => void;
  estimateCalc: boolean;
  toggleEstimateCalc: () => void;
  time: any;
  toggleTime: (time: any) => void;
  timeEnd: any;
  toggleTimeEnd: (timeEnd: any) => void;
  authenticated: boolean;
  toggleAuthenticated: (isAuth: any) => void;
  cloud: any;
  toggleCloud: (cloud: any) => void;
  themeSwitch: boolean;
  toggleThemeSwitch: () => void;
  getCredProfileApiState: boolean;
  togglegetCredProfileApiState: () => void;
  deviceTabelState: Boolean;
  toggleDeviceTableState: () => void;
  groupState: boolean;
  toggleGroupState: () => void;
  getDisSchedApiState: boolean;
  togglegetDisSchedApiState: () => void;
  getWidgetApiState: boolean;
  toggleWidgetApiState: () => void;
  getTableApiState: boolean;
  togglegetTableApiState: () => void;
  getPolicyApiState: boolean;
  togglegetPolicyApiState: () => void;
}>({
  sidebarOpen: false,
  toggleSideBarState: () => {},
  toggleSideBarStateWithArgu: (state) => {},
  sidebarClick: false,
  toggleSideBarClickState: () => {},
  state: false,
  toggleState: () => {},
  estimateCalc: false,
  toggleEstimateCalc: () => {},
  time: moment().subtract(15, "day").format("YYYY-MM-DDTHH:mm:ss"),
  toggleTime: (time) => {},
  timeEnd: moment().format("YYYY-MM-DDTHH:mm:ss"),
  toggleTimeEnd: (timeEnd) => {},
  authenticated: false,
  toggleAuthenticated: (isAuth) => {},
  cloud: "AWS",
  toggleCloud: (cloud: any) => {},
  themeSwitch: false,
  toggleThemeSwitch: () => {},
  getCredProfileApiState: false,
  togglegetCredProfileApiState: () => {},
  deviceTabelState: false,
  toggleDeviceTableState: () => {},
  groupState: false,
  toggleGroupState: () => {},
  getDisSchedApiState: false,
  togglegetDisSchedApiState: () => {},
  getWidgetApiState: false,
  toggleWidgetApiState: () => {},
  getTableApiState: false,
  togglegetTableApiState: () => {},
  getPolicyApiState: false,
  togglegetPolicyApiState: () => {},
});

export const AppContextProvider: React.FC<any> = ({ children }: any) => {
  const [state, setState] = useState(false);
  const [groupState, setgroupState] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [estimateCalc, setEstimateCalc] = useState(false);
  const [cloud, setCloud] = useState("AWS");
  const [getDisSchedApiState, setGetDisSchedApiState] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarClick, setSidebarClick] = useState(false);
  const [themeSwitch, setThemeSwitch] = useState(false);
  const [deviceTabelState, setDevieTabelState] = useState(false);
  const [getCredProfileApiState, setGetCredProfileApiState] = useState(false);
  const [getWidgetApiState, setGetWidgetApiState] = useState(false);
  const [getTableApiState, setGetTableApiState] = useState(false);
  const [getPolicyApiState, setGetPolicyApiState] = useState(false);

  const togglegetTableApiState = () => {
    setGetTableApiState((prevState) => !prevState);
  };

  const toggleSideBarClickState = () => {
    setSidebarClick((prevState) => !prevState);
  };
  const toggleSideBarState = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  const toggleSideBarStateWithArgu = (state: any) => {
    setSidebarOpen(state);
  };
  const toggleThemeSwitch = () => {
    setThemeSwitch((prevState) => !prevState);
  };

  const toggleDeviceTableState = () => {
    setDevieTabelState((prevState) => !prevState);
  };
  const toggleState = () => {
    setState(!state);
  };
  const togglegetDisSchedApiState = () => {
    setGetDisSchedApiState((prevState) => !prevState);
  };
  const toggleGroupState = () => {
    setgroupState(!groupState);
  };
  const toggleAuthenticated = (isAuth: any) => {
    // console.log('dskjjk')
    setAuthenticated(isAuth);
  };
  // console.log("jhejfehjh")
  const toggleEstimateCalc = () => {
    setEstimateCalc((prevState) => !prevState);
  };
  const togglegetCredProfileApiState = () => {
    setGetCredProfileApiState((prevState) => !prevState);
  };

  const togglegetPolicyApiState = () => {
    setGetPolicyApiState((prevState) => !prevState);
  };

  const [time, setTime] = useState(
    moment().subtract(90, "day").format("YYYY-MM-DD")
  );

  const [timeEnd, setTimeEnd] = useState(moment().format("YYYY-MM-DD"));

  const toggleTime = (time: any) => {
    setTime(time);
  };

  const toggleTimeEnd = (timeEnd: any) => {
    setTimeEnd(timeEnd);
  };
  // console.log("est in app",estimateCalc)
  const toggleCloud = (cloud: any) => {
    setCloud(cloud);
  };
  const toggleWidgetApiState = () => {
    setGetWidgetApiState((prevState) => !prevState);
  };
  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSideBarState,
        sidebarClick,
        toggleSideBarClickState,
        state,
        toggleState,
        estimateCalc,
        toggleEstimateCalc,
        time,
        toggleTime,
        getDisSchedApiState,
        togglegetDisSchedApiState,
        timeEnd,
        toggleTimeEnd,
        authenticated,
        toggleAuthenticated,
        cloud,
        toggleCloud,
        themeSwitch,
        toggleThemeSwitch,
        getCredProfileApiState,
        togglegetCredProfileApiState,
        deviceTabelState,
        toggleDeviceTableState,
        groupState,
        toggleGroupState,
        getWidgetApiState,
        toggleWidgetApiState,
        getTableApiState,
        togglegetTableApiState,
        togglegetPolicyApiState,
        getPolicyApiState,
        toggleSideBarStateWithArgu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
export default function fun() {
  return null;
}
