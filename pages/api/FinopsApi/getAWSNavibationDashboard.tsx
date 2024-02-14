import { finopsServerBaseUrl } from "@/const";
import { useState } from "react";

export const allInOneAwsAzureCloud = async (gte: any, lte: any) => {
  console.log(gte, lte);
  let retData: any;
  let adid = sessionStorage.getItem("userEmail");
  let body = {
    gte: gte,
    lte: lte,
    adid: adid,
  };

  // console.log("details in  api", cloud);
  const res = await fetch(`${finopsServerBaseUrl}/allInOneAwsAzureCloud`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      retData = data;
    })
    .catch(() => {
      retData = {};
    });
    // console.log("return",retData)
  return retData;
};
