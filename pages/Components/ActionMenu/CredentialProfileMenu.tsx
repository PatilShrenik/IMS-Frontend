import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteCredsProfile } from "@/pages/api/api/CredentialProfileAPI";
import { toast } from "react-toastify";
import EditCredentialProfileDrawer from "../SideDrawers/EditCredentialProfileDrawer";
import { useState } from "react";
import { useAppContext } from "../AppContext";

const ITEM_HEIGHT = 48;

const CredentialProfileMenu = (props: any) => {
  const { id  } = props;
  const { themeSwitch, getCredProfileApiState, togglegetCredProfileApiState } =
  useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditDrawerClose = () => {
    setIsEditDrawerOpen(false);
  };
  const handleEditClick = (rowId: number) => {
    //console.log("EditRowId", rowId);
    setIsEditDrawerOpen(true);
    handleClose();
  };

  const handleDeleteClick = async (rowId: number) => {
   // console.log("DeleteRowId", rowId);

    try {
      const response = await deleteCredsProfile(rowId);

      if (response.status == "success") {
        togglegetCredProfileApiState();
        toast.success(response.message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      } else if (response.status == "fail" && response.code == 400) {
        toast.error("Bad Request: The request could not be understood or was missing required parameters.", {
            position: "bottom-right",
            autoClose: 2000,
        }); 
      } else {
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
      // setIsPopupOpen(false);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <div className="ml-4">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className="dark:text-textColor" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "10ch",
          },
        }}
      >
        <MenuItem
          className="bg-textColor dark:bg-tabel-header dark:text-textColor"
          onClick={() =>  handleEditClick(id)}
        >
          Edit
        </MenuItem>
     
        <MenuItem
          className="bg-textColor dark:bg-tabel-header dark:text-textColor"
          onClick={() => handleDeleteClick(id)}
        >
          Delete
        </MenuItem>
      </Menu>
     
        <EditCredentialProfileDrawer
        rowId={id}
        open={isEditDrawerOpen}
        handleDrawerClose={handleEditDrawerClose}
      />
      
    </div>
  );
};
export default CredentialProfileMenu;
