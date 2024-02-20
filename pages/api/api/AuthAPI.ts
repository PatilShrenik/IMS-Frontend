import { baseURL } from "@/constants";

export const login = async (props: any) => {
  try {
    const res = await fetch(baseURL + "/api/v1/authenticate", {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const logout = async () => {
  try {
    const res = await fetch(baseURL + "/logout", {
      method: "POST",
      // body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
