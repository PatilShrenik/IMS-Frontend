// import { useState } from "react";

// export const getUnBlendedCost = async (data: any) => {
//   // console.log("data in api", data.data);
//   // console.log("date in api", data.date[0]);
//   // const [retData, setRetData] = useState();
//   let retData: any;
//   const parsedDate = data.date[0] && new Date(data.date[0]);
//   const parsedDate2 = data.date[1] && new Date(data.date[1]);

//   // Format the output date string in the desired format
//   const formattedDateString1 = parsedDate && parsedDate.toISOString();
//   const formattedDateString2 = parsedDate2 && parsedDate2.toISOString();
//   // console.log("Dates",formattedDateString1, formattedDateString2);
//   let body = {
//     gte: data.date[0],
//     lte: data.date[1],
//     accountnumb: data.Id,
//     accountname: "abmcpl",
//   };
//   // console.log("body in api", body);

//   const res = await fetch(`${finopsBaseUrl}/unblendedcost`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       // console.log(data);
//       // setRetData(data);
//       retData = data;
//       // console.log(retData);
//       // return data;
//     })
//     .catch(()=>{retData=[]});
//     ;
//   // console.log(retData);

//   return retData;
// };
