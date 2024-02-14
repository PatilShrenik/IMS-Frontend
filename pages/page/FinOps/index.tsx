// "use client";
// import React, { useState } from "react";
// import { Tab, Tabs } from "@mui/material";
// import TabPanel from "@mui/lab/TabPanel";
// import TabContext from "@mui/lab/TabContext";
// // import CostSummary from "./CostSummary";
// // import TagCompliance from "./TagCompliance";
// // import Forecast from "./Forecast";
// import dynamic from "next/dynamic";
// // import router from "next/router";

// import { IoIosArrowBack } from "react-icons/io";
// import Link from "next/link";
// import { red } from "@mui/material/colors";
// import { useRouter } from "next/router";


// function FinOps() {
//   // const userADID
//   // let userRole: string | null;
//   // const DynamicDateRangePicker = dynamic(() => import('rsuite').then((mod) => mod.DateRangePicker), {
//   //   ssr: false, // Set this to false to disable server-side rendering for the component
//   // });
//   //   CostDrillDown
//   const router = useRouter();
//   const { report }: any = router.query;
//   // const [value1, setValue1] = useState<any>("CostDrillDown");
//   const [value1, setValue1] = useState<any>(report || "CostSummary");
//   const [redBg, setRedBg] = useState(false);
//   // console.log("report - ",value1)
//   const handleChange = (event: React.SyntheticEvent, newValue: any) => {
//     router.push(`/page/FinOps?report=${newValue}`, undefined, {
//       shallow: true,
//     });
//     setValue1(newValue);
//   };
//   const customTabsStyle = {
//     width: "fit-content",
//     borderRadius: "50vw",
//     overflow: "hidden",
//     border: "1px solid #d5c5ee",
//     height: "max-content",
//     zIndex: 1,
//     margin: "auto",
//     minHeight: "10px",
//     maxHeight: "36px",
//     display: "flex", // Add display flex
//     alignItems: "center", // Center vertically
//   };

//   const tabIndicatorStyle = {
//     background: "transparent linear-gradient(273deg, #c52828 0%, #e95555 100%)",
//     boxShadow: "inset 0 0 0 3px white",
//     border: "7px solid white",
//     zIndex: 2,
//     height: "100%",
//     borderRadius: "50vw",
//   };

//   return (
//     <div className="Newfinops-container h-auto">
//       <div className="h-auto">
//         <TabContext value={value1}>
//           <div className="relative mb-4 p-3 bg-white rounded-lg dark:bg-gray-400">
//             <Link
//               className="z-10 absolute left-2 h-fit w-fit cursor-pointer top-1/2 -translate-y-1/2 flex justify-center items-center"
//               href={"/page/FinOps/reports"}
//             >
//               <IoIosArrowBack size={25} />
//             </Link>
//             <Tabs
//               value={value1}
//               onChange={handleChange}
//               style={customTabsStyle}
//               centered
//               TabIndicatorProps={{ style: tabIndicatorStyle }}
//             >
//               <Tab
//                 value={"CostSummary"}
//                 label="Multi-cloud Cost Summary"
//                 style={{
//                   color: value1 === "CostSummary" ? "white" : "black",
//                   zIndex: value1 === "CostSummary" ? 3 : 0,
//                 }}
//               />
//               <Tab
//                 value={"CostDrillDown"}
//                 label="Granular Cost Drill Down"
//                 style={{
//                   color: value1 === "CostDrillDown" ? "white" : "black",
//                   zIndex: value1 === "CostDrillDown" ? 3 : 0,
//                 }}
//               />
//               <Tab
//                 value={"TagCompliance"}
//                 label="Tag Compliance"
//                 style={{
//                   color: value1 === "TagCompliance" ? "white" : "black",
//                   zIndex: value1 === "TagCompliance" ? 3 : 0,
//                 }}
//               />
//               <Tab
//                 value={"Forecast"}
//                 label="Forecast & Recommendations"
//                 style={{
//                   color: value1 === "Forecast" ? "white" : "black",
//                   zIndex: value1 === "Forecast" ? 3 : 0,
//                 }}
//               />
//             </Tabs>
//           </div>

          
//         </TabContext>
//       </div>
//     </div>
//   );
// }

// export default FinOps;
