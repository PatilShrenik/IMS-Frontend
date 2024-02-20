import { baseURL } from "../../constants";

export const getAllRole = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/settings/role", {
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

export const getRoleById = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/settings/role/${props}`, {
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

export const addRole = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/settings/role", {
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

export const deleteRoleById = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/settings/role/${props}`, {
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
