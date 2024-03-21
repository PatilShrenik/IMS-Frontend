import { baseURL } from "../../../constants";

export const getAllPolicy = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/policy", {
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
  } catch (error) {
    console.error(error);
  }
};

export const getPolicyById = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/policy/${props}`, {
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
  } catch (error) {
    console.error(error);
  }
};

export const addPolicies = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/policy", {
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
  } catch (error) {
    console.error(error);
  }
};

export const deletePolicy = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/policy/${props}`, {
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
  } catch (error) {
    console.error(error);
  }
};

export const deleteBulkPolicy = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/policy/`, {
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
  } catch (error) {
    console.error(error);
  }
};

export const updatePolicy = async (modifiedData: any, id: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/policy/${id}`, {
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
  } catch (error) {
    console.error(error);
  }
};
