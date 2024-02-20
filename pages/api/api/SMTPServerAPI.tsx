import { baseURL } from "../../constants";

export const updateSMTPServer = async (props: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseURL + "/api/v1/settings/smtp-server", {
    method: "PUT",
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

export const getSMTPServer = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(baseURL + "/api/v1/settings/smtp-server", {
      method: "GET",
    //   body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    //   console.log("data", data);
    return data;
  };
  