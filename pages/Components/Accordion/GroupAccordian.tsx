import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { getAllGropus, updateGroup, addGroup } from "@/pages/api/api/GroupsAPI";
import PageHeading from "@/pages/Components/PageHeading";
import { toast } from "react-toastify";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";
import Chips from "../Chips";
import CustomeInput from "../Inputs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../AppContext";
const NestedAccordion = ({ data, onAdd, onEdit }: any) => {
  const [editableName, setEditableName] = React.useState<string | null>(null);
  const [updatedName, setUpdatedName] = React.useState<string>(""); // State to store the updated name
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalParentId, setModalParentId] = React.useState<string>("");
  const [Id, setId] = React.useState<string>("");
  const { groupState, toggleGroupState } = useAppContext();
  const handleEditClick = (item: any, event: React.MouseEvent) => {
    event.stopPropagation();
    setId(item._id);
    setModalParentId(item.parent_id);
    setEditableName(item.name);
    setUpdatedName(item.name); // Set the updated name when editing starts
  };

  function replaceUnderscoresWithPeriods(obj: any) {
    const result: any = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/([^.])(_|_)([^.])/, "$1.$3"); // Replace underscore with period only if it's between non-period characters
        result[newKey] = obj[key];
      }
    }

    return result;
  }
  const handleSaveClick = () => {
    try {
      const data = {
        name: updatedName,
        parent_id: modalParentId,
      };
      const modifiedData = replaceUnderscoresWithPeriods(data);
      const update = async () => {
        let response = await updateGroup(modifiedData, Id);
        if (response.status === "success") {
          toggleGroupState();
          toast.success(response.status, {
            position: "bottom-right",
            autoClose: 1000,
          });
        } else {
          toast.error(response.message, {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      };
      update();
    } catch (error) {
      console.log(error);
    }
    // Implement your save logic here, e.g., update the state or make an API call
    setEditableName(null);
    // Use the updatedName state value as needed
    console.log("Updated Name:", updatedName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the updatedName state when the input changes
    setUpdatedName(e.target.value);
  };
  const handleAddClick = (parentId: string) => {
    console.log("parentId", parentId);
    setModalParentId(parentId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalParentId(""); // Reset the modalParentId when the modal is closed
  };
  const handleIconButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Stop the click event from reaching the Accordion
  };

  const AddGroup = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({ name: "", parent_id: props.id });
    console.log("props", props);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event: any) => {
      const { name, value } = event.target;
      console.log(event.target.value);
      setData({ ...data, [name]: value });
      // setData({ ...data, parent_id: props.id });
    };
    function replaceUnderscoresWithPeriods(obj: any) {
      const result: any = {};

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const newKey = key.replace(/([^.])(_|_)([^.])/, "$1.$3"); // Replace underscore with period only if it's between non-period characters
          result[newKey] = obj[key];
        }
      }

      return result;
    }
    const handleSave = () => {
      const modifiedData = replaceUnderscoresWithPeriods(data);
      console.log("===", modifiedData);
      try {
        const add = async () => {
          let response = await addGroup(modifiedData);
          if (response.status === "success") {
            toast.success(response.status, {
              position: "bottom-right",
              autoClose: 1000,
            });
            toggleGroupState();
          } else {
            toast.error(response.message, {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        };
        add();
      } catch (error) {
        console.log(error);
      }
      props.onClose();
    };
    return (
      <div>
        <Dialog open={props.open} onClose={props.onClose}>
          <DialogTitle className="dark:bg-card-color dark:text-textColor">
            Add Group
          </DialogTitle>
          <DialogContent className="dark:bg-card-color">
            <CustomeInput
              label="Enter Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              type="text"
              disable={false}
            />
          </DialogContent>
          <DialogActions className="dark:bg-card-color dark:text-textColor">
            <div onClick={handleSave} className="mb-2">
              {/* <CustomeButtons title="Save" /> */}
              <button className="bg-blue-600 px-2 py-1 rounded-md text-white">
                save
              </button>
            </div>
            <div onClick={props.onClose} className="mb-2">
              {/* <CustomeButtons title="Cancel" /> */}
              <button className="bg-red-600 px-2 py-1 rounded-md text-white">
                cancel
              </button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <>
      {data &&
        data.map((item: any) => (
          <Accordion
            key={item._id}
            className="   dark:bg-dark-container  border-l border-b border-l-gray-200 dark:border-b-gray-800 rounded-md dark:text-textColor  dark:border-dark-border dark:border-l-gray-600 "
            // variant="elevation"
            disableGutters={true}
          >
            <AccordionSummary
              className=" "
              expandIcon={<ExpandMoreIcon className="dark:text-textColor" />}
              aria-controls={`panel${item._id}-content`}
              id={`panel${item._id}-header`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <Typography className="text-lg dark:text-textColor ">
                    {editableName === item.name ? (
                      <InputBase
                        className="text-lg dark:text-textColor "
                        value={updatedName}
                        onChange={handleInputChange}
                        onClick={(event) => handleIconButtonClick(event)}
                      />
                    ) : (
                      item.name
                    )}
                  </Typography>
                </div>
                <div className="ml-5">
                  <IconButton onClick={(event) => handleIconButtonClick(event)}>
                    <Chips value={item?.device_ids?.length} />
                  </IconButton>

                  {/* <DeleteForeverIcon /> */}
                </div>
              </div>

              <div className="mr-5 mt-">
                <IconButton
                  onClick={(event) => {
                    handleIconButtonClick(event);
                    handleAddClick(item._id);
                  }}
                >
                  <AddCircleOutlineIcon className="dark:text-textColor" />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    handleIconButtonClick(event);
                    handleEditClick(item, event);
                  }}
                >
                  <EditIcon className="dark:text-textColor" />
                </IconButton>
                {editableName === item.name && (
                  <IconButton
                    onClick={(event) => {
                      handleIconButtonClick(event);
                      handleSaveClick();
                    }}
                  >
                    <CheckIcon className="dark:text-textColor" />
                  </IconButton>
                )}

                <IconButton>
                  {" "}
                  <DeleteForeverIcon className="dark:text-textColor" />{" "}
                </IconButton>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {item.children && (
                <NestedAccordion
                  className="   dark:bg-dark-container dark:text-textColor  dark:border-dark-border"
                  variant="outlined"
                  disableGutters={true}
                  data={item.children}
                  onAdd={onAdd}
                  onEdit={onEdit}
                />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      <AddGroup
        id={modalParentId}
        open={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default NestedAccordion;
