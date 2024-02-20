import { Drawer } from "@mui/material";
import React from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const CredentialProfileDrawer = (props: any) => {
  return (
    <Drawer anchor="right" open={props.open} variant="persistent">
      <div className="flex justify-between">
        <p>Add Credential Profile</p>
        <CloseSharpIcon
          className="cursor-pointer mr-3 dark:text-textColor"
          onClick={props.handleDrawerClose}
        />
      </div>
    </Drawer>
  );
};

export default CredentialProfileDrawer;
