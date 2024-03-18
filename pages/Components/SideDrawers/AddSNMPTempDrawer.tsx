import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CustomeInput, { CustomeTextArea } from "../Inputs";
import { makeStyles } from "@material-ui/core/styles";
import CustomeButton, { CustomeCancelButton, SubmitButton } from "../Buttons";
import { addSNMPTemp } from "@/pages/api/api/SNMPTemplateAPI";
import { replaceUnderscoresWithDotsNested } from "@/functions/genericFunctions";
import { useAppContext } from "../AppContext";
import { Bounce, toast } from "react-toastify";

// import MultiSelect from "../MultiSelect";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "60%",
  },
}));
const AddSNMPTempDrawer = (props: any) => {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();
  const { togglegetSNMPTempApiState } = useAppContext();
  const [formData, setFormData] = React.useState<any>([{ key: "", value: "" }]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  //   const [open, setOpen] = React.useState(false);
  const [nestedFormData, setNestedFormData] = React.useState([
    { key: "", values: [{ key: "", value: "" }] },
  ]);

  const handleAddFields = () => {
    setFormData([...formData, { key: "", value: "" }]);
  };
  React.useEffect(() => {
    if (open == false) {
      setFormData([{ key: "", value: "" }]);
      setNestedFormData([{ key: "", values: [{ key: "", value: "" }] }]);
      setName("");
      setDescription("");
    }
  }, [open]);
  const handleRemoveFields = (index: any) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const handleInputChange = (index: any, event: any) => {
    const newFormData: any = [...formData];
    newFormData[index][event.target.name] = event.target.value;
    setFormData(newFormData);
  };

  const handleAddKey = () => {
    setNestedFormData([
      ...nestedFormData,
      { key: "", values: [{ key: "", value: "" }] },
    ]);
  };

  const handleRemoveKey = (index: any) => {
    const newNestedFormData = [...nestedFormData];
    newNestedFormData.splice(index, 1);
    setNestedFormData(newNestedFormData);
  };

  const handleAddFieldsObj = (index: any) => {
    const newNestedFormData = [...nestedFormData];
    newNestedFormData[index].values.push({ key: "", value: "" });
    setNestedFormData(newNestedFormData);
  };

  const handleRemoveFieldsObj = (keyIndex: any, fieldIndex: any) => {
    const newNestedFormData: any = [...nestedFormData];
    newNestedFormData[keyIndex].values.splice(fieldIndex, 1);
    setNestedFormData(newNestedFormData);
  };

  const handleInputChangeObj = (keyIndex: any, fieldIndex: any, event: any) => {
    const newNestedFormData: any = [...nestedFormData];
    newNestedFormData[keyIndex].values[fieldIndex][event.target.name] =
      event.target.value;
    setNestedFormData(newNestedFormData);
  };

  const handleSave = (event: any) => {
    event.preventDefault();
    const formattedData: any = formData.reduce((result: any, field: any) => {
      result[field.key] = field.value;
      return result;
    }, {});
    const formattedDataObj = nestedFormData.reduce((result: any, item: any) => {
      const key = item.key;
      const values = item.values.reduce((fieldResult: any, field: any) => {
        fieldResult[field.key] = field.value;
        return fieldResult;
      }, {});
      result[key] = values;
      return result;
    }, {});
    const data = {
      name: name,
      description: description,
      scalar_oid: formattedData,
      objects: formattedDataObj,
    };
    const modifiedData = replaceUnderscoresWithDotsNested(data);
    // console.log("Formatted Data object:", formattedDataObj);
    // console.log("Formatted Data:", formattedData);
    console.log("Final Data:", modifiedData);
    try {
      const addtemp = async () => {
        let response = await addSNMPTemp(modifiedData);
        console.log(response);
        if (response.status == "success") {
          togglegetSNMPTempApiState();
          toast.success(response.status, {
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
      addtemp();
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
      className="shadow-sm shadow-dark-container w-full overflow-y-auto"
    >
      <div className="h-full w-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Add TempLate</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <div className="py-8 px-6 dark:bg-dark-menu-color">
          <form onSubmit={handleSave} method="POST">
            <div className="z-auto">
              <div>
                <div className="flex">
                  <CustomeInput
                    label="Name"
                    name="hostname"
                    value={name}
                    type="text"
                    require={true}
                    onChange={(event: any) => setName(event.target.value)}
                  />
                  <CustomeInput
                    label="Description"
                    name="description"
                    value={description}
                    type="text"
                    require={true}
                    onChange={(event: any) =>
                      setDescription(event.target.value)
                    }
                  />
                </div>
                {/* <div className="border-b-[1px]"> */}
                <p className="mx-5 mt-4 dark:text-textColor">Scaler OID</p>
                <Divider className="my-2 dark:bg-dark-border"/>
                {/* </div> */}
                <div>
                  {formData.map((field: any, index: any) => (
                    <div className="flex items-center">
                      <div>
                        <CustomeInput
                          label="Enter OID"
                          name="key"
                          value={field.key}
                          onChange={(event: any) =>
                            handleInputChange(index, event)
                          }
                          require={true}
                        />
                      </div>
                      <div>
                        <CustomeInput
                          label="Indicator Name"
                          name="value"
                          value={field.value}
                          onChange={() => handleInputChange(index, event)}
                          require={true}
                        />
                      </div>
                      <div className="flex">
                        <div onClick={() => handleAddFields()}>
                          <ControlPointIcon className="dark:text-textColor" />
                        </div>
                        {formData && formData.length > 1 && (
                          <div
                            onClick={() => handleRemoveFields(index)}
                            className="ml-2"
                          >
                            <RemoveCircleOutlineIcon className="dark:text-textColor" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mx-5 my-4 dark:text-textColor">Objects</p>
                <Divider className="my-2 dark:bg-dark-border"/>
                <div className="">
                  {nestedFormData.map((item, keyIndex) => (
                    <div key={keyIndex} className="">
                      <div className="flex items-center">
                        <div className="flex">
                          <CustomeInput
                            label="Object Type"
                            value={item.key}
                            onChange={(e: any) => {
                              const newNestedFormData = [...nestedFormData];
                              newNestedFormData[keyIndex].key = e.target.value;
                              setNestedFormData(newNestedFormData);
                            }}
                            require={true}
                          />
                        </div>
                        <div className="flex">
                          <div onClick={handleAddKey}>
                            <ControlPointIcon className="dark:text-textColor mx-1 cursor-pointer" />
                          </div>
                          {nestedFormData.length > 1 && (
                            <div onClick={() => handleRemoveKey(keyIndex)}>
                              <RemoveCircleOutlineIcon className="dark:text-textColor mx-1 cursor-pointer" />
                            </div>
                          )}
                        </div>
                      </div>
                      {item.values.map((field, fieldIndex) => (
                        <div className="flex items-center">
                          <div>
                            <CustomeInput
                              name="key"
                              label="Enter OID"
                              value={field.key}
                              onChange={(e: any) =>
                                handleInputChangeObj(keyIndex, fieldIndex, e)
                              }
                              require={true}
                            />
                          </div>
                          <div>
                            <CustomeInput
                              name="value"
                              label="Indicator Name"
                              value={field.value}
                              onChange={(e: any) =>
                                handleInputChangeObj(keyIndex, fieldIndex, e)
                              }
                              require={true}
                            />
                          </div>
                          <div className="flex">
                            <div onClick={() => handleAddFieldsObj(keyIndex)}>
                              <ControlPointIcon className="dark:text-textColor mx-1 cursor-pointer" />
                            </div>
                            {item.values && item.values.length > 1 && (
                              <div
                                onClick={() =>
                                  handleRemoveFieldsObj(keyIndex, fieldIndex)
                                }
                              >
                                <RemoveCircleOutlineIcon className="dark:text-textColor mx-1 cursor-pointer" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full sticky bottom-0 left-0 flex justify-end">
              <div className=" flex m-3">
                {/* <div onClick={handleSave}> */}
                <SubmitButton title="Save" />
                {/* </div> */}
                <CustomeCancelButton title="Close" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Drawer>
  );
};

export default AddSNMPTempDrawer;
