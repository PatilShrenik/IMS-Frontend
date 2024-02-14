import { finopsServerBaseUrl } from "@/const";
import NTable from "@/pages/Components/Charts/NestedTable";
import Table from "@/pages/Components/Charts/Table";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Switch from "react-switch";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getCurrencyData, updateCurrencyData } from "@/pages/api/getCurrency";
import fun from "@/pages/Components/AppContext";


const CloudGateway = () => {
  return <div className="dark:text-white">Assets
  </div>;
};

export default CloudGateway;
