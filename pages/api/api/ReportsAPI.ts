import { baseURL } from "../../../constants";

export const getAllReports = async () => {
  try {
    const token = localStorage.getItem("token");
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
    console.log(error);
  }
};

export const getWidgetById = async (props: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(baseURL + `/api/v1/visualization/widget/${props}`, {
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
    console.log(error);
  }
};

export const addChartWidget = async (props: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(baseURL + "/api/v1/visualization/widget", {
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
    console.log(error);
  }
};

export const widgetDelete = async (props: any) => {
  try {
    const token = localStorage.getItem("token");
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
    console.log(error);
  }
};

export const deleteBulkWidget = async (props: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(baseURL + `/api/v1/visualization/widget/`, {
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
    console.log(error);
  }
};

export const updateWidget = async (modifiedData: any, id: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(baseURL + `/api/v1/visualization/widget/${id}`, {
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
    console.log(error);
  }
};
