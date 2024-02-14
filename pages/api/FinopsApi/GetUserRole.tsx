import {finopsServerBaseUrl } from "@/const";
import { useState } from "react";

export const getUserRole = async (email: any) => {
  let retData: any;
  // console.log("details in  api", email);

  const res = await fetch(
    `${finopsServerBaseUrl}/getUserroleByEmail?adId=${email}`,
    // `${finopsServerBaseUrl}/GetroleByEmail?emailid=gajanan.mundada%40adityabirla.com`,

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
    .catch((error) => {
      console.log(error);
    });
  // console.log(retData);

  return retData;
};
