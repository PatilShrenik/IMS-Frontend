import { finopsServerBaseUrl } from "@/const";
import { useState } from "react";

export const getAllUsers = async () => {
  try {
    let retData: any;
    // console.log("details in  api", cloud);
    const res = await fetch(`${finopsServerBaseUrl}/allOwners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body),
    });

    retData = await res.json();
    // console.log(retData);

    return retData;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
  }
};
