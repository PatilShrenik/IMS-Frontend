import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomeButton from "../Buttons";
import { IconButton } from "rsuite";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { MdEdit } from "react-icons/md";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const SecSingleSelectForDashboard = (props: any) => {
  const {
    label,
    selectData,
    onChange,
    require,
    value,
    index,
    type,
    onDash,
    handleEdit,
    handleDelete,
  } = props;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  // console.log(index, type);
  const [selectFocused, setSelectFocused] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("single select", event.target.value);
    const selectedValue = event.target.value;
    // console.log(index);
    if (index === undefined) {
      console.log(selectedValue);
      onChange(selectedValue);
    } else {
      console.log("in dropdown", index, type, selectedValue);
      onChange(index, type, selectedValue);
    }
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  console.log("selectdata", selectData);

  return (
    <div className="flex items-center z-0">
      <div className="relative bg-white  dark:text-textColor">
        <div className="dark:bg-dark-container">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Dashboard</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={value}
              onChange={(e: any) => onChange(e)}
              input={<OutlinedInput label="Dashboard" />}
              renderValue={(selected: any) => {
                if (Array.isArray(selected)) {
                  return selected
                    .map((id: any) => {
                      const selectedItem = selectData.find(
                        (item: any) => item.id === id
                      );
                      return selectedItem ? selectedItem.name : "";
                    })
                    .join(", ");
                }
                const selectedItem = selectData && selectData.find(
                  (item: any) => item.id === selected
                );
                return selectedItem ? selectedItem.name : "";
              }}
            >
              {selectData &&
                selectData.map((data: any) => (
                  <MenuItem key={data.name} value={data.id}>
                    {data.name == "Default" ? (
                      <div className="px-2 text-center">{data.name}</div>
                    ) : (
                      <div className="flex items-center">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(data.id, data.name);
                          }}
                        >
                          <EditIcon style={{ padding: "4px" }} />
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(data.id);
                          }}
                        >
                          <DeleteForeverIcon style={{ padding: "4px" }} />
                        </div>
                        <div className="px-2 text-center">{data.name}</div>
                      </div>
                    )}
                  </MenuItem>
                ))}
              <MenuItem value="Add Dashboard">
                <div className="w-full px-2 border-t py-1 text-blue-600">
                  Add Dashboard
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SecSingleSelectForDashboard;
