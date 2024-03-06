import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { getAllGropus, updateGroup, addGroup } from "@/pages/api/api/GroupsAPI";
import PageHeading from "@/pages/Components/PageHeading";
import { toast } from "react-toastify";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";
import Chips from "../Chips";
const NestedAccordion = ({ data, onAdd, onEdit }: any) => {
  const [editableName, setEditableName] = React.useState<string | null>(null);
  const [updatedName, setUpdatedName] = React.useState<string>(""); // State to store the updated name
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalParentId, setModalParentId] = React.useState<string>("");
  const [Id, setId] = React.useState<string>("");

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
  return (
    <>
      {data &&
        data.map((item: any) => (
          <Accordion
            key={item._id}
            className="   dark:bg-dark-container dark:text-textColor  dark:border-dark-border"
            variant="outlined"
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
                
                <IconButton > <DeleteForeverIcon className="dark:text-textColor" />  </IconButton>
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
      {/* <AddGroup id={modalParentId} open={isModalOpen} onClose={handleModalClose} /> */}
    </>
  );
};

export default NestedAccordion;
