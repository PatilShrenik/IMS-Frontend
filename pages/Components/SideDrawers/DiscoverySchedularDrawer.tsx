import React, { useState, useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Bounce, toast } from "react-toastify";
import Button from "@mui/material/Button";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { createDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import { CustomProvider, DatePicker, DateRangePicker } from "rsuite";
import { replaceUnderscoresWithDots } from "@/functions/genericFunctions";
import CustomeInput, { DateInput } from "../Inputs";
import { ButtonGroup } from "@mui/material";
import { CustomeCancelButton, SubmitButton } from "../Buttons";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
import SingleSelect from "../Selects";
import "rsuite/dist/rsuite.min.css";
import { useAppContext } from "../AppContext";
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "60%",
  },
}));

const initialState = {
  entities: [""],
  entity_type: "DEVICE",
  name: "",
  email: [""],

  scheduler_context: {
    scheduled_times: [""],
    cron: "",
    start_date: "",
    frequency: "CUSTOME",
  },
};
const DiscoverySchedularDrawer = (props: any) => {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();
  const [selection, setSelection] = React.useState("DEVICE");
  const [frequency, setFrequency] = React.useState("CUSTOME");
  const [timeArray, setTimeArray] = React.useState<any>([]);
  const [change, setChange] = React.useState(true);
  const { themeSwitch, togglegetDisSchedApiState } = useAppContext();
  const [data, setData] = React.useState<any>(initialState);
  const [activeButton, setActiveButton] = React.useState<string | null>(
    "DEVICE"
  );
  const [frequencyButton, setFrequencyButton] = React.useState<string | null>(
    "CUSTOME"
  );

  const isBrowser = typeof window !== "undefined";
  const [colorTheme, setColorTheme] = useState<any>(
    isBrowser ? localStorage.getItem("color-theme") : null
  );

  const [allGroups, setAllGroups] = React.useState([]);
  const [allDevices, setAllDevices] = React.useState([]);
  const daysOfWeek = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];
  useEffect(() => {
    // const handleStorageChange = () => {
    console.log("Storage change detected");
    const newColorTheme = localStorage.getItem("color-theme");
    console.log("New color theme:", newColorTheme);
    setColorTheme(newColorTheme);
    // };
    // handleStorageChange();
  }, [themeSwitch]);

  const generateTimeArray = () => {
    const times = [];

    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 5) {
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const time = `${formattedHours}:${formattedMinutes}`;
        times.push(time);
      }
    }

    return times;
  };
  const datesOfMonth = Array.from({ length: 31 }, (_, index) => ({
    label: index + 1,
    value: (index + 1).toString(),
  }));
  React.useEffect(() => {
    if (open == false) {
      setData({
        entities: [""],
        entity_type: "DEVICE",
        name: "",
        email: [""],
        // message: "",
        scheduler_context: {
          scheduled_times: [""],
          cron: "",
          start_date: "",
          frequency: "CUSTOME",
        },
      });
      setActiveButton("DEVICE");
      setSelection("DEVICE");
      setFrequencyButton("CUSTOME");
      setFrequency("CUSTOME")
    }
  }, [open]);

  const groupValues = allGroups.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
  const deviceValues = allDevices.map((item: any) => ({
    label: item.hostname,
    value: item._id,
  }));

  React.useEffect(() => {
    const time = generateTimeArray();
    const transformedArray = time.map((time) => ({
      value: time,
      label: time,
    }));

    setTimeArray(transformedArray);
    const getGroups = async () => {
      let response = await getAllGropus();
      setAllGroups(response.result);
    };
    getGroups();
    const getDevices = async () => {
      let response = await getAllDevice();
      setAllDevices(response.result);
    };
    getDevices();
  }, [open]);

  // console.log("group", groupValues);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    // console.log("first",data);
  };
  const handleEmailChange = (event: any) => {
    const newEmailValue = event.target.value;
    const emailArray = newEmailValue.split(",");

    setData((prevData: any) => ({
      ...prevData,
      email: emailArray,
    }));
  };
  React.useEffect(() => {
    console.log("useeffect");
    setData({
      ...data,
      entities: [],
    });
  }, [change]);
  const handleButtonClick = (value: any) => {
    setChange(!change);
    setSelection(value);
    setActiveButton(value);
    setData({ ...data, entity_type: value, entities: [] });
  };
  const handleFrequencyClick = (value: any) => {
    setFrequency(value);
    if (value === "WEEKLY") {
      setData((prevState: any) => {
        const { days_of_month, ...restSchedulerContext } =
          prevState.scheduler_context;

        const updatedSchedulerContext = {
          ...restSchedulerContext,
          days_of_week: "",
        };

        return {
          ...prevState,
          scheduler_context: updatedSchedulerContext,
        };
      });
    } else if (value === "MONTHLY") {
      setData((prevState: any) => {
        const { days_of_week, ...restSchedulerContext } =
          prevState.scheduler_context;

        const updatedSchedulerContext = {
          ...restSchedulerContext,
          days_of_month: "",
        };

        return {
          ...prevState,
          scheduler_context: updatedSchedulerContext,
        };
      });
      
    } 

    console.log("=====", data);
    setFrequencyButton(value);
    setData((prevSnmpObject: any) => ({
      ...prevSnmpObject,
      scheduler_context: {
        ...prevSnmpObject.scheduler_context,
        frequency: value,
      },
    }));
  };

  const handleDeviceEntities = (values: any) => {
    setData({
      ...data,
      entities: values,
    });
  };
  const handleGroupEntities = (values: any) => {
    setData({
      ...data,
      entities: values,
    });
  };

  const handleFrequency = (values: any) => {
    setData((prevSnmpObject: any) => ({
      ...prevSnmpObject,
      scheduler_context: {
        ...prevSnmpObject.scheduler_context,
        scheduled_times: values,
      },
    }));
  };

  const handleWeeklyFrequency = (values: any) => {
    setData((prevSnmpObject: any) => ({
      ...prevSnmpObject,
      scheduler_context: {
        ...prevSnmpObject.scheduler_context,
        days_of_week: values,
      },
    }));
  };

  const handleMonthlyFrequency = (values: any) => {
    setData((prevSnmpObject: any) => ({
      ...prevSnmpObject,
      scheduler_context: {
        ...prevSnmpObject.scheduler_context,
        days_of_month: values,
      },
    }));
  };

  const handleCronChange = (event: any) => {
    const { value } = event.target;
    setData((prevData: any) => ({
      ...prevData,
      scheduler_context: {
        ...prevData.scheduler_context,
        cron: value,
        //frequency: "CUSTOME",
      },
    }));
    console.log("date", data);
  };

  const handleDate = (values: any) => {
    const date = new Date(values);
    const epochTime = date.getTime() / 1000; 
    console.log("date------------",epochTime);
    setData((prevSnmpObject: any) => ({
      ...prevSnmpObject,
      scheduler_context: {
        ...prevSnmpObject.scheduler_context,
        start_date: epochTime,
      },
    }));
    // console.log("date",data);
  };

  const handleSave = (event: any) => {
    event.preventDefault();
    const modifiedData = replaceUnderscoresWithDots(data);
    const entitiesArray = Object.values(modifiedData.entities);
    modifiedData.entities = entitiesArray;
    
    const emailArray = Object.values(modifiedData.email);
    modifiedData.email = emailArray;
    console.log("======  mod", modifiedData);
   
    const createDiscovery = async () => {
      let response = await createDiscoverySch(modifiedData);
      console.log(response);
      if (response.status == "success") {
        togglegetDisSchedApiState();
        handleDrawerClose();
        toast.success(response.status, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    };
    createDiscovery();
    try {
    } catch (error) {
      console.log(error);
    }
    handleDrawerClose();
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      variant="temporary"
      classes={{ paper: classes.drawer }}
      className={`shadow-sm shadow-dark-container w-full overflow-y-auto ${classes.drawer}`}
    >
      <div className="h-full bg-white dark:bg-dark-menu-color px-4 overflow-y-auto">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">
            {" "}
            Add Discovery Scheduler{" "}
          </p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <form onSubmit={handleSave} >
          <div className="flex flex-col">
            <div className="mt-4">
              <CustomeInput
                label="Schedular Name"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                type="text"
                disable={false}
                require={true}
              />
            </div>

            <div className="grid grid-flow-row-dense grid-cols-3 ">
              <Box>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  className="my-4 mx-4"
                >
                  <Button
                    className={`dark:text-textColor border-primary2 px-[2.75rem] py-2.5 rounded-lg ${
                      activeButton == "DEVICE" &&
                      "bg-primary2 hover:bg-primary2 text-white"
                    }`}
                    onClick={() => {
                      handleButtonClick("DEVICE");
                    }}
                    // style={{
                    //   width: "120px",
                    //   backgroundColor:
                    //     activeButton === "DEVICE" ? "#0078d4" : "",

                    //   color: activeButton === "DEVICE" ? "white" : "",
                    // }}
                  >
                    Device
                  </Button>
                  <Button
                    className={`dark:text-textColor border-primary2 px-[2.75rem] rounded-lg ${
                      activeButton == "GROUP" &&
                      "bg-primary2 hover:bg-primary2 text-white"
                    }`}
                    onClick={() => {
                      handleButtonClick("GROUP");
                    }}
                    // style={{
                    //   width: "120px",
                    //   backgroundColor:
                    //     activeButton === "GROUP" ? "#0078d4" : "",
                    //   color: activeButton === "GROUP" ? "white" : "",
                    // }}
                  >
                    Group
                  </Button>
                </ButtonGroup>
              </Box>
              <div className="">
                {selection == "DEVICE" ? (
                  <SingleSelect
                    label="Select Devices"
                    isMulti={true}
                    change={change}
                    title="Select Devices"
                    selectData={deviceValues}
                    onChange={handleDeviceEntities}
                    require={true}
                  />
                ) : (
                  <SingleSelect
                    label="Select Groups"
                    isMulti={true}
                    change={change}
                    title="Select Groups"
                    selectData={groupValues}
                    onChange={handleGroupEntities}
                    require={true}
                  />
                )}
              </div>
            </div>

            <div>
              <h5 className="mx-4 mt-2 font-normal dark:text-textColor">
                Notify To
              </h5>
              <CustomeInput
                label="Emails"
                name="email"
                value={data && data.email.join(",")}
                onChange={handleEmailChange}
                type="email"
                disable={false}
              />
            </div>
            {/* <div>
              <i>{`Note :- Enter email's in comma(,) seperated  formate.`}</i>
            </div> */}
            {/* </div> */}
            {/* <CustomeInput
                label="Send Message to"
                name="message"
                value={data.message}
                onChange={handleInputChange}
                type="text"
                disable={false}
              /> */}
            {/* </div> */}
            <div className="mx-4 py-2">
              <h5 className="mb-4 font-normal dark:text-textColor">Schedule</h5>
              <CustomProvider theme="dark">
                <DatePicker 
                onChange={handleDate}
                  // showOneCalendar
                  appearance="subtle"
                  style={{
                    // margin: "1rem 1rem",
                    width: "18rem",
                    height: "max-content",
                    border:
                      colorTheme == "light"
                        ? "1px solid #e5e7eb"
                        : "1px solid #ccc",
                    padding: ".4rem",
                  }}
                  placeholder="Select Date Range"
                  
                  className="rounded-lg  dark:hover:bg-transparent dark:text-textColor dark:bg-dark-menu-color z-50"
                />
              </CustomProvider>
              {/* <DateInput label="Start Date" onChange={handleDate} /> */}
            </div>
            <div className="flex items-center">
              <Box>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  className="my-5 ml-4 mr-7"
                >
                  <Button
                    className={`dark:text-textColor border-primary2 px-[5px] py-2.5 rounded-lg ${
                      frequencyButton == "CUSTOME" &&
                      "bg-primary2 hover:bg-primary2 text-white"
                    }`}
                    onClick={() => handleFrequencyClick("CUSTOME")}
                    // style={{
                    //   backgroundColor:
                    //     frequencyButton === "CUSTOME" ? "#0078d4" : "",
                    //   color: frequencyButton === "CUSTOME" ? "white" : "",
                    // }}
                  >
                    Custom
                  </Button>
                  <Button
                    className={`dark:text-textColor border-primary2 px-[5px] py-2.5 rounded-lg ${
                      frequencyButton == "DAILY" &&
                      "bg-primary2 hover:bg-primary2 text-white"
                    }`}
                    onClick={() => handleFrequencyClick("DAILY")}
                  >
                    Daily
                  </Button>
                  <Button
                    className={`dark:text-textColor border-primary2 px-[5px] py-2.5 rounded-lg ${
                      frequencyButton == "WEEKLY" &&
                      "bg-primary2 hover:bg-primary2 text-white"
                    }`}
                    onClick={() => handleFrequencyClick("WEEKLY")}
                  >
                    Weekly
                  </Button>
                  <Button
                    className={`dark:text-textColor border-primary2 px-[5px] py-2.5 rounded-lg ${
                      frequencyButton == "MONTHLY" &&
                      "bg-primary2 hover:bg-primary2 text-white"
                    }`}
                    onClick={() => handleFrequencyClick("MONTHLY")}
                  >
                    Monthly
                  </Button>
                </ButtonGroup>
              </Box>
              {frequency == "CUSTOME" ? (
                <CustomeInput
                  label="Cron Value"
                  name="cron"
                  value={data.scheduler_context.cron}
                  onChange={handleCronChange}
                  type="text"
                  disable={false}
                />
              ) : frequency == "DAILY" ? (
                <SingleSelect
                  label="Select Hours"
                  isMulti={true}
                  width={150}
                  selectData={timeArray}
                  onChange={handleFrequency}
                />
              ) : frequency == "WEEKLY" ? (
                <>
                  <SingleSelect
                    label="Select Days"
                    isMulti={true}
                    width={150}
                    selectData={daysOfWeek}
                    onChange={handleWeeklyFrequency}
                  />
                  <SingleSelect
                    label="Select Hours"
                    isMulti={true}
                    width={150}
                    selectData={timeArray}
                    onChange={handleFrequency}
                  />
                </>
              ) : frequency == "MONTHLY" ? (
                <>
                  <SingleSelect
                    label="Select Dates"
                    isMulti={true}
                    width={150}
                    selectData={datesOfMonth}
                    onChange={handleMonthlyFrequency}
                  />
                  <SingleSelect
                    label="Select Hours"
                    isMulti={true}
                    width={150}
                    selectData={timeArray}
                    onChange={handleFrequency}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="fixed bottom-0 right-0 p-2 flex justify-end mt-6">
            <div>
              {/* <SubmitButton title="Save" /> */}
              <button
                className=" mx-2 inline-flex items-center justify-center rounded-md py-1 px-6 text-center font-medium text-white bg-primary2 hover:bg-opacity-90 lg:px-6 xl:px-6 cursor-pointer"
                type="submit"
              >
                Save
              </button>
            </div>
            <div onClick={handleDrawerClose}>
              <CustomeCancelButton title="Cancel" />
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default DiscoverySchedularDrawer;