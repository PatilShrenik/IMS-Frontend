import { baseURL } from "@/constants";

export const getSNMPTemp = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/settings/snmp-template", {
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

export const getSNMPTempById = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/settings/snmp-template/${props}`, {
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

export const addSNMPTemp = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/settings/snmp-template", {
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

export const deleteSNMPTemp = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/settings/snmp-template/${props}`, {
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

export const deleteBulkSNMPTemp = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/settings/snmp-template/`, {
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

export const updateSNMPTemp = async (modifiedData: any, id: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + `/api/v1/settings/snmp-template/${id}`, {
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
