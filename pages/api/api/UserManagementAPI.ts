import { baseURL } from "@/constants";

export const getAllUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/user", {
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

export const getUserById = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/user/${props}`,
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

export const createUser = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/user", {
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

export const deleteUser = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/user/${props}`,
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
export const deleteBulkUser = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/user`, {
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

export const updateUser = async (modifiedData: any, id: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/user/${id}`,
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
