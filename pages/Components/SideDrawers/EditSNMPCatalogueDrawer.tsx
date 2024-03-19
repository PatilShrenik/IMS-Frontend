import React, { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Bounce, toast } from "react-toastify";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CustomeInput, { DateInput } from "../Inputs";

import { CustomeCancelButton } from "../Buttons";
import { useAppContext } from "../AppContext";
import "rsuite/dist/rsuite.min.css";

import {
  replaceDotsWithUnderscores,
  replaceUnderscoresWithDots,
  replaceUnderscoresWithDotsNested,
} from "@/functions/genericFunctions";
import SingleSelect from "../Selects";
import {
  getSNMPCatalogById,
  updateSNMPCatalog,
} from "@/pages/api/api/SNMPCatalogueAPI";
import { getAllSNMPTemp } from "@/pages/api/api/SNMPTemplateAPI";
const useStyles = makeStyles(() => ({
  drawer: {
    width: "65%",
  },
}));

const EditSNMPCatalogueDrawer = (props: any) => {
  const { open, handleDrawerClose, id } = props;
  const classes = useStyles();
  const [tempData, setTempData] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState<any>([]);
  const { themeSwitch, toggleGetSNMPCatApiState } = useAppContext();

  const [data, setData] = React.useState<any>({
    vendor: "",
    model: "",
    os: "",
    system_oid: "",
    snmp_template: null,
  });
  const tempValues =
    tempData &&
    tempData.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  React.useEffect(() => {
    try {
      const gettemp = async () => {
        let response = await getAllSNMPTemp();
        console.log("temp", response.result);
        setTempData(response.result);
      };
      gettemp();
    } catch (error) {
      console.log(error);
    }
  }, []);
  React.useEffect(() => {
    if (open) {
      try {
        const getDiscoveryShById = async () => {
          console.log("edit id----", id);
          let response = await getSNMPCatalogById(id);
          console.log("-----DD", response.result);
          const modifiedData = replaceDotsWithUnderscores(response.result);
          setData(modifiedData);
        };
        getDiscoveryShById();
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, open]);

  useEffect(() => {
    if (data && data.snmp_template) {
      setSelectedValue(data.snmp_template);
    }
  }, [data]);
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

  const handleSave = async (event: any) => {
    event.preventDefault();
    const modifiedData = replaceUnderscoresWithDotsNested(data);
    console.log("======", modifiedData);
    let response = await updateSNMPCatalog(modifiedData, id);
    // console.log("updated", response);
    if (response.status == "success") {
      toggleGetSNMPCatApiState();
    
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
    handleDrawerClose();
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
      className={`shadow-sm shadow-dark-container w-full overflow-y-auto ${classes.drawer}`}
    >
      <div className="h-full bg-white dark:bg-dark-menu-color px-4">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold"> Edit SNMP Catalogue </p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <form onSubmit={handleSave} method="POST">
          <div className="flex my-5">
            <CustomeInput
              label="Enter Vendor"
              name="vendor"
              value={data.vendor}
              onChange={handleInputChange}
              type="text"
              disable={false}
              require={true}
            />
            <CustomeInput
              label="Enter Model"
              name="model"
              value={data.model}
              onChange={handleInputChange}
              type="text"
              disable={false}
              require={true}
            />
            <CustomeInput
              label="Enter OS"
              name="os"
              value={data.os}
              onChange={handleInputChange}
              type="text"
              disable={false}
              require={true}
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
              require={true}
            />
            <SingleSelect
              label="Select SNMP Template"
              value={tempValues.find(
                (option) => option.value === selectedValue
              )}
              selectData={tempValues}
              onChange={handleTemp}
              require={true}
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

export default EditSNMPCatalogueDrawer;
