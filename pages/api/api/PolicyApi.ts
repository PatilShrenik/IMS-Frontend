import { baseURL } from "../../../constants";

export const getAllPolicy = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/alert/policy", {
    method: "GET",
    // body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  //   console.log("data", data);
  return data;
};

export const getPolicyById = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/alert/policy/${props}`, {
    method: "GET",
    // body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  //   console.log("data", data);
  return data;
};

export const addPolicies = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/alert/policy", {
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

export const deletePolicy = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/alert/policy/${props}`, {
    method: "Delete",
    // body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  //   console.log("data", data);
  return data;
};

export const deleteBulkPolicy = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/alert/policy/`, {
    method: "Delete",
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

export const updatePolicy = async (modifiedData: any, id: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/alert/policy/${id}`, {
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
