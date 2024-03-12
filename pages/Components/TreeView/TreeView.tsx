import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Chips from "../Chips"; // Assuming Chips is a component you've defined
import { addGroup, deleteGroup, updateGroup } from "@/pages/api/api/GroupsAPI";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CustomeInput from "../Inputs";
import { Modal } from "@mui/material";
import DeviceDetailsModal from "../Modals/DeviceDetailsModal";

const renderTree = (
  nodes: any,
  editableName: string | boolean,
  updatedName: string,
  handleInputChange: any,
  handleIconButtonClick: any,
  handleAddClick: any,
  handleEditClick: any,
  handleSaveClick: any,
  modalParentId: any,
  isModalOpen: any,
  handleModalClose: any,
  parentId: any,
  DeleteGroup: any,
  handleDeleteClick: any,
  handleChipDialogClick: any
) => (
  <TreeItem
    key={nodes && nodes._id && nodes._id}
    nodeId={nodes && nodes._id && nodes._id.toString()}
    label={
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div>
            <Typography className="text-md dark:text-textColor">
              {editableName === nodes.name ? (
                <InputBase
                  className="text-md dark:text-textColor"
                  value={updatedName}
                  onChange={handleInputChange}
                  onClick={(event) => handleIconButtonClick(event)}
                />
              ) : (
                nodes.name
              )}
            </Typography>
          </div>
          <div>
            <IconButton
              onClick={(event) => {
                nodes &&
                  nodes.device_ids &&
                  nodes.device_ids?.length > 0 &&
                  handleChipDialogClick(nodes.device_ids);
                handleIconButtonClick(event);
              }}
            >
              <Chips
                value={
                  (nodes && nodes.device_ids && nodes.device_ids?.length) || 0
                }
              />
            </IconButton>
          </div>
        </div>

        <div className="mr-5 items-center">
          <IconButton
            onClick={(event) => {
              handleIconButtonClick(event);
              handleAddClick(nodes._id);
            }}
          >
            <AddCircleOutlineIcon className="dark:text-textColor" />
          </IconButton>
          <IconButton
            onClick={(event) => {
              handleIconButtonClick(event);
              handleEditClick(nodes, event);
            }}
          >
            <EditIcon className="dark:text-textColor" />
          </IconButton>
          {editableName === nodes.name && (
            <IconButton
              onClick={(event) => {
                handleIconButtonClick(event);
                handleSaveClick();
              }}
            >
              <CheckIcon className="dark:text-textColor" />
            </IconButton>
          )}
          {(!nodes.children || nodes.children.length === 0) && nodes.device_ids &&
            !nodes.device_ids.length &&
            nodes._id !== nodes.parent_id && (
              <IconButton onClick={() => handleDeleteClick(nodes._id)}>
                <DeleteForeverIcon className="dark:text-textColor" />
              </IconButton>
            )}
        </div>
      </div>
    }
    className="tree-view dark:bg-dark-container dark:border-dark-border dark:text-textColor border-gray-200 rounded-md pt-3"
    sx={{ fontFamily: "'Poppins', sans-serif !important" }}
  >
    {Array.isArray(nodes.children)
      ? nodes &&
        nodes.children &&
        nodes.children.map((node: any) =>
          renderTree(
            node,
            editableName,
            updatedName,
            handleInputChange,
            handleIconButtonClick,
            handleAddClick,
            handleEditClick,
            handleSaveClick,
            modalParentId,
            isModalOpen,
            handleModalClose,
            parentId,
            DeleteGroup,
            handleDeleteClick,
            handleChipDialogClick
          )
        )
      : null}
  </TreeItem>
);

const TreeViewGroup = ({ data }: any) => {
  const [editableName, setEditableName] = React.useState<any>(null);
  const [updatedName, setUpdatedName] = React.useState<string>("");
  const { toggleGroupState } = useAppContext();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalParentId, setModalParentId] = React.useState<string>("");
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [Id, setId] = React.useState<string>("");
  const [parentId, setParentId] = React.useState<string>("");
  const [chipDialogId, setChipDialogId] = React.useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isChipdialogOpen, setIsChipdialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (data && data[0] && data[0]._id) {
      setParentId(data[0]._id);
    }
  }, [data]);
  // console.log("data---------", parentId);
  const handleEditClick = (item: any, event: React.MouseEvent) => {
    event.stopPropagation();
    setId(item._id);
    setModalParentId(item.parent_id);
    setEditableName(item.name);
    setUpdatedName(item.name); // Set the updated name when editing starts
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(event.target.value);
  };

  const handleIconButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleAddClick = (parentId: string) => {
    console.log("parentId", parentId);
    setModalParentId(parentId);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };
  const handleChipDialogClick = (id: any) => {
    setChipDialogId(id);
    setIsChipdialogOpen(true);
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
  const handleSaveClick = async () => {
    try {
      const data = {
        name: updatedName,
        parent_id: modalParentId,
      };
      const modifiedData = replaceUnderscoresWithPeriods(data);
      console.log("parentID", modalParentId);
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
    } catch (error) {
      console.log(error);
    }
    // Implement your save logic here, e.g., update the state or make an API call
    setEditableName(null);
    // Use the updatedName state value as needed
    console.log("Updated Name:", updatedName);
  };
  // const deleteGroup = () => {
  //   try {
  //     console.log("parentID", modalParentId);
  //     let response = await del(Id);
  //     if (response.status === "success") {
  //       toggleGroupState();
  //       toast.success(response.status, {
  //         position: "bottom-right",
  //         autoClose: 1000,
  //       });
  //     } else {
  //       toast.error(response.message, {
  //         position: "bottom-right",
  //         autoClose: 2000,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalParentId(""); // Reset the modalParentId when the modal is closed
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(""); // Reset the modalParentId when the modal is closed
  };
  const handleChipDialogClose = () => {
    setIsChipdialogOpen(false);
    setChipDialogId(""); // Reset the modalParentId when the modal is closed
  };
  const AddGroup = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({ name: "", parent_id: props.id });
    // console.log("props", props);
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
  const DeleteGroup = (props: any) => {
    console.log("props-", props);
    const handleDelete = () => {
      try {
        const deleteGroupFun = async () => {
          let response = await deleteGroup(props.id);
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
        deleteGroupFun();
      } catch (error) {
        console.log(error);
      }
      props.onClose();
    };
    return (
      <div>
        <Modal open={props.open} onClose={props.onClose}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 max-w-md text-center rounded-md dark:bg-tabel-row">
            <DeleteForeverIcon className="text-red-400 h-[3.5rem] w-[3.5rem] " />
            <div className="mb-5  border-b-2 py-4    dark:border-dark-border ">
              <p className="text-xl font-semibold mb-2 dark:text-textColor">
                Are you sure ?{" "}
              </p>
              <p className="text-gray-400 text-sm">
                Do you really want to delete these records? This process cannot
                be undone.
              </p>
            </div>

            <button
              onClick={handleDelete}
              className="bg-red-400 hover:bg-red-400 text-white font-normal py-1 px-4 rounded mr-4 dark:text-textColor"
            >
              Delete
            </button>
            <button
              onClick={props.onClose}
              className=" border border-light3 font-normal py-1 px-4 rounded mb-2  dark:text-textColor"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <div className="w-full rounded-md overflow-hidden pl-2 pr-2">
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: "auto", overflowY: "auto" }}
      >
        {data &&
          data[0] &&
          renderTree(
            data[0],
            editableName,
            updatedName,
            handleInputChange,
            handleIconButtonClick,
            handleAddClick,
            handleEditClick,
            handleSaveClick,
            modalParentId,
            isModalOpen,
            handleModalClose,
            parentId,
            DeleteGroup,
            handleDeleteClick,
            handleChipDialogClick
          )}
      </TreeView>
      <AddGroup
        id={modalParentId}
        open={isModalOpen}
        onClose={handleModalClose}
      />
      <DeleteGroup
        id={deleteId}
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
      />{" "}
      <DeviceDetailsModal
        open={isChipdialogOpen}
        handleDialogClose={handleChipDialogClose}
        device_ids={chipDialogId}
      />
    </div>
  );
};

export default TreeViewGroup;
