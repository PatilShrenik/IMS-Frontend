import React, { useEffect, useState } from 'react';
import { Box, Drawer } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Bounce, toast } from "react-toastify";
import Button from "@mui/material/Button";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CustomeInput, { DateInput } from "../Inputs";
import { ButtonGroup } from "@mui/material";
import { CustomeCancelButton } from "../Buttons";
import { useAppContext } from '../AppContext';
import { getDiscoverySchById, updateDiscSch } from '@/pages/api/api/DiscoveryScheduleAPI';
import { replaceDotsWithUnderscores, replaceUnderscoresWithDotsNested } from '@/functions/genericFunctions';
import { getAllGropus } from '@/pages/api/api/GroupsAPI';
import { getAllDevice } from '@/pages/api/api/DeviceManagementAPI';
import SingleSelect from '../Selects';
const useStyles = makeStyles(() => ({
    drawer: {
      width: "60%",
    },
  }));
const EditDiscoverySchDrawer = (props: any) => {
    const {open, handleDrawerClose ,id} = props;
    const classes = useStyles();
    const [selection, setSelection] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [timeArray, setTimeArray] = React.useState<any>([]);
  const [selectedGroupValue,setSelectedGroupValue] = React.useState<any>([]);
   const [selectedDeviceValue,setSelectedDeviceValue] = React.useState<any>([]);
  const [selectedTimeValue,setSelectedTimeValue] = React.useState<any>([]);
  const { getDisSchedApiState, togglegetDisSchedApiState } = useAppContext();
  const [data, setData] = React.useState<any>({
    entities: [""],
    entity_type: "",
    name: "",
    email: [],
   // message: "",
    scheduler_context_updated: "no",
    scheduler_context: {
      scheduled_times: [""],
      cron: "0 */2 * ? * *",
      start_date: "",
      frequency: "",
    },
  });
  const [activeButton, setActiveButton] = React.useState<string | null>(
    "DEVICE"
  );
  const [frequencyButton, setFrequencyButton] = React.useState<string | null>(
    "DAILY"
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
  //console.log("edit id----",props.rowID);
  React.useEffect(() => {
    try {
      const getDiscoveryShById = async () => {
        console.log("edit id----",id);
        let response = await getDiscoverySchById(id);
        console.log("-----", response.result);
        const modifiedData = replaceDotsWithUnderscores(
          response.result
        );

        const entitiesArray =
          modifiedData && Object.values(modifiedData.entities || {});
        modifiedData.entities = entitiesArray;
    
        const emailArray =
          modifiedData && Object.values(modifiedData.email || {});
        modifiedData.email = emailArray;


        setData(modifiedData);
        // setUpdatedData(modifiedData);
        console.log("edit data--",data);
        setActiveButton(modifiedData.entity_type);
        setFrequencyButton(modifiedData.scheduler_context?.frequency);
        setFrequency(modifiedData.scheduler_context?.frequency);
      };
      getDiscoveryShById();
    } catch (error) {
      console.log(error);
    }
  }, [id]);
 // console.log("dataaa", data);

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
    id: index + 1,
    name: (index + 1).toString(),
  }));
  React.useEffect(() => {
    const time = generateTimeArray();
    const transformedArray = time.map((time) => ({
      value: time,
      label: time,
    }));
    setTimeArray(transformedArray);
    console.log("timearray", timeArray)
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
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const handleEmailChange = (event: any) => {
    const newEmailValue = event.target.value;
    const emailArray = newEmailValue.split(",");

    setData((prevData: any) => ({
      ...prevData,
      email: emailArray,
    }));
  };
  const handleButtonClick = (value: any) => {
    setSelection(value);
    setActiveButton(value);
    setData({ ...data, entity_type: value });
  };

  const handleEntities = (values: any) => {
    // console.log(values);
    setData({
      ...data,
      entities: values,
    });
  };

  useEffect(() => {
    if (data && data.entity_type === "DEVICE") {
      setSelectedDeviceValue(data.entities);     
    }
    if (data && data.entity_type === "GROUP") {
      setSelectedGroupValue(data.entities);     
    }
    if (data && data.scheduler_context){
      setSelectedTimeValue(data.scheduler_context.scheduled_times);
     // console.log("selectedTimeValue",data.scheduler_context.scheduled_times)
    }
  }, [data]);


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
      },
    }));
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
  const groupValues = allGroups.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
  const deviceValues = allDevices.map((item: any) => ({
    label: item.hostname,
    value: item._id,
  }));

  const timeValues = timeArray.map((time: any) => ({
    value: time,
    label: time,
  }));
  const handleDate = (values: any) => {
    setData((prevSnmpObject: any) => ({
      ...prevSnmpObject,
      scheduler_context: {
        ...prevSnmpObject.scheduler_context,
        start_date: values,
      },
    }));
  };
  const handleSave = async (event: any) => {
    event.preventDefault();
    const modifiedData = replaceUnderscoresWithDotsNested(data);
    const entitiesArray = Object.values(modifiedData.entities);
    modifiedData.entities = entitiesArray;
     console.log("======", modifiedData);
     let response = await updateDiscSch(modifiedData,id);
     // console.log("updated", response);
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



  return (
    <Drawer
      // hideBackdrop = {false}temporary
      anchor="right"
      open={props.open}
      // transitionDuration
      // className={classes.drawer}
      variant="temporary"
      classes={{ paper: classes.drawer }}
      className="shadow-sm shadow-dark-container w-full overflow-y-auto"
    >
      <div className="h-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">
            {" "}
            Edit Discovery Schedular{" "}
          </p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>

        <form onSubmit={handleSave} method="POST">
          <div className="flex flex-col">
            <div className="grid grid-flow-row-dense grid-cols-3 my-2">
              <Box>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  className="my-5 mx-5 "
                >
                  <Button
                    onClick={() => {
                      handleButtonClick("DEVICE");
                    }}
                    style={{
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
                      backgroundColor:
                        activeButton === "GROUP" ? "#0078d4" : "",
                      color: activeButton === "GROUP" ? "white" : "",
                    }}
                  >
                    Group
                  </Button>
                </ButtonGroup>
              </Box>
              {selection == "DEVICE" ? (
                <SingleSelect
                  label="Select Devices"
                  isMulti={true}
                  value={deviceValues.filter(option => selectedDeviceValue.includes(option.value))}
                  selectData={deviceValues}
                  onChange={handleEntities}
                />
              ) : (
                <SingleSelect
                label="Select Groups"
                isMulti={true}
                  // value={groupValues.find(
                  //   (option) => option.value === selectedValue
                  // )}

                  value={groupValues.filter(option => selectedGroupValue.includes(option.value))}
                  selectData={groupValues}
                  onChange={handleEntities}
                />
              )}
            </div>

            <CustomeInput
              label="Scheduler Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              type="text"
              disable={false}
            />

            <div>
              <h5 className="m-4 font-normal dark:text-textColor">
                Notify To
              </h5>
              <CustomeInput
                className="w-[36rem]"
                label="Email"
                name="email"
                value={data.email.join(",")}
                onChange={handleEmailChange}
                type="email"
                disable={false}
              />
            </div>
            {/* <div>
              <i>{`Note :- Enter email's in comma(,) seperated  formate.`}</i>
            </div> */}
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
              <h5 className="mb-4 font-normal dark:text-textColor">
                Schedule
              </h5>
              <DateInput label="Start Date" onChange={handleDate} />
            </div>
            <div className="flex">
            <Box>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  className="my-5 mx-4"
                >
                  <Button
                    onClick={() => handleFrequencyClick("CUSTOME")}
                    style={{
                      backgroundColor:
                        frequencyButton === "CUSTOME" ? "#0078d4" : "",
                      color: frequencyButton === "CUSTOME" ? "white" : "",
                    }}
                  >
                    Custome
                  </Button>
                  <Button
                    onClick={() => handleFrequencyClick("DAILY")}
                    style={{
                      backgroundColor:
                        frequencyButton === "DAILY" ? "#0078d4" : "",
                      color: frequencyButton === "DAILY" ? "white" : "",
                    }}
                  >
                    Daily
                  </Button>
                  <Button
                    onClick={() => handleFrequencyClick("WEEKLY")}
                    style={{
                      backgroundColor:
                        frequencyButton === "WEEKLY" ? "#0078d4" : "",
                      color: frequencyButton === "WEEKLY" ? "white" : "",
                    }}
                  >
                    Weekly
                  </Button>
                  <Button
                    onClick={() => handleFrequencyClick("MONTHLY")}
                    style={{
                      backgroundColor:
                        frequencyButton === "MONTHLY" ? "#0078d4" : "",
                      color: frequencyButton === "MONTHLY" ? "white" : "",
                    }}
                  >
                    Monthly
                  </Button>
                </ButtonGroup>
              </Box>
              {frequency == "CUSTOME" ? (
                <CustomeInput
                  label="Custome Value"
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
                   value={timeValues.filter((option: { value: any; }) => selectedTimeValue[option.value])}
                  selectData={timeArray}
                  apiData={[""]}
                  onChange={handleFrequency}
                />
              ) : frequency == "WEEKLY" ? (
                <>
                  <SingleSelect
                    label="Select Hours"
                    isMulti={true}
                    width={150}
                    selectData={timeArray}
                    apiData={[""]}
                    onChange={handleFrequency}
                  />
                  <SingleSelect
                    label="Select Days"
                    isMulti={true}
                    width={150}
                    selectData={daysOfWeek}
                    apiData={[""]}
                    onChange={handleWeeklyFrequency}
                  />
                </>
              ) : frequency == "MONTHLY" ? (
                <>
                  <SingleSelect
                    label="Select Hours"
                    isMulti={true}
                    width={150}
                    selectData={timeArray}
                    apiData={[""]}
                    onChange={handleFrequency}
                  />
                  <SingleSelect
                    label="Select Dates"
                    isMulti={true}
                    width={150}
                    selectData={datesOfMonth}
                    apiData={[""]}
                    onChange={handleMonthlyFrequency}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" fixed bottom-0 right-0 p-2 flex justify-end mt-6">
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
}

export default EditDiscoverySchDrawer