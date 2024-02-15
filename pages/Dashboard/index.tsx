// import Loader from "@/pages/Components/loader";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const Dashboard = () => {
//   const [role, setRole] = useState<any>();
//   const percent = (100 / 1500) * 100;
//   useEffect(() => {
//     setRole(sessionStorage.getItem("userRole"));
//   }, []);
//   return (
//     <div

//     >
//       <div className="text-xl border-b-2  border-slate-400 pb-2 px-4">
//         Dashboard
//       </div>
//       <div className="flex flex-wrap mt-4 justify-start">
//         <div className="w-[25%] h-[130px] mb-4">
//           <Link
//             className="w-full flex justify-center items-center h-full"
//             href={"/page/FinOps/reports"}
//           >
//             <div className="cursor-pointer  hover:shadow-lg relative m-2 p-2 pl-4 bg-white rounded-lg w-full h-full flex gap-2 justify-start overflow-hidden items-start flex-col shadow-md">
//               <div className="w-[4px] h-full bg-red-400 absolute left-0 top-0"></div>
//               <p className="text-red-400 font-bold text-lg">Cost Summary</p>
//               <div className="flex flex-col">
//                 <span>• Budgeted</span>
//                 <span>• Projected</span>
//                 <span>• Current Spend</span>
//               </div>
//             </div>
//           </Link>
//         </div>

//         <div className="w-[25%] h-[130px] flex justify-center items-center mb-4">
//           <div className="cursor-pointer  hover:shadow-lg relative m-2 p-2 pl-4 bg-white rounded-lg w-full h-full flex gap-2 justify-start overflow-hidden items-start flex-col shadow-md">
//             <div className="w-[4px] h-full bg-green-400 absolute left-0 top-0"></div>
//             <p className="text-green-500 font-bold text-lg">Security Score</p>

//             <div className="flex flex-col">
//               <span>Coming Soon...</span>
//             </div>
//           </div>
//         </div>

//         <div className="w-[25%] h-[130px] flex justify-center items-center mb-4">
//           <div className="cursor-pointer  hover:shadow-lg relative m-2 p-2 pl-4 bg-white rounded-lg w-full h-full flex gap-2 justify-start overflow-hidden items-start flex-col shadow-md">
//             <div className="w-[4px] h-full bg-blue-400 absolute left-0 top-0"></div>
//             <p className="text-blue-500 font-bold text-lg">Business Service</p>

//             <div className="flex flex-col">
//               <span>Coming Soon...</span>
//               {/* <Loader percent={(3 / 5) * 100} color={"blue"} /> */}
//             </div>
//           </div>
//         </div>

//         <div className="w-[25%] h-[130px] flex justify-center items-center mb-4">
//           <div className="cursor-pointer  hover:shadow-lg relative m-2 p-2 pl-4 bg-white rounded-lg w-full h-full flex gap-2 justify-start overflow-hidden items-start flex-col shadow-md">
//             <div className="w-[4px] h-full bg-pink-400 absolute left-0 top-0"></div>
//             <p className="text-pink-500 font-bold text-lg">Managed Asset</p>

//             <div className="flex flex-col">
//               <span>Coming Soon...</span>
//               {/* <Loader percent={percent} color={"pink"} /> */}
//             </div>
//           </div>
//         </div>

//         <div className="w-[25%] h-[130px] flex justify-center items-center mb-4">
//           <div className="cursor-pointer  hover:shadow-lg relative m-2 p-2 pl-4 bg-white rounded-lg w-full h-full flex gap-2 justify-start overflow-hidden items-start flex-col shadow-md">
//             <div className="w-[4px] h-full bg-orange-400 absolute left-0 top-0"></div>
//             <p className="text-orange-500 font-bold text-lg">
//               Active Incidents
//             </p>
//             <div className="flex flex-col">
//               <span>Coming Soon...</span>
//             </div>
//           </div>
//         </div>

//         <div className="w-[25%] h-[130px] flex justify-center items-center mb-4">
//           <div className="cursor-pointer  hover:shadow-lg relative m-2 p-2 pl-4 bg-white rounded-lg w-full h-full flex gap-2 justify-start overflow-hidden items-start flex-col shadow-md">
//             <div className="w-[4px] h-full bg-purple-400 absolute left-0 top-0"></div>
//             <p className="text-purple-400 font-bold text-lg">
//               Active Service Request
//             </p>
//             <div className="flex flex-col">
//               <span>Coming Soon...</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";

const index = () => {
  return <div>DashBoard</div>;
};

export default index;
