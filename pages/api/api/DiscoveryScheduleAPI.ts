import { baseURL } from "@/constants";

export const getAllDiscoverySch = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/discovery-scheduler", {
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

export const getDiscoverySchById = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/discovery-scheduler/${props}`,
      {
        method: "GET",
        // body: JSON.stringify(props),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    //   console.log("data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createDiscoverySch = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/discovery-scheduler", {
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

export const deleteDiscoverySch = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/discovery-scheduler/${props}`,
      {
        method: "DELETE",
        // body: JSON.stringify(props),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    //   console.log("data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteBulkDiscoverySch = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/discovery-scheduler/`, {
      method: "DELETE",
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

export const updateDiscSch = async (modifiedData: any, id: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/discovery-scheduler/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(modifiedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    //   console.log("data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
