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
import SingleSelect from "../Selects";
import "rsuite/dist/rsuite.min.css";
import { useAppContext } from "../AppContext";
import { addSNMPCatalog } from "@/pages/api/api/SNMPCatalogueAPI";
import { getSNMPTemp } from "@/pages/api/api/SNMPTemplateAPI";
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "65%",
  },
}));
const SNMPCatalogueDrawer = (props: any) => {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();
  const [tempData, setTempData] = React.useState([]);
  const { themeSwitch, toggleGetSNMPCatApiState } = useAppContext();
  const [data, setData] = React.useState<any>({
    vendor: "",
    model: "",
    os: "",
    system_oid: "",
    snmp_template: null,
  });

  const tempValues = tempData && tempData.map((item: any) => ({
    label: item._id,
    value: item._id,
  }));

  console.log("tempData", tempData);
  React.useEffect(() => {
    try {
      const gettemp = async () => {
        let response = await getSNMPTemp();
        console.log("temp", response.result);
        setTempData(response.result);
      };
      gettemp();
    } catch (error) {
      console.log(error);
    }
  }, []);
  React.useEffect(() => {
    if (open == false) {
      setData({
        vendor: "",
        model: "",
        os: "",
        system_oid: "",
        snmp_template: null,
      });
    }
  }, [open]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleTemp = (value: any) => {
    setData({
      ...data,
      snmp_template: value,
    });
  };

  const handleSave = (event: any) => {
    event.preventDefault();
    const modifiedData = replaceUnderscoresWithDots(data);
    console.log("===", modifiedData);
    const createSNMPC = async () => {
      let response = await addSNMPCatalog(modifiedData);
      console.log(response);
      if (response.status == "success") {
        toggleGetSNMPCatApiState();
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
    createSNMPC();
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
          <p className="text-primary2 font-semibold"> Add SNMP Catalogue </p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <form onSubmit={handleSave} method="POST">
          <div className="flex  my-5">
            <CustomeInput
              label="Enter Vendor"
              name="vendor"
              value={data.vendor}
              onChange={handleInputChange}
              type="text"
              disable={false}
            />
            <CustomeInput
              label="Enter Model"
              name="model"
              value={data.model}
              onChange={handleInputChange}
              type="text"
              disable={false}
            />
            <CustomeInput
              label="Enter OS"
              name="os"
              value={data.os}
              onChange={handleInputChange}
              type="text"
              disable={false}
            />
          </div>
          <div className="flex">
            <CustomeInput
              label="Enter Syatem OID"
              name="system_oid"
              value={data.system_oid}
              onChange={handleInputChange}
              type="text"
              disable={false}
            />
            <SingleSelect
              label="Select SNMP Template"
            //   value ={ data.snmp_template && data.snmp_template}
              selectData={tempValues}
              onChange={handleTemp}
            />
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

export default SNMPCatalogueDrawer;
