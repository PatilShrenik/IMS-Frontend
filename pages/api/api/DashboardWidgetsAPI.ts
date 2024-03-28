import { baseURL } from "@/constants";

export const GetAllDashboard = async () => {
  const token = localStorage.getItem("token");
  let res: any;
  try {
    res = await fetch(baseURL + `/api/v1/visualization/dashboard/`, {
      method: "GET",
      //   body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.json();
  } catch (error) {
    console.error("Error getting dashboard data", error);
    res = {};
  }
  // const data = await res.json();
  //   console.log("API data", data);
  return res;
};

export const CreateDashboard = async (props: any) => {
  const token = localStorage.getItem("token");
  let res: any;
  try {
    res = await fetch(baseURL + `/api/v1/visualization/dashboard/`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.json();
  } catch (error) {
    console.error("Error getting dashboard data", error);
    res = {};
  }
  // const data = await res.json();
  //   console.log("API data", data);
  return res;
};

export const GetDashboardWidgetsData = async (id: any) => {
  const token = localStorage.getItem("token");
  console.log("dashboard id in api", id);
  let res: any;
  try {
    res = await fetch(baseURL + `/api/v1/visualization/dashboard/${id}`, {
      method: "GET",
      //   body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.json();
  } catch (error) {
    console.error("Error getting dashboard data", error);
    res = {};
  }
  // const data = await res.json();
  //   console.log("API data", data);
  return res;
};

export const UpdateWidgetsData = async (id: any, body: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/visualization/dashboard/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("API data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetWidgetsData = async (id: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/visualization/widget/${id}`, {
      method: "GET",
      //   body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    //   console.log("API data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllWidget = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/visualization/widget", {
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

export const deleteWidgt = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/visualization/widget/${props}`, {
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
