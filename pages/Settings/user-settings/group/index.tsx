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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { getAllGropus, updateGroup, addGroup } from "@/pages/api/api/GroupsAPI";

import { toast } from "react-toastify";
import { replacePeriodsWithUnderscores } from "@/functions/genericFunctions";
import NestedAccordion from "@/pages/Components/Accordion/GroupAccordian";
const Group = () => {
  const [apiData, setApiData] = React.useState([]);

  React.useEffect(() => {
    try {
      const getData = async () => {
        let response = await getAllGropus();
        const modifiedData = replacePeriodsWithUnderscores(response.result);
        setApiData(modifiedData);
        console.log("group respnse", modifiedData);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const buildNestedStructure = (data: any, parentId: any) => {
    const children = data.filter((item: any) => item.parent_id === parentId);
    console.log("children in nested str", children);
    if (children.length === 0) {
      return null; // Reached leaf node
    }

    // return children.map((child: any) => ({
    //   ...child,
    //   children: buildNestedStructure(data, child._id),
    // }));
  };

  const topLevelParentId = 1000000000001; // Assuming "All" is the top-level parent
  const handleAdd = (parentId: string) => {
    console.log(`Add clicked for parent_id: ${parentId}`);
  };

  const handleEdit = (itemId: string) => {
    console.log(`Edit clicked for item_id: ${itemId}`);
  };
  const RootNode: any = apiData.filter(
    (item: any) => item._id === topLevelParentId
  );

  const nestedStructure2 = buildNestedStructure(apiData, topLevelParentId);
  const nestedStructure: any = [
    {
      children: buildNestedStructure(apiData, topLevelParentId),
      ...RootNode[0],
    },
  ];
  console.log("=====", nestedStructure2, RootNode);

  return (
    <>
      {/* <Accordion className='   dark:bg-dark-container dark:text-textColor  dark:border-dark-border'  variant='outlined' disableGutters={true}>
      <AccordionSummary
        aria-controls="panel1-content"
        id="panel1-header"
      >
        Accordion 1
      </AccordionSummary>
      <AccordionDetails>
        <Accordion  className='  dark:bg-dark-container dark:text-textColor dark:border-dark-border' variant='outlined' disableGutters={true}>
          <AccordionSummary   aria-controls="panel1a-content" id="panel1a-header">
            Nested  Header 1
          </AccordionSummary>
          <AccordionDetails>
          <Accordion  className='  dark:bg-dark-container dark:text-textColor dark:border-dark-border' variant='outlined' disableGutters={true}>
          <AccordionSummary   aria-controls="panel1a-content" id="panel1a-header">
          Sub-Nested  Accordian
          </AccordionSummary>
          <AccordionDetails>
            Content for Sub Nested Accordion 
          </AccordionDetails>
        </Accordion>
          </AccordionDetails>
        </Accordion>
        <Accordion  className='  dark:bg-dark-container dark:text-textColor dark:border-dark-border' variant='outlined'  disableGutters={true}>
          <AccordionSummary aria-controls="panel1b-content" id="panel1b-header">
             Nested  Header 2
          </AccordionSummary>
          <AccordionDetails>
            Content for Nested Accordion 2
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion> */}

      <div className="my-4">
        <NestedAccordion
          data={nestedStructure}
          onAdd={handleAdd}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
};

export default Group;
