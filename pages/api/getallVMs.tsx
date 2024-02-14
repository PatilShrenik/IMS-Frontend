// export const GetAllVMs = async () => {
//   try {
//     const bodyData = {
//       service: "Virtual Machines",
//     };
//     const res = await fetch("http://95.217.191.79:8002/serviceList", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(bodyData),
//     });

//     const data = await res.json();
//     // console.log("------------", res);
//     return data.data;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };


import axios from "axios";
import  {baseURL}  from "@/const";
// const baseURL = "http://localhost:8000/";
export async function GetAllVMs() {
  // console.log("-------------",id)
  return await axios.get(baseURL+"allVMsData")
}
