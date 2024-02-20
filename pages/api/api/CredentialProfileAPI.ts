import { baseURL } from "../../../constants";

export const getAllCredsProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(baseURL + "/api/v1/settings/credential-profile", {
      method: "GET",
      // body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createCredsProfile = async (props: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(baseURL + "/api/v1/settings/credential-profile", {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCredsProfileById = async (props: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      baseURL + `/api/v1/settings/credential-profile/${props}`,
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
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCredsProfile = async (props: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      baseURL + `/api/v1/settings/credential-profile/${props}`,
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
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const bulkActionCredsProfileDelete = async (props: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(baseURL + `/api/v1/settings/credential-profile/`, {
      method: "DELETE",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCredsProfile = async (modifiedData: any, id: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      baseURL + `/api/v1/settings/credential-profile/${id}`,
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
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
