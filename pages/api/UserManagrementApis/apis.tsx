import { finopsServerBaseUrl } from "@/const";

export async function createUserAndSubscription(body: any) {
    let resData: any;
    try {
      resData = await fetch(`${finopsServerBaseUrl}/createUserAndSubscriptionInMongo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      resData = await resData.json();
    } catch {
      resData = "";
    }
    return resData;
  }

  export async function updateUserAndSubscription(body: any) {
    let resData: any;
    try {
      resData = await fetch(`${finopsServerBaseUrl}/updateUserAndSubscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      resData = await resData.json();
    } catch {
      resData = "";
    }
    return resData;
  }