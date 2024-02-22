import { baseURL } from "@/constants";

export const getIndicatorMapper = async () => {
  const token = localStorage.getItem("token");
  let res: any;
  try {
    res = await fetch(baseURL + "/api/v1/default/misc/indicatorMapper", {
      method: "GET",
      // body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = res.json();
  } catch (error: any) {
    console.log("error in getting indicator Mapper data", error);
    res = { result: [] };
  }

  // const data = await res.json();
  //   console.log("data", data);
  return res;
};
