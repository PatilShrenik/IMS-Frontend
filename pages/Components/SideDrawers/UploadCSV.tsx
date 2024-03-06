import {
  Button,
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { baseURL } from "@/constants";
import {
  replacePeriodsWithUnderscoresArrayOfObjects,
  replacePeriodsWithUnderscoresnested,
  replaceUnderscoresWithDots,
} from "@/functions/genericFunctions";
import { onBoardDeviceCsv } from "@/pages/api/api/DeviceManagementAPI";
import { keys } from "highcharts";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "50%",
  },
}));
const UploadCSVDrawer = (props: any) => {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [selectedFileName, setSelectedFileName] = useState("");
  const [message, setMessage] = useState("");
  const [errorData, setErrorData] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const [uuid, setuuid] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch(baseURL + "/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            if (data.status === "success") {
              toast.success(data.status, {
                position: "bottom-right",
                autoClose: 1000,
              });
            } else {
              toast.error(data.message, {
                position: "bottom-right",
                autoClose: 2000,
              });
            }
            const file_name = Object.keys(data.result)[0];
            const value = data.result[file_name];
            setFileName(file_name);
            setuuid(value);
          }
        })
        .catch((error) => console.error("Error:", error));

      // console.log("FormData:", formData);
    }
  };

  const onBoard = async () => {
    const data = {
      file_name: fileName,
      file_uuid: uuid,
      profile_type: "csv",
    };
    const modifiedData = replaceUnderscoresWithDots(data);
    // console.log(modifiedData);
    try {
      let response = await onBoardDeviceCsv(modifiedData);
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
      const data = replacePeriodsWithUnderscoresnested(response);

      const arrayOfObjects = Object.values(data.device_list);
      const modData =
        replacePeriodsWithUnderscoresArrayOfObjects(arrayOfObjects);

      setErrorData(modData);
      setShow(true);
      setMessage(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = () => {
    const content =
      "plugin.type~ip.address~hostname~port~device.name~alias~discovery.schedulers~credential.profiles~groups~auto.provision~timezone~country~location~site~site.code~latitude~longitude~service";
    const fileName = "sample-device-upload.csv";
    const blob = new Blob([content], { type: "text/csv" });
    const link = document.createElement("a");
    link.download = fileName;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const keys = Object.keys(errorData[0] || []);
  return (
    <Drawer
      // hideBackdrop = {false}temporary
      anchor="right"
      open={open}
      variant="temporary"
      classes={{ paper: classes.drawer }}
      className="shadow-sm shadow-dark-container w-full overflow-y-auto"
    >
      <div className="h-full w-full bg-white dark:bg-dark-menu-color">
        <div className="flex justify-between py-3 px-10 border-b border-b-textColor dark:border-b-dark-border">
          <p className="text-primary2 font-semibold">Upload Asset CSV</p>
          <CloseSharpIcon
            className="cursor-pointer mr-3 dark:text-textColor"
            onClick={handleDrawerClose}
          />
        </div>
        <div className="py-2 px-6">
          <div className="mr-6 flex justify-end items-center">
            <CloudDownloadIcon
              className="dark:text-primary2"
              fontSize="small"
            />
            <p className="ml-2 dark:text-primary2 text-sm">
              Download Sample File
            </p>
            <VisuallyHiddenInput
              type="file"
              accept=".csv"
              onClick={downloadFile}
            />
          </div>
          <div className="flex items-center px-4">
            <Button
              component="label"
              variant="contained"
              className="my-2"
              startIcon={<CloudUploadIcon />}
            >
              {selectedFileName ? selectedFileName : "Select file"}
              <VisuallyHiddenInput
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </Button>
            <Button
              disabled={selectedFile ? false : true}
              variant="contained"
              // color="success"
              size="medium"
              style={{
                margin: "12px 10px",
                backgroundColor: `${selectedFile ? "#0078D4" : "#fff9"}`,
                color: `${selectedFile ? "#ffffff" : "#ffffff"}`,
              }}
              onClick={handleUpload}
            >
              Upload File
            </Button>
            <Button
              disabled={uuid != "" ? false : true}
              variant="contained"
              // color="success"
              size="medium"
              style={{
                margin: "12px 10px",
                backgroundColor: `${uuid != "" ? "#0078d4" : "#fff9"} `,
                color: `${uuid ? "#ffffff" : "#ffffff"}`,
              }}
              onClick={onBoard}
            >
              Onboard Device
            </Button>
          </div>
          <div>
            {show && (
              <>
                <h5 className="text-red-500 m-2">{message}</h5>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {keys.map((key: any) => (
                          <TableCell key={key}>{key}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {errorData.map((data: any, index: any) => (
                        <TableRow key={index}>
                          {keys.map((key: any) => (
                            <TableCell key={key}>
                              {JSON.stringify(data[key])}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default UploadCSVDrawer;
