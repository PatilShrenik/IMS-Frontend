import { finopsServerBaseUrl } from "@/const";
import { useState } from "react";

export const getSubscriptionIds = async (cloud: any, adid: any) => {
  let retData: any;
  // console.log("details in  api", cloud, adid);
  const res = await fetch(
    `${finopsServerBaseUrl}/getUserCloudSubsriptionNameandIds?cloud=${cloud}&adid=${adid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      retData = data;
    })
    .catch(()=>{retData=[]});
    ;
  // console.log(retData);

  return retData;
};
