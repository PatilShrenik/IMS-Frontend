import { baseURL } from "../../../constants";
// const refreshToken = async () => {
//   // Implement the logic to refresh the token using the refresh token
//   const refresh_token = localStorage.getItem("refreshToken");
//   // Make a request to your refresh token endpoint
//   const refreshResponse = await fetch(baseURL + "/api/v1/refresh", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${refresh_token}`,
//     },
//   });

//   const refreshData = await refreshResponse.json();

//   if (refreshResponse.ok) {
//     // If refresh is successful, update the token in localStorage
//     localStorage.setItem("token", refreshData.access_token);
//     return refreshData.access_token;
//   } else {
//     // If refresh fails, you may want to handle this according to your application's requirements
//     throw new Error("Token refresh failed");
//   }
// };

// const handleTokenExpiration = async (originalRequest: any, token: any) => {
//   try {
//     const response = await originalRequest();
//     const data = response.json().then((res: any) => {
//       if (res.status == "success") {
//         return res;
//       } else if (res.status == "fail") {
//         // If the error is due to token expiration, try refreshing the token
//         const newToken = await refreshToken();
//         // Update the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         // Retry the original request
//         return originalRequest();
//       }
//     });
//     // console.log("response add device",data)
//   } catch (error: any) {
//     console.log(error);
//   }
// };

// const fetchWithToken = async (url: any, options: any) => {
//   const token = localStorage.getItem("token");
//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       "Content-Type": "application/json",
//       Authorization: `Bearero ${token}`,
//     },
//   });

//   return response;
// };

// export const addSingleDevice = async (props: any) => {
//   return handleTokenExpiration(
//     () =>
//       fetchWithToken(baseURL + "/api/v1/settings/device", {
//         method: "POST",
//         body: JSON.stringify(props),
//       }),
//     localStorage.getItem("token")
//   );
// };
export const addSingleDevice = async (props: any) => {
  const token = localStorage.getItem("token");
  // console.log("data in add single device", props);
  let res: any;
  try {
    res = await fetch(baseURL + "/api/v1/settings/device", {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e: any) {
    console.log("error in adding single device", e);
    res = "";
  }
  // console.log("data", data);
  return res.json();
};

export const getAllDevice = async () => {
  const token = localStorage.getItem("token");
  let res: any;
  try {
    res = await fetch(baseURL + "/api/v1/settings/device", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.text();
    res = await JSON.parse(res);
    // console.log("res parse-",res)
  } catch (error: any) {
    console.log("error in getting all device data", error);
    res = { result: [] };
  }
  // console.log("data", data);
  // console.log("data2", data2);
  return res;
};

export const getDeviceByID = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/${props}`, {
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
    console.error(error);
  }
};

export const deleteSingleDevice = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/${props}`, {
      method: "DELETE",
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
    console.error(error);
  }
};

export const bulkActionDeviceDelete = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/`, {
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
    console.error(error);
  }
};

export const updateSingleDevice = async (props: any) => {
  console.log(props);
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/${props.id}`, {
      method: "PUT",
      body: JSON.stringify(props.bodydata),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const runDiscovery = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/runDiscovery`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const enableMonitoring = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/device/enableMonitoring`,
      {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const disableMonitoring = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/device/disableMonitoring`,
      {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const enableDeviceSingle = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/enable`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const disableDeviceSingle = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/disable`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const enableFlowSingle = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/enableFlow`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const disableFlowSingle = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device/disableFlow`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//Bulk Porvision

export const getAllDeviceManager = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/device-manager", {
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
    console.error(error);
  }
};

export const addDeviceManager = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/device-manager", {
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
    console.error(error);
  }
};

export const updateSingleDeviceManager = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/device-manager/${props.bodyData._id}`,
      {
        method: "PUT",
        body: JSON.stringify(props.bodyData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    // console.log("edit data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const onBoardDeviceCsv = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + "/api/v1/settings/device/csvUpload", {
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
    console.error(error);
  }
};

export const deleteSingleDeviceManager = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/device-manager/${props}`,
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
    console.error(error);
  }
};

export const getDeviceManagerById = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/device-manager/${props}`,
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
    console.error(error);
  }
};

export const bulkProvisionActionDeviceDelete = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(baseURL + `/api/v1/settings/device-manager/`, {
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
    console.error(error);
  }
};

export const getDeviceDetailsByID = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/device/discoveryContext/${props}`,
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
    console.error(error);
  }
};

export const getMonitoringDetailsByDeviced = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/object/device/${props}`,
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
    // console.log("monitoringdata", data.result);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMonitoringDetailsByDeviced = async (props: any) => {
  const token = localStorage.getItem("token");
  try {
    // console.log("data in update monitoring", props);
    const res = await fetch(
      baseURL + `/api/v1/settings/object/${props.bodyData._id}`,
      {
        method: "PUT",
        body: JSON.stringify(props.bodyData),
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
    console.error(error);
  }
};

export const updateAvailabilityMonitorinngByDeviced = async (
  props: any,
  id: any
) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      baseURL + `/api/v1/settings/device/availabilityInterval/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(props.bodyData),
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
    console.error(error);
  }
};
