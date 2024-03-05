import { Drawer } from '@mui/material';
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    drawer: {
      width: "80%",
    },
  }));
const EditDeviceDrawer = (props: any) => {
    const { open, handleDrawerClose } = props;
    const classes = useStyles();
  return (
    <Drawer
    // hideBackdrop = {false}temporary
    anchor="right"
    open={open}
     sx={{ width: "100%" }}
    variant="temporary"
    classes={{ paper: classes.drawer }}
    className="shadow-sm shadow-dark-container w-full overflow-y-auto"
  >    </Drawer>
  )
}

export default EditDeviceDrawer;