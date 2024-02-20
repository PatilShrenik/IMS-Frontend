import { baseURL } from "../../../constants";

export const getAllGropus = async () => {
  const token = localStorage.getItem("token");
  let res: any;
  try {
    res = await fetch(baseURL + "/api/v1/settings/group", {
      method: "GET",
      // body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = res.json();
  } catch (error:any) {
    console.error("error in reciving all groups", error)
    res = {"result":[]};
  }
  return res;
};

export const addGroup = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/settings/group", {
    method: "POST",
    body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  //   console.log("data", data);
  return data;
};


export const updateGroup = async (modifiedData: any, id: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/settings/group/${id}`, {
    method: "PUT",
    body: JSON.stringify(modifiedData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  //   console.log("data", data);
  return data;
};
