import { baseURL } from "@/constants";

import https from 'https';
import { URLSearchParams } from 'url';

// const baseURL = 'https://example.com'; // Replace with your base URL

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const login = async (props: any) => {
  try {
    const params = new URLSearchParams();
    Object.keys(props).forEach((key) => {
      params.append(key, props[key]);
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      agent,
    };

    const res = await fetch(`${baseURL}/login`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(baseURL + "/logout", {
      method: "POST",
      // body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    //console.log(error);
  }
};
