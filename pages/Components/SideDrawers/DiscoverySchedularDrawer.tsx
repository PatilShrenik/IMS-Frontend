import React, { useState, useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Bounce, toast } from "react-toastify";
import Button from "@mui/material/Button";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { createDiscoverySch } from "@/pages/api/api/DiscoveryScheduleAPI";
import { CustomProvider, DatePicker, DateRangePicker } from "rsuite";
import {
  replaceUnderscoresWithDots,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import CustomeInput, { DateInput } from "../Inputs";
import { ButtonGroup } from "@mui/material";
import { CustomeCancelButton, SubmitButton } from "../Buttons";
import { getAllGropus } from "@/pages/api/api/GroupsAPI";
import { getAllDevice } from "@/pages/api/api/DeviceManagementAPI";
import SingleSelect from "../Selects";
import "rsuite/dist/rsuite.min.css";
import { useAppContext } from "../AppContext";
import { Chip, TextField } from "@material-ui/core";
import { CustomChip } from "../Chips";
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
    days_of_week: [""],
    days_of_month: [""],
    cron: "",
    start_date: 0,
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
  const [errorKeys, setErrorKeys] = React.useState<any>([]);
  const [errors, setErrors] = React.useState<any>({});

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
    const newColorTheme = localStorage.getItem("color-theme");
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
          days_of_week: [""],
          days_of_month: [""],
          cron: "",
          start_date: 0,
          frequency: "CUSTOME",
        },
      });
      setEmails([]);
      setNewEmail("");
      setActiveButton("DEVICE");
      setSelection("DEVICE");
      setFrequencyButton("CUSTOME");
      setFrequency("CUSTOME");
      setErrorKeys([]);
    }
  }, [open]);

  const [newEmail, setNewEmail] = useState("");
  const [emails, setEmails] = useState<any[]>(
    data.email.filter((email: string) => email !== "")
  );
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      addEmail();
    }
  };

  const addEmail = () => {
    if (newEmail.trim() !== "" && newEmail.includes("@")) {
      const updatedEmails = [...emails, newEmail.trim()];
      setData({ ...data, email: updatedEmails });
      setEmails(updatedEmails);
      setNewEmail("");
    }
  };

  const handleDelete = (index: number) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setData({ ...data, email: updatedEmails });
    setEmails(updatedEmails);
  };

  const groupValues =
    allGroups &&
    allGroups.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  const deviceValues =
    allDevices &&
    allDevices.map((item: any) => ({
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
  }, []);

  // console.log("group", groupValues);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    // console.log("first",data);
  };
  // const handleEmailChange = (event: any) => {
  //   const newEmailValue = event.target.value;
  //   const emailArray = newEmailValue.split(",");
  //  // const emailArray = newEmailValue.split(",").map(email => email.trim());
  //   setData((prevData: any) => ({
  //     ...prevData,
  //     email: emailArray,
  //   }));
  // };

  const handleButtonClick = (value: any) => {
    console.log("but click", value);
    setSelection(value);
    setActiveButton(value);
    setData((prevData: any) => ({
      ...prevData,
      entity_type: value,
      entities: [], // Ensure entities are being set to an empty array
    }));
  };

  // console.log("data-----",data)
  const handleFrequencyClick = (value: any) => {
    setFrequency(value);
    // if (value === "WEEKLY") {
    //   setData((prevState: any) => {
    //     const { days_of_month, ...restSchedulerContext } =
    //       prevState.scheduler_context;

    //     const updatedSchedulerContext = {
    //       ...restSchedulerContext,
    //       days_of_week: "",
    //     };

    //     return {
    //       ...prevState,
    //       scheduler_context: updatedSchedulerContext,
    //     };
    //   });
    // } else if (value === "MONTHLY") {
    //   setData((prevState: any) => {
    //     const { days_of_week, ...restSchedulerContext } =
    //       prevState.scheduler_context;

    //     const updatedSchedulerContext = {
    //       ...restSchedulerContext,
    //       days_of_month: "",
    //     };

    //     return {
    //       ...prevState,
    //       scheduler_context: updatedSchedulerContext,
    //     };
    //   });
    // }

    setFrequencyButton(value);
    setData((prevSnmpObject: any) => ({
      ...prevSnmpObject,
      scheduler_context: {
        ...prevSnmpObject.scheduler_context,
        frequency: value,
        scheduled_times: [], // Reset selected times
        days_of_week: [], // Reset selected days of week
        days_of_month: [], // Reset selected days of month
        cron: "", // Reset cron value
      },
    }));
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
    // console.log("date", data);
  };

  // const handleDate = (event: any) => {
  //   let updatedPayload: any = { ...data };

  //   if (event.label !== "custom") {
  //     delete updatedPayload.start_timestamp;
  //     delete updatedPayload.end_timestamp;
  //     updatedPayload = {
  //       ...updatedPayload,
  //       time_range: event.text,
  //     };
  //   } else {
  //     const startdate = event && event.value && new Date( event.value[0]);
  //     const startepochTime = startdate && startdate.getTime() / 1000;
  //     const enddate = event && event.value && new Date(event.value[1]);
  //     const endepochTime = enddate && enddate.getTime() / 1000;
  //     updatedPayload = {
  //       ...updatedPayload,
  //       time_range: event.text,
  //       start_timestamp: startepochTime,
  //       end_timestamp: endepochTime,
  //     };
  //   }
  //   setData(updatedPayload);
  // };
  const handleDate = (values: any) => {
    const date = new Date(values);
    const epochTime = date.getTime() / 1000;
    // console.log("date------------", epochTime);
    setData((prevSnmpObject: any) => ({
      ...prevSnmpObject,
      scheduler_context: {
        ...prevSnmpObject.scheduler_context,
        start_date: epochTime,
      },
    }));
    // console.log("date",data);
  };

  const handleDeviceEntities = (values: any) => {
    console.log("dev", values);

    setData({
      ...data,
      entities: values,
    });
  };

  const handleGroupEntities = (values: any) => {
    console.log("grp", values);

    setData({
      ...data,
      entities: values,
    });
  };
  useEffect(() => {
    const errorKey = errors && Object.keys(errors);
    setErrorKeys(errorKey);
    // const validError = validationError && Object.keys(validationError);
    // setvalidationErrorKeys(validError);
  }, [errors]);

  const handleSave = (event: any) => {
    event.preventDefault();
    const modifiedData = replaceUnderscoresWithDots(data);
    // console.log("created", modifiedData);
    try {
      const createDiscovery = async () => {
        let response = await createDiscoverySch(modifiedData);
        console.log(modifiedData);
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
          handleDrawerClose();
        } else {
          setErrors(response.errors);
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
    } catch (error) {
      console.log(error);
    }
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
        <form onSubmit={handleSave}>
          <div className="flex flex-col">
            <div className="mt-4">
              <CustomeInput
                label="Scheduler Name"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                type="text"
                disable={false}
                require={true}
              />
              {errorKeys && errorKeys.includes("name") && (
                <p className="text-danger text-sm ml-2">
                  Scheduler Name should be unique
                </p>
              )}
            </div>

            <div className="flex ">
              <Box>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  className="my-4 mx-4 items-center"
                >
                  <Button
                    onClick={() => {
                      handleButtonClick("DEVICE");
                    }}
                    style={{
                      width: "145px",
                      backgroundColor:
                        activeButton === "DEVICE" ? "#0078d4" : "",

                      color: activeButton === "DEVICE" ? "white" : "",
                    }}
                  >
                    Device
                  </Button>
                  <Button
                    onClick={() => {
                      handleButtonClick("GROUP");
                    }}
                    style={{
                      width: "145px",
                      backgroundColor:
                        activeButton === "GROUP" ? "#0078d4" : "",
                      color: activeButton === "GROUP" ? "white" : "",
                    }}
                  >
                    Group
                  </Button>
                </ButtonGroup>
              </Box>
              <div className="px-4">
                {selection == "DEVICE" ? (
                  <SingleSelect
                    key="device-select"
                    label="Select Devices"
                    isMulti={true}
                    title="Select Devices"
                    selectData={deviceValues}
                    onChange={handleDeviceEntities}
                    require={true}
                  />
                ) : (
                  <SingleSelect
                    key="group-select"
                    label="Select Groups"
                    isMulti={true}
                    title="Select Groups"
                    selectData={groupValues}
                    onChange={handleGroupEntities}
                    require={true}
                  />
                )}
              </div>
            </div>

            <div>
              <h5 className="mx-4 font-normal dark:text-textColor">
                Notify To
              </h5>
              {/* <CustomeInput
                label="Email"
                name="email"
                value={data && data.email.join(",")}
                // value={data && data.email ? data.email.join(",") : ""}
                onChange={handleEmailChange}
                type="email"
                disable={false}
              /> */}
              {/* <div>
                <div style={{ marginTop: "3px" }}>
                  {emails.map((email, index) => (
                    <Chip
                      key={index}
                      label={email}
                      onDelete={() => handleDelete(index)}
                      style={{ margin: "5px" }}
                    />
                  ))}
                </div>
                <input
                  className="w-[18rem] mx-4  text-gray-400 border-[1px] rounded-lg dark:border-dark-border bg-transparent py-[0.9rem] px-2 font-medium outline-none transition focus:border-primary2 active:border-primary2 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                  // className="border border-gray-300 rounded-lg px-4 py-2 w-72 outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Emails"
                  value={newEmail}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                />
              </div> */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  className={`relative flex flex-wrap items-center mx-4 text-gray-400 border-[1px] rounded-lg dark:border-dark-border bg-transparent  px-2 font-medium outline-none transition focus:border-primary2 active:border-primary2 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input ${
                    emails.length > 0 ? "w-full" : "w-[18rem]"
                  }`}
                  style={{ minHeight: "52px" }} // Adjust the height to match the input field
                >
                  {emails.map((email, index) => (
                    <CustomChip
                      key={index}
                      label={email}
                      onDelete={() => handleDelete(index)} 
                      style={{marginRight:"6px"}}
                    />
                  ))}
                  <input
                    className="flex-grow bg-transparent outline-none px-2"
                    type="text"
                    placeholder="Emails"
                    value={newEmail}
                    onChange={handleEmailChange}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
            </div>
            <div className="mx-4 my-2 w-[18rem] dark:text-textColor">
              <i>
                Note: - Press{" "}
                <strong>space</strong> to add emails
              </i>
            </div>

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
              <h5 className="my-4 font-normal dark:text-textColor">Schedule</h5>
              {/* <TimeRangePicker
                showOneCalendar={true}
                onTimeRangeChange={handleDate}
              /> */}
              <DatePicker
                onChange={handleDate}
                // showOneCalendar
                appearance="subtle"
                placement="rightStart"
                style={{
                  // margin: "1rem 1rem",
                  width: "19rem",
                  border:
                    colorTheme == "light"
                      ? "1px solid #e5e7eb"
                      : "1px solid #ccc",
                  padding: ".4rem",
                }}
                placeholder="Select Date"
                format="yyyy-MM-dd"
                className="rounded-lg  dark:hover:bg-transparent dark:text-textColor dark:bg-dark-menu-color z-50"
              />
            </div>
            <div className="flex items-center">
              <Box>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  className="my-5 ml-4 mr-7"
                >
                  <Button
                    // className={`dark:text-textColor border-primary2 px-[5px] py-2.5 rounded-lg ${
                    //   frequencyButton == "CUSTOME" &&
                    //   "bg-primary2 hover:bg-primary2 text-white"
                    // }`}
                    onClick={() => handleFrequencyClick("CUSTOME")}
                    style={{
                      width: "75px",
                      backgroundColor:
                        frequencyButton === "CUSTOME" ? "#0078d4" : "",
                      color: frequencyButton === "CUSTOME" ? "white" : "",
                    }}
                  >
                    Custom
                  </Button>
                  <Button
                    // className={`dark:text-textColor border-primary2 px-[5px] py-2.5 rounded-lg ${
                    //   frequencyButton == "DAILY" &&
                    //   "bg-primary2 hover:bg-primary2 text-white"
                    // }`}
                    style={{
                      width: "65px",
                      backgroundColor:
                        frequencyButton === "DAILY" ? "#0078d4" : "",
                      color: frequencyButton === "DAILY" ? "white" : "",
                    }}
                    onClick={() => handleFrequencyClick("DAILY")}
                  >
                    Daily
                  </Button>
                  <Button
                    // className={`dark:text-textColor border-primary2 px-[5px] py-2.5 rounded-lg ${
                    //   frequencyButton == "WEEKLY" &&
                    //   "bg-primary2 hover:bg-primary2 text-white"
                    // }`}
                    style={{
                      width: "75px",
                      backgroundColor:
                        frequencyButton === "WEEKLY" ? "#0078d4" : "",
                      color: frequencyButton === "WEEKLY" ? "white" : "",
                    }}
                    onClick={() => handleFrequencyClick("WEEKLY")}
                  >
                    Weekly
                  </Button>
                  <Button
                    style={{
                      width: "85px",
                      backgroundColor:
                        frequencyButton === "MONTHLY" ? "#0078d4" : "",
                      color: frequencyButton === "MONTHLY" ? "white" : "",
                    }}
                    // className={`dark:text-textColor border-primary2 px-[5px] py-2.5 rounded-lg ${
                    //   frequencyButton == "MONTHLY" &&
                    //   "bg-primary2 hover:bg-primary2 text-white"
                    // }`}
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
                    key="weekly-select"
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
                    key="monthly-select"
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
