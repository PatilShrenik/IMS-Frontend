import { baseURL } from "@/constants";

export const getUSerProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/settings/my-account", {
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
