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
import { Bounce, toast } from "react-toastify";
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
    flexShrink: 0,
    // height: "100%",
  },
  bottomContent: {
    marginTop: "auto",
    // padding: theme.spacing(2),
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
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              });
            } else {
              toast.error(data.message, {
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
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(response.message, {
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
      className="shadow-sm shadow-dark-container w-full h-full overflow-y-auto"
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
          <div
            className="mr-6 flex justify-end items-center cursor-pointer"
            onClick={downloadFile}
          >
            <CloudDownloadIcon
              className="dark:text-primary2"
              fontSize="small"
            />
            <p className="ml-2 dark:text-primary2 text-sm italic">
              Download Sample File
            </p>
            <VisuallyHiddenInput
              type="file"
              accept=".csv"
              onClick={downloadFile}
            />
          </div>
          <div className="flex items-center px-2">
            <Button
              component="label"
              variant="contained"
              style={{ margin: "12px 10px" }}
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
                <h5 className="text-red-500 m-2">*{message}*</h5>
                {/* <TableContainer component={Paper}> */}
                <table className="w-full border-collapse overflow-x-scroll">
                  <thead>
                    <tr>
                      {keys.map((key: any) => {
                        const formattedKey = key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char: any) => char.toUpperCase());

                        return (
                          <th
                            className="bg-textColor dark:bg-tabel-header dark:text-textColor"
                            key={key}
                          >
                            {formattedKey}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {errorData.map((data: any, index: any) => {
                      const isLastRow = index === data.length - 1;
                      return (
                        <tr
                          className="bg-white dark:bg-dark-container dark:text-textColor"
                          key={index}
                        >
                          {keys.map((key: any) => (
                            <td
                              style={{
                                //   padding: "8px",
                                textAlign: "center",
                              }}
                              className={`bg-white dark:bg-dark-container dark:text-textColor dark:border-dark-border ${
                                isLastRow ? "border-b" : "border-b"
                              }`}
                              key={key}
                            >
                              {JSON.stringify(data[key])}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* </TableContainer> */}
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 px-4 py-2">
          <p className="text-danger text-sm ">
            * Mendatory Fields : HostName, Plugin Type, IP Address, Port,
            Credential Profile, Groups *
          </p>
        </div>
      </div>
    </Drawer>
  );
};

export default UploadCSVDrawer;
