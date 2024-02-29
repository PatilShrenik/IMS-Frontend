import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ClearIcon from "@mui/icons-material/Clear";
import { Modal } from '@mui/material';
import { CustomeCancelButton } from '../Buttons';
const DeleteModal = (props: any) => {

  const { open, handleModalClose , deleteRow} = props;

  return (
    < Modal open={open} >
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 max-w-md text-center rounded-md dark:bg-tabel-row">
    <DeleteForeverIcon className="text-red-400 h-[3.5rem] w-[3.5rem] " />
    <div className="mb-5  border-b-2 py-4  dark:border-dark-border">
     <p className="text-xl font-semibold mb-2 dark:text-textColor">Are you sure  ? </p> 
      <p className="text-gray-400 text-sm">Do you really want to delete these records? This process cannot be undone.</p>
    </div>

    <button
      onClick={deleteRow}
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
    {/* <div >
    <CustomeCancelButton title="Cancel" />
    </div> */}
  </div>
  </Modal>
  )
}

export default DeleteModal;