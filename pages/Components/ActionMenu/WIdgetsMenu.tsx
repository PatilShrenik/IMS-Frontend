import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Bounce, toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import { Modal } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { widgetDelete } from "@/pages/api/api/ReportsAPI";
import EditWidgetDrawer from "../SideDrawers/EditWidgetDrawer";
import {
  GetDashboardWidgetsData,
  UpdateWidgetsData,
} from "@/pages/api/api/DashboardWidgetsAPI";

const ITEM_HEIGHT = 48;

const WidgetMenu = (props: any) => {
  const { id, setAddToDashboard, widget_type } = props;
  // console.log("widget type", widget_type);
  const [isModalopen, setIsModalOpen] = React.useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
    // handleClose();
  };
  const handleModalClose = () => setIsModalOpen(false);
  const { toggleWidgetApiState } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditDrawerClose = () => {
    setIsEditDrawerOpen(false);
  };
  const handleEditClick = () => {
    setIsEditDrawerOpen(true);
    handleClose();
  };

  const handleDeleteClick = async (rowId: number) => {
    // console.log("DeleteRowId", rowId);

    try {
      const response = await widgetDelete(rowId);

      if (response.status == "success") {
        toggleWidgetApiState();
        toast.success(response.message, {
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
        handleModalClose();
      } else if (response.status == "fail" && response.code == 400) {
        toast.error(
          "Bad Request: The request could not be understood or was missing required parameters.",
          {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          }
        );
        handleModalClose();
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
        handleModalClose();
      }

      // setIsPopupOpen(false);
    } catch (error) {
      console.log(error);
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
            i: `widget/${widgetNum}/${widget_type}/${id}`,
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
            i: `widget/1/${widget_type}/${id}`,
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
        setAddToDashboard((v: number) => v + 1);
      });
    });
    handleClose();
  }

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
            backgroundColor: "transparent",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ padding: "0" }}
      >
        <MenuItem
          className="bg-textColor dark:bg-tabel-header dark:text-textColor hover:dark:bg-tabel-header hover:bg-textColor"
          onClick={() => handleEditClick()}
        >
          Edit
        </MenuItem>

        <MenuItem
          className="bg-textColor dark:bg-tabel-header dark:text-textColor hover:dark:bg-tabel-header hover:bg-textColor"
          onClick={handleModalOpen}
        >
          Delete
        </MenuItem>
        <MenuItem
          className="bg-textColor dark:bg-tabel-header dark:text-textColor hover:dark:bg-tabel-header hover:bg-textColor"
          onClick={() => {
            AddToDashboard(id);
          }}
        >
          Add to Dashboard
        </MenuItem>
      </Menu>

      <Modal open={isModalopen} onClose={handleModalClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 max-w-md text-center rounded-md dark:bg-tabel-row">
          <DeleteForeverIcon className="text-red-400 h-[3.5rem] w-[3.5rem] " />
          <div className="mb-5  border-b-2 py-4    dark:border-dark-border ">
            <p className="text-xl font-semibold mb-2 dark:text-textColor">
              Are you sure ?{" "}
            </p>
            <p className="text-gray-400 text-sm">
              Do you really want to delete these records? This process cannot be
              undone.
            </p>
          </div>

          <button
            onClick={() => handleDeleteClick(id)}
            className="bg-red-400 hover:bg-red-400 text-white font-normal py-1 px-4 rounded mr-4 dark:text-textColor"
          >
            Delete
          </button>
          <button
            onClick={handleModalClose}
            className=" border border-light3 font-normal py-1 px-4 rounded mb-2  dark:text-textColor"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <EditWidgetDrawer
        rowId={id}
        open={isEditDrawerOpen}
        handleDrawerClose={handleEditDrawerClose}
      />
    </div>
  );
};
export default WidgetMenu;
