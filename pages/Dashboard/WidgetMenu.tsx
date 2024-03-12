import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../Components/AppContext";
import {
  GetDashboardWidgetsData,
  UpdateWidgetsData,
  deleteWidgt,
} from "../api/api/DashboardWidgetsAPI";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export function WidgetMenu(props: any) {
  const ITEM_HEIGHT = 62;
  const widgetOption = ["Edit", "Delete", "Add To Dashboard"];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const { getTableApiState, togglegetTableApiState } = useAppContext();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  // const [layoutsWholeData, setLayoutsWholeData] = React.useState(null);
console.log("props in widget",props)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const confirmDelete = () => {
    setIsPopupOpen(true);
  };
  const cancelDelete = () => {
    setIsPopupOpen(false);
  };
  const deleteDevice = async () => {
    try {
      let response = await deleteWidgt(props.id);
      console.log(response);
      // window.alert(response.status);
      if (response.status == "success") {
        togglegetTableApiState();
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
      setIsPopupOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionClick = (option: any, id: any) => {
    console.log("option", option, "id", props.id);
    if (option == "Delete") {
      confirmDelete();
    } else if (option == "Edit") {
      setDialogOpen(true);
    } else if (option == "Add To Dashboard") {
      // console.log("widgetType", )
      AddToDashboard(props.id);
    }

    handleClose();
  };

  async function getWidgetData() {
    let id = "1000000000001";
    return await GetDashboardWidgetsData(id);
  }
  async function updateWidgetData(body: any) {
    let id = "1000000000001";
    await UpdateWidgetsData(id, body);
  }

  function AddToDashboard(id: any) {
    let num: any;
    let widget: any;
    getWidgetData().then((res: any) => {
      num = res?.result?.widgets?.length || 0;
      console.log("res", res?.result);
      if (num) {
        let widgetNum =
          parseInt(res.result.widgets[num - 1].i.split("/")[1]) + 1;
        widget = [
          ...res.result.widgets,
          {
            widgetID: id,
            i: `widget/${widgetNum}/${props.widgetType}/${id}`,
            x: 0,
            y: 0,
            w: 4,
            h: 10,
            minW: 4,
            maxH: 10,
            moved: false,
            static: false,
          },
        ];
      } else {
        widget = [
          {
            widgetID: id,
            i: `widget/1/${props.widgetType}/${id}`,
            x: 0,
            y: 0,
            w: 4,
            h: 10,
            minW: 4,
            maxH: 10,
            moved: false,
            static: false,
          },
        ];
      }
      updateWidgetData({ ...res.result, widgets: widget }).then(() => {
        props.setAddToDashboard((v: number) => v + 1);
      });
    });
  }

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 5,
            width: "22ch",
            left: "1100px",
          },
        }}
      >
        {widgetOption.map((option: any, index: number) => (
          <MenuItem
            key={index}
            selected={option === "Pyxis"}
            onClick={() => handleOptionClick(option, props.id)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {/* <EditWidgetModel
          handleDialogClose={handleDialogClose}
          open={dialogOpen}
          id={props.id}
        /> */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-800 backdrop-filter backdrop-blur-sm">
          <div className="bg-white border-2 border-gray-600 px-8 py-6 rounded-lg shadow-xl w-96">
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            <div className="flex justify-end">
              <button
                className="mr-4 px-4 py-1 bg-red-800 text-sm text-white rounded-md focus:outline-none focus:shadow-outline-purple"
                onClick={deleteDevice}
              >
                Yes, Delete
              </button>

              <button
                className="px-4 py-1 bg-gray-300 text-sm text-gray-700 rounded-md focus:outline-none focus:shadow-outline-gray"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
