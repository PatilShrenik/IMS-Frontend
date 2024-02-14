import React, { useEffect, useState } from "react";
import { tableData } from "../api/tableData";
import Link from "next/link";
import { getAllTopo } from "../api/getAllTopo";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getAllUsers } from "../api/FinopsApi/GetAllUsers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import {
  createUserAndSubscription,
  updateUserAndSubscription,
} from "../api/UserManagrementApis/apis";
const UserManagement = () => {
  // const [data, setData] = useState<any>([
  //   {
  //     adId: "akash.purohit@adityabirla.com",
  //     userName: "Akash Purohit",
  //     userRole: "BE",
  //     businessName: "ABMCPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "ABMCPL_Sustainability",
  //         subsAccId: "408556261117",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "ashish.desai@adityabirla.com",
  //     userName: "Ashish Desai",
  //     userRole: "BE",
  //     businessName: "TAF & OS",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Thai_Acrylic_Fibre_Overseas_Spinning-AWS",
  //         subsAccId: "924698357488",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Kulvinder Marwah",
  //             adid: "kulvinder.marwah@adityabirla.com",
  //           },
  //           {
  //             name: "Prashant Tijare",
  //             adid: "p.tijare@adityabirla.com",
  //           },
  //           {
  //             name: "Krunal Surati",
  //             adid: "krunal.surati@adityabirla.com",
  //           },
  //           {
  //             name: "Harshraj Sanghvi",
  //             adid: "harshraj.sanghvi@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "bhuwan.phuloria@adityabirla.com",
  //     userName: "Bhuwan Phuloria",
  //     userRole: "BE",
  //     businessName: "UTCL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Microsoft Azure Enterprise",
  //         subsAccId: "6f148934-a78a-45aa-a089-a8f164fcaecb",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Bhuwan Phuloria",
  //             adid: "bhuwan.phuloria@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Ultratech-Prod",
  //         subsAccId: "9afeb24a-8c64-44d3-ae87-4438dffa9ca4",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Bhuwan Phuloria",
  //             adid: "bhuwan.phuloria@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "devender.rawat@adityabirla.com",
  //     userName: "Devender Rawat",
  //     userRole: "ADMIN",
  //     businessName: "BMCSPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "GIT-Connectivity-Account",
  //         subsAccId: "419872061991",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "sharma.gaurav@adityabirla.com",
  //     userName: "Gaurav Sharma",
  //     userRole: "BE",
  //     businessName: "BirlaPivot",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "ABG_B2B_Commerce_Pivot-Prod",
  //         subsAccId: "84534433159",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Keshav Keshu",
  //             adid: "keshav.keshu@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "gopi.t@adityabirla.com",
  //     userName: "Gopi Tathi",
  //     userRole: "BE",
  //     businessName: "Pulp & Fibre",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Gopi Tathi",
  //         subsAccId: "281897532807",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Ashok Talakokkula",
  //             adid: "ashok.talakokkula@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "harshad.mengle@adityabirla.com",
  //     userName: "Harshad Mengle",
  //     userRole: "BE",
  //     businessName: "BMCSPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "GIT SOC Azure",
  //         subsAccId: "f61d2481-6b58-4851-bafc-3c54fb9efefa",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Narendra Varma",
  //             adid: "Narendra.Varma@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GIT_Block Armour - Azure Subscription",
  //         subsAccId: "70a4c035-126e-46e0-89d7-15858f7f8489",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Narendra Varma",
  //             adid: "Narendra.Varma@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GIT_Infosec - Azure Subscription",
  //         subsAccId: "222faa82-d657-41b6-ba26-0ad464163070",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Shrinivas Naik",
  //             adid: "shrinivas.naik@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GIT-Private Access - Azure Subscription",
  //         subsAccId: "e20b0e9c-dd02-4b00-accd-ed82010915c3",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Aniket Utekar",
  //             adid: "Aniket.Utekar@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GIT-Internal_Transit_SOC-Account",
  //         subsAccId: "696391982620",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Narendra Varma",
  //             adid: "Narendra.Varma@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "harshad.raut@adityabirla.com",
  //     userName: "Harshad Raut",
  //     userRole: "BE",
  //     businessName: "BMCSPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Test_Account-AWS",
  //         subsAccId: "488330780497",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Pankaj Pawar",
  //             adid: "pankaj.pawar@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "s.ilanngo@adityabirla.com",
  //     userName: "Ilango Nadar",
  //     userRole: "BE",
  //     businessName: "Birla Carbon",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "BC Non Production Subscription",
  //         subsAccId: "c13b2829-02a6-4bd7-aa07-5c2143a6ee73",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BC Production Subscription",
  //         subsAccId: "3c3370e0-d5b7-4d7a-81bb-fe78a73dd72e",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BC-Identity Subscription",
  //         subsAccId: "9f7509d0-627c-4cce-9e28-cac2de12bd5b",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BC Connectivity Subscription",
  //         subsAccId: "834bf574-3bfc-46e8-87d8-65ac6e125bb6",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BC Datalake Production 01",
  //         subsAccId: "8df5b36b-58e1-4ade-8e50-8b7ab414eca8",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BC Management Subscription",
  //         subsAccId: "29a68116-a95e-4378-b5cb-97f27b02c47e",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BC Sandbox Subscription",
  //         subsAccId: "5650ba1c-2ed1-4abe-a194-9035b03cc3a8",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BC Services Production 01",
  //         subsAccId: "5a942dd0-0e0e-4339-88a1-f508e93088b6",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BC VDI Production 01",
  //         subsAccId: "1d34bd3b-f4e6-4108-bb11-e6e5105e35b3",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sourabh Mane",
  //             adid: "Sourabh.Mane@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "Jitender.Gupta@adityabirla.com",
  //     userName: "Jitendra Gupta",
  //     userRole: "BE",
  //     businessName: "EPOXY",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Epoxy Azure Subscription",
  //         subsAccId: "c8a43576-b6eb-49a9-8015-a362832c795a",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Javid Saiyed",
  //             adid: "javid.saiyed@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "Kamlesh.ghag@applause.adityabirla.com",
  //     userName: "Kamlesh Ghah",
  //     userRole: "BE",
  //     businessName: "Applause",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Applause ABG",
  //         subsAccId: "458481670540",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "mahendrasing.nikumbh@abet.co.in",
  //     userName: "Mahendrasing Nikumbh",
  //     userRole: "BE",
  //     businessName: "ABET",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Aditya_Birla_Education_Trust_PROD-AWS",
  //         subsAccId: "879140193687",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "mehul.shroff@adityabirla.com",
  //     userName: "Mehul Shroff",
  //     userRole: "BE",
  //     businessName: "Seamex",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "BMCSL SeamEx Subscription",
  //         subsAccId: "d1194059-b595-4518-950e-64558c1dfee8",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sagar Wandhe",
  //             adid: "sagar.wandhe@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "muthu.vijayan@adityabirla.com",
  //     userName: "Muthu Vijayan",
  //     userRole: "BE",
  //     businessName: "ABMCPL IIOT",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "OneABG Industrial Cloud - Azure Subscription",
  //         subsAccId: "fac5ab87-1907-40c9-a4ad-1a185d65fcb4",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Muthu Vijayan",
  //             adid: "muthu.vijayan@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "nehal.bazari@adityabirla.com",
  //     userName: "Nehal Bazari",
  //     userRole: "BE",
  //     businessName: "Eternia",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Hindalco_Industries_Ltd-Eternia-AWS",
  //         subsAccId: "965043850852",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "prashant.pandit@adityabirla.com",
  //     userName: "Prashant Pandit",
  //     userRole: "ADMIN",
  //     businessName: "BMCSPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "BMCSL AVD Subscription",
  //         subsAccId: "07f8492a-a209-44e5-8035-8c87e8b6e1d0",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BMCSL_WVDNew",
  //         subsAccId: "be73f2d0-52cf-4a2f-ba0b-6de55ccf32e6",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "ChatBot Azure Subscription",
  //         subsAccId: "fea4c2f0-68a9-4eaa-9088-48b5ea9045c7",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajesh Pal",
  //             adid: "r.pal@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GIT Infra Apps Azure Subscription",
  //         subsAccId: "a13dae5f-3f6a-442f-852c-3110b8b51e0e",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Pankaj Pawar",
  //             adid: "pankaj.pawar@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "prasoon.garg@applause.adityabirla.com",
  //     userName: "Prasoon Ghag",
  //     userRole: "BE",
  //     businessName: "Applause",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Applause Entertainment",
  //         subsAccId: "117222297094",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "Priten.Bangdiwala@adityabirla.com",
  //     userName: "Priten Bangdiwala",
  //     userRole: "BE",
  //     businessName: "ABMCPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "ABMCPL_One-ABG Industrial Cloud",
  //         subsAccId: "430176498910",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Satyachaitanya Addalla",
  //             adid: "satyachaitanya.a@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "ramesh.r@adityabirla.com",
  //     userName: "Ramesh Rajagopalakrishnan",
  //     userRole: "BE",
  //     businessName: "Grasim Chemicals",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Grasim Chemical Division - DR NON-PROD",
  //         subsAccId: "430ec80a-4d88-4104-9907-c6d1253707ae",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rahul Chandak",
  //             adid: "Rahul.Chandak@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Grasim Chemical Division - DR PROD",
  //         subsAccId: "6dbbdbb0-92d7-4e49-a47d-31dc590664ed",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rahul Chandak",
  //             adid: "Rahul.Chandak@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Grasim Chemical Division - NON PROD",
  //         subsAccId: "1bd0ef5a-bae0-4adc-9015-c0864cbae268",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rahul Chandak",
  //             adid: "Rahul.Chandak@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Grasim Chemical Division - PROD",
  //         subsAccId: "bbe9815b-b792-4f3d-a601-94380a26964d",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rahul Chandak",
  //             adid: "Rahul.Chandak@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GrasimChemicals-AWS-IND",
  //         subsAccId: "347692176337",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Rahul Chandak",
  //             adid: "Rahul.Chandak@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "rishi.jethva@ssiplglobal.com",
  //     userName: "Rishi Jethva",
  //     userRole: "BE",
  //     businessName: "BMCSPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Rishi Jethva",
  //         subsAccId: "389611423661",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "rishikesh.singh@adityabirla.com",
  //     userName: "Rishikesh Singh",
  //     userRole: "BE",
  //     businessName: "Domestic Textiles",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Domestic Textiles",
  //         subsAccId: "3b6f78fd-a5ca-49c7-be22-a5f4a6d20294",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Harshraj Sanghvi",
  //             adid: "harshraj.sanghvi@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Grasim Kolkata",
  //         subsAccId: "889594101536",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Abhijeet Patil",
  //             adid: "abhijeet.patil@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "Sandeep.Mistry@adityabirla.com",
  //     userName: "Sandeep Mistry",
  //     userRole: "BE",
  //     businessName: "Novel Jewels",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Novel Jewels",
  //         subsAccId: "3132b746-ac36-4a58-a931-eb4471974b31",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sandeep Mistry",
  //             adid: "Sandeep.Mistry@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "santosh.panday@adityabirla.com",
  //     userName: "Santosh Pandey",
  //     userRole: "BE",
  //     businessName: "ABMCPL-IIOT",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "ABMCPL_OneABG_ICP_Prod-AWS",
  //         subsAccId: "384635972126",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "satyachaitanya.a@adityabirla.com",
  //     userName: "Satyachaitanya Addalla",
  //     userRole: " BE",
  //     businessName: "ABMCPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "ABMCPL API Gateway PoC - AWS",
  //         subsAccId: "385873574420",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Parag Dani",
  //             adid: "Parag.Dani@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "sunil.nagotkar@adityabirlanewage.com",
  //     userName: "Sunil Nagotkar",
  //     userRole: "BE",
  //     businessName: "ABNA",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Aditya_Birla_New_Age-AWS",
  //         subsAccId: "21824065561",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Mukesh Maurya",
  //             adid: "mukesh.maurya@adityabirlanewage.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "Tapas.Biswas@adityabirla.com",
  //     userName: "Tapas Biswas",
  //     userRole: "BE",
  //     businessName: "ABCEL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Aditya_Birla_Centre_Enrich_Lives-AWS",
  //         subsAccId: "374214069545",
  //         cloud: "AWS",
  //         subsContactADIDs: [],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "vijay.vora@adityabirla.com",
  //     userName: "Vijay Vora",
  //     userRole: "BE",
  //     businessName: "Hindalco",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Hindalco Azure Subscription",
  //         subsAccId: "78014c68-3452-4d3c-b64a-86b0115157a3",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Jagadeesh Challa",
  //             adid: "jagadeesh.challa@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Hindalco Industries Ltd Azure Subscription (Data Lake)",
  //         subsAccId: "0fec9ead-4e3c-42ba-bee0-a40cc60abb60",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Jagadeesh Challa",
  //             adid: "jagadeesh.challa@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Hindalco Industries Ltd - AWS",
  //         subsAccId: "231731493869",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Abhishek Sharma",
  //             adid: "abhishek.s.sharma@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "Vikas.Moon@adityabirla.com",
  //     userName: "Vikas Moon",
  //     userRole: "ADMIN",
  //     businessName: "BMCSPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Azure subscription 1",
  //         subsAccId: "54bbb68d-5541-4ef9-9425-7e1f529b8452",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Damini Bhalekar",
  //             adid: "damini.bhalekar@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BMCSL Azure Subscription",
  //         subsAccId: "f2be1378-24b6-4108-bd93-005ed3a133e5",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Sanket Bhostekar",
  //             adid: "sanket.b@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GISS - Azure ELZ Subscription",
  //         subsAccId: "955985c5-7f2f-488f-9634-cea728792281",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GISS - DR Shared Service Subscription",
  //         subsAccId: "616092a2-a5a8-4f8b-ac04-8d3472a9f29c",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GISS DR Cloud Gateway",
  //         subsAccId: "c70e6109-cd7a-4499-842f-3a439542f4b0",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GITSS-Azure Management Subscription",
  //         subsAccId: "0dc4c875-da9f-4032-a6e2-b96012da7430",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Parag Kothari",
  //             adid: "parag.kothari@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GITSS-Azure Shared Services Subscription",
  //         subsAccId: "92ce7eae-ad96-41e7-9e7e-2d8f1a5792f9",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Testing-Azure Subscription",
  //         subsAccId: "037f6d2f-8fd7-46fd-ac37-7a57ffa04c95",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Parag Kothari",
  //             adid: "parag.kothari@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BMCSPL-Cloud Automation Test -02",
  //         subsAccId: "7ca8c06e-25f5-42c0-8d09-8b1bde50bd99",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Damini Bhalekar",
  //             adid: "damini.bhalekar@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BMCSPL-Cloud Automation Test Subscription",
  //         subsAccId: "d906b212-26f7-433c-a77d-324a9cf35891",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Damini Bhalekar",
  //             adid: "damini.bhalekar@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "ABG-Audit",
  //         subsAccId: "379547844432",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Sanket Bhostekar",
  //             adid: "sanket.b@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "ABG-Log-Archive",
  //         subsAccId: "258537163095",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Sanket Bhostekar",
  //             adid: "sanket.b@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BIRLA MANAGEMENT CENTRE SERVICES LIMITED",
  //         subsAccId: "276963378071",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Sanket Bhostekar",
  //             adid: "sanket.b@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "BMCSPL-Cloud_Automation_Test-Account-AWS",
  //         subsAccId: "53165822230",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Parag Kothari",
  //             adid: "parag.kothari@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GIT-External_Transit_Firewall-Account",
  //         subsAccId: "346370328957",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "GIT-SharedServices-AWS",
  //         subsAccId: "806134927223",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "vinay.morje@adityabirla.com",
  //     userName: "Vinay Morje",
  //     userRole: "BE",
  //     businessName: "Pulp & Fibre",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Grasim Azure Subscription",
  //         subsAccId: "d8171501-9b21-42d3-a0da-d6216bab0785",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Ashok Talakokkula",
  //             adid: "ashok.talakokkula@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "vinodreddy.ninakanti@adityabirla.com",
  //     userName: "Vinodreddy Ninakanti",
  //     userRole: "BE",
  //     businessName: "Seamex",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "Digital HR Azure Subscription",
  //         subsAccId: "28baeb41-d833-4c09-a158-f97867421487",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Mehul Shroff",
  //             adid: "mehul.shroff@adityabirla.com",
  //           },
  //         ],
  //       },
  //       {
  //         subsAccName: "Digital HR Azure Subscription",
  //         subsAccId: "cf08664c-e443-44f3-ba5f-6a9f294ef598",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Mehul Shroff",
  //             adid: "mehul.shroff@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "vipul.shah@adityabirla.com",
  //     userName: "Vipul Shah",
  //     userRole: "BE",
  //     businessName: "Thai Chemicals",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "ABG Thai Chemicals",
  //         subsAccId: "233408322342",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Vipul Shah",
  //             adid: "vipul.shah@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "vivek.gupta@adityabirla.com",
  //     userName: "Vivek Gupta",
  //     userRole: "BE",
  //     businessName: "BirlaPivot",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "ABG_B2B_Commerce-AWS",
  //         subsAccId: "704004190738",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Gaurav Sharma",
  //             adid: "sharma.gaurav@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "Yatin.Shetye@adityabirla.com",
  //     userName: "Yatin Shetye",
  //     userRole: "ADMIN",
  //     businessName: "BMCSPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "BMCSL Services Production 01",
  //         subsAccId: "1263f8a3-564d-4415-ab9c-54cba7d79366",
  //         cloud: "Azure",
  //         subsContactADIDs: [
  //           {
  //             name: "Rajit Bhat",
  //             adid: "rajit.bhat@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "zohra.baig@adityabirla.com",
  //     userName: "Zohra Baig",
  //     userRole: "BE",
  //     businessName: "ABMCPL",
  //     status: "active",
  //     subscriptions: [
  //       {
  //         subsAccName: "INTABC",
  //         subsAccId: "353546700314",
  //         cloud: "AWS",
  //         subsContactADIDs: [
  //           {
  //             name: "Sanket Doshi",
  //             adid: "sanket.doshi@adityabirla.com",
  //           },
  //         ],
  //       },
  //     ],
  //     userType: "Owner",
  //   },
  //   {
  //     adId: "ABG1@gmail.com",
  //     userName: "ABG ADMIN",
  //     userRole: "ADMIN",
  //     businessName: "BMCSPL",
  //     status: "active",
  //     subscriptions: [],
  //     userType: "Owner",
  //   },
  // ]);
  const [data, setData] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<any>(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState<any>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [businessLogo, setBusinessLogo] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const [itemsPerPage] = useState(5);

  const filteredData =
    data &&
    data.filter(
      (d: any) =>
        d.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.adId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // Add more fields as needed
        (d.subscriptions &&
          d.subscriptions.some((sub: any) =>
            sub.subsContactADIDs?.some(
              (contact: any) =>
                contact.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                contact.adid.toLowerCase().includes(searchQuery.toLowerCase())
            )
          ))
    );

  const totalItems = filteredData && filteredData.length;
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData && filteredData.slice(startIndex, endIndex);
  const handleViewDetailsClick = (rowData: any) => {
    // console.log("----------------", rowData);
    setSelectedRowData(rowData);
    setIsViewModalOpen(true);
  };
  // useEffect(() => {
  //   data && setCount(data.length);
  //   increaseCount();
  // }, [data]);
  // const increaseCount = () => {
  //   count && setCount(count + 1 - count);
  // };
  // console.log("countdata", count);

  const handleEditDetailsClick = (rowData: any) => {
    // console.log("----------------", rowData);
    setSelectedRowData(rowData);
    setEditModalOpen(true);
  };

  // let count = 1;
  const [userData, setUserData] = useState({
    businessName: "",
    ownerName: "",
    ownerEmail: "",
    role: "BE",
  });
  // const [contactDetails, setContactDetails] = useState<any>([
  //   { contactName: "", contactEmail: "" },
  // ]);

  // const [subscriptionDetail, setSubscriptionDetail] = useState<any>([
  //   {
  //     cloud: "",
  //     subsAccName: "",
  //     subsAccId: "",
  //     contactDetails: [contactDetails[0]],
  //   },
  // ]);
  const [subscriptionDetail, setSubscriptionDetail] = useState([
    {
      cloud: "",
      subsAccName: "",
      subsAccId: "",
      type: "",
      contactDetails: [{ contactName: "", contactEmail: "" }],
    },
  ]);
  const [editedUserData, setEditedUserData] = useState({
    businessName: "",
    ownerName: "",
    ownerEmail: "",
    role: "BE",
  });

  // const [editedContactDetails, setEditedContactDetails] = useState<any>([
  //   { contactName: "", contactEmail: "" },
  // ]);

  const [editedSubscriptionDetail, setEditedSubscriptionDetail] = useState<any>(
    [
      {
        cloud: "",
        subsAccName: "",
        subsAccId: "",
        contactDetails: [{ contactName: "", contactEmail: "" }],
      },
    ]
  );

  useEffect(() => {
    if (selectedRowData) {
      setEditedUserData({
        businessName: selectedRowData.businessName,
        ownerName: selectedRowData.userName,
        ownerEmail: selectedRowData.adId,
        role: selectedRowData.userRole,
      });
      setEditedSubscriptionDetail((prevData: any) => [
        {
          ...prevData,
          contactDetails:
            selectedRowData.subscriptions &&
            selectedRowData.subscriptions.subsContactADIDs &&
            selectedRowData.subscriptions.subsContactADIDs.map(
              (contact: any) => ({
                contactName: contact.name,
                contactEmail: contact.adid,
              })
            ),
        },
      ]);

      setEditedSubscriptionDetail(selectedRowData.subscriptions);
    }
  }, [selectedRowData]);

  // editedSubscriptionDetail &&
  // console.log("edited data", editedSubscriptionDetail);
  const handleEditUserDataChange = (e: any) => {
    const { name, value } = e.target;
    setEditedUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleEditContactChange = (
    subscriptionIndex: any,
    contactIndex: any,
    event: any
  ) => {
    const newSubscriptionDetail = [...editedSubscriptionDetail];

    // Destructure the relevant properties
    const { name, value } = event.target;

    // Update the nested structure
    newSubscriptionDetail[subscriptionIndex].subsContactADIDs[contactIndex] = {
      ...newSubscriptionDetail[subscriptionIndex].subsContactADIDs[
        contactIndex
      ],
      [name]: value,
    };

    // Set the updated state
    setEditedSubscriptionDetail(newSubscriptionDetail);
  };

  const handleEditSubscriptionChange = (subscriptionIndex: any, event: any) => {
    const newSubscriptionDetail = [...editedSubscriptionDetail];
    newSubscriptionDetail[subscriptionIndex] = {
      ...newSubscriptionDetail[subscriptionIndex],
      [event.target.name]: event.target.value,
    };
    setEditedSubscriptionDetail(newSubscriptionDetail);
  };

  const handleEditAddContact = (subscriptionIndex: any) => {
    const newSubscriptionDetail = [...editedSubscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].subsContactADIDs &&
      newSubscriptionDetail[subscriptionIndex].subsContactADIDs.push({
        name: "",
        adid: "",
      });
    if (!newSubscriptionDetail[subscriptionIndex].subsContactADIDs) {
      newSubscriptionDetail[subscriptionIndex].subsContactADIDs = [
        [
          {
            name: "",
            adid: "",
          },
        ],
      ];
    }
    setEditedSubscriptionDetail(newSubscriptionDetail);
  };

  const handleEditAddSubscription = () => {
    setEditedSubscriptionDetail([
      ...editedSubscriptionDetail,
      {
        cloud: "",
        subsAccName: "",
        subsAccId: "",
        type: "",
        subsContactADIDs: [[{ name: "", adid: "" }]],
      },
    ]);
  };

  const handleEditRemoveContact = (
    subscriptionIndex: any,
    contactIndex: any
  ) => {
    const newSubscriptionDetail = [...editedSubscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].subsContactADIDs &&
      newSubscriptionDetail[subscriptionIndex].subsContactADIDs.splice(
        contactIndex,
        1
      );
    setEditedSubscriptionDetail(newSubscriptionDetail);
  };

  const handleEditRemoveSubscription = (subscriptionIndex: any) => {
    const newSubscriptions = editedSubscriptionDetail.filter(
      (_: any, index: any) => index !== subscriptionIndex
    );
    setEditedSubscriptionDetail(newSubscriptions);
  };

  const isFormValid = () => {
    const isBusinessNameValid = userData.businessName.trim() !== "";
    const isOwnerNameValid = userData.ownerName.trim() !== "";
    const isOwnerEmailValid =
      userData.ownerEmail.trim() !== "" && isValidEmail(userData.ownerEmail);

    const areSubscriptionDetailsValid = subscriptionDetail.every(
      (subscription: any) =>
        subscription.cloud.trim() !== "" &&
        subscription.subsAccName.trim() !== "" &&
        subscription.subsAccId.trim() !== "" &&
        subscription.contactDetails.length > 0 &&
        subscription.contactDetails.every(
          (contact: any) =>
            contact.contactName.trim() !== "" &&
            contact.contactEmail.trim() !== "" &&
            isValidEmail(contact.contactEmail)
        ) &&
        (subscription.cloud !== "Azure" ||
          (subscription.cloud === "Azure" && subscription.type.trim() !== ""))
    );

    return (
      isBusinessNameValid &&
      isOwnerNameValid &&
      isOwnerEmailValid &&
      areSubscriptionDetailsValid
    );
  };
  const isEditFormValid = () => {
    // Validate business name
    const isBusinessNameValid = editedUserData.businessName.trim() !== "";

    // Validate owner name
    const isOwnerNameValid = editedUserData.ownerName.trim() !== "";

    // Validate owner email
    const isOwnerEmailValid =
      editedUserData.ownerEmail.trim() !== "" &&
      isValidEmail(editedUserData.ownerEmail);

    // Validate subscription details
    const areSubscriptionDetailsValid = editedSubscriptionDetail.every(
      (subscription: any) =>
        subscription.cloud.trim() !== "" &&
        subscription.subsAccName.trim() !== "" &&
        subscription.subsAccId.trim() !== "" &&
        ((subscription.subsContactADIDs &&
          subscription.subsContactADIDs.length === 0) || // Allow no contact details
          (subscription.subsContactADIDs &&
            subscription.subsContactADIDs.length > 0 &&
            subscription.subsContactADIDs.every(
              (contact: any) =>
                contact.name &&
                contact.name.trim() !== "" &&
                contact.adid &&
                contact.adid.trim() !== "" &&
                isValidEmail(contact.adid)
            ))) &&
        (subscription.cloud !== "Azure" ||
          (subscription.cloud === "Azure" &&
            subscription.type &&
            subscription.type.trim() !== ""))
    );

    return (
      isBusinessNameValid &&
      isOwnerNameValid &&
      isOwnerEmailValid &&
      areSubscriptionDetailsValid
    );
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // console.log(isFormValid());

  const handleUserDataChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubscriptionChange = (subscriptionIndex: any, event: any) => {
    const newSubscriptionDetail = [...subscriptionDetail];
    newSubscriptionDetail[subscriptionIndex] = {
      ...newSubscriptionDetail[subscriptionIndex],
      [event.target.name]: event.target.value,
    };
    setSubscriptionDetail(newSubscriptionDetail);
  };

  const handleContactChange = (
    subscriptionIndex: any,
    contactIndex: any,
    event: any
  ) => {
    const newSubscriptionDetail = [...subscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].contactDetails[contactIndex] = {
      ...newSubscriptionDetail[subscriptionIndex].contactDetails[contactIndex],
      [event.target.name]: event.target.value,
    };
    setSubscriptionDetail(newSubscriptionDetail);
  };

  const handleAddContact = (subscriptionIndex: any) => {
    const newSubscriptionDetail = [...subscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].contactDetails.push({
      contactName: "",
      contactEmail: "",
    });
    setSubscriptionDetail(newSubscriptionDetail);
  };
  // console.log("subscription detail", subscriptionDetail);
  const handleRemoveContact = (subscriptionIndex: any, contactIndex: any) => {
    const newSubscriptionDetail = [...subscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].contactDetails.splice(
      contactIndex,
      1
    );
    setSubscriptionDetail(newSubscriptionDetail);
  };

  const handleAddSubscription = () => {
    setSubscriptionDetail([
      ...subscriptionDetail,
      {
        cloud: "",
        subsAccName: "",
        subsAccId: "",
        type: "",
        contactDetails: [{ contactName: "", contactEmail: "" }],
      },
    ]);
  };

  const handleRemoveSubscription = (subscriptionIndex: any) => {
    const newSubscriptions = subscriptionDetail.filter(
      (_, index) => index !== subscriptionIndex
    );
    setSubscriptionDetail(newSubscriptions);
  };

  useEffect(() => {
    const blogo: any = sessionStorage.getItem("businessLogo");
    setBusinessLogo(blogo);
    dataFetch();
  }, []);
  async function dataFetch() {
    const res: any = await getAllUsers().then((res: any) => {
      setData(res);
    });
    // setData(res.data.sort());
  }

  const handleUpload = () => {
    // console.log("userdata", userData);
    // console.log("subscription", subscriptionDetail);
    // console.log("contact", contactDetails);

    const formData = {
      businessName: userData.businessName,
      userName: userData.ownerName,
      adId: userData.ownerEmail,
      role: userData.role,
      type: "Owner",
      status: "active",
      businessLogo: "Common.jpg",
      subscriptions: subscriptionDetail.map((subscription: any) => {
        const subscriptionData: any = {
          subsAccName: subscription.subsAccName,
          subsAccId: subscription.subsAccId,
          cloud: subscription.cloud,
          ownerADID: userData.ownerEmail,
          contactADID: [].concat(
            ...subscription.contactDetails.map((contact: any) => ({
              name: contact.contactName,
              adid: contact.contactEmail,
            }))
          ),
          // ],
          status: "active",
        };

        if (subscription.cloud === "Azure") {
          subscriptionData.type = subscription.type;
        } else {
          subscriptionData.type = "";
        }

        return subscriptionData;
      }),
    };

    // console.log(formData);
    createUserAndSubscription(formData).then((data) =>
      console.log("resp", data)
    );
    // console.log("payload", formData);
  };

  const handleEditUpload = () => {
    // console.log("userdata", userData);
    // console.log("subscription", subscriptionDetail);
    // console.log("contact", contactDetails);

    const formData = {
      businessName: editedUserData.businessName,
      userName: editedUserData.ownerName,
      adId: editedUserData.ownerEmail,
      role: editedUserData.role,
      type: "Owner",
      status: "active",
      businessLogo: businessLogo,
      subscriptions: editedSubscriptionDetail.map((subscription: any) => {
        const subscriptionData: any = {
          subsAccName: subscription.subsAccName,
          subsAccId: subscription.subsAccId,
          cloud: subscription.cloud,
          ownerADID: editedUserData.ownerEmail,
          contactADID:
            subscription.subsContactADIDs &&
            subscription.subsContactADIDs.map((contact: any) => ({
              name: contact.name,
              adid: contact.adid,
            })),
          status: "active",
          // type: subscription.type,
        };

        if (subscription.cloud === "Azure") {
          subscriptionData.type = subscription.type;
        } else {
          subscriptionData.type = "";
        }

        return subscriptionData;
      }),
    };

    // console.log(formData);
    updateUserAndSubscription(formData).then((data) =>
      console.log("resp", data)
    );
    // console.log(" edited payload", formData);
  };
  const getFilteredSubscriptions = (cloudType: any) => {
    return selectedRowData.subscriptions.filter(
      (subscription: any) => subscription.cloud === cloudType
    );
  };
  // selectedRowData && console.log("row data", selectedRowData.subscriptions);
  function getContactNames(subsContactADIDs: any, users: any) {
    return subsContactADIDs.map((contactADID: any) => {
      const user = users.find((user: any) => user.adId === contactADID);
      // console.log("emails", subsContactADIDs, users);
      return user ? user.userName : contactADID;
    });
  }
  // console.log("All Topo Data", data);
  return (
    <div className="">
      <div className="text-xl px-4 border-b-2 border-slate-400 pb-2 flex justify-between items-center">
        <span>User Management</span>
      </div>
      <div className="flex justify-between px-4">
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className=" mt-6">
          <button
            onClick={() => setIsOpen(true)}
            className="btn bg-red-700 rounded-sm  px-4 py-1 text-white font-semibold hover:bg-red-800"
          >
            Add New Business
          </button>
        </div>
      </div>
      <div className="items-center pb-4 px-4 ">
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-center text-gray-800">
            <thead className="text-xs text-white uppercase bg-red-800">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Sr.No.
                </th>
                <th scope="col" className="px-auto py-3">
                  Business Name
                </th>
                <th scope="col" className="px-auto py-3">
                  Owner Name
                </th>
                <th scope="col" className="px-auto py-3">
                  Owner Email
                </th>
                <th scope="col" className="px-auto py-3">
                  Contact Name
                </th>
                <th scope="col" className="px-auto py-3">
                  Contact Email
                </th>
                <th scope="col" className="px-2 py-3">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData && currentData.length != 0 ? (
                currentData.map((d: any, i: any) => {
                  if (d.userType === "Owner") {
                    const uniqueContactADIDs = new Set<string>();
                    d.subscriptions &&
                      d.subscriptions.forEach((sub: any) => {
                        sub.subsContactADIDs &&
                          sub.subsContactADIDs.forEach((contact: any) => {
                            uniqueContactADIDs.add(JSON.stringify(contact));
                          });
                      });
                    const index = startIndex + i + 1;
                    // console.log("-----------", uniqueContactADIDs);
                    return (
                      <tr key={i} className="bg-white border-b text-center">
                        <td className="px-auto py-3">{index}</td>
                        <td className="px-auto py-3">{d.businessName}</td>
                        <td className="px-auto py-3">{d.userName}</td>
                        <td className="px-auto py-3">{d.adId}</td>{" "}
                        <td className="px-auto py-3">
                          {Array.from(uniqueContactADIDs).map(
                            (contactString: any, index: any) => {
                              const contact = JSON.parse(contactString);
                              return <div key={index}>{contact.name}</div>;
                            }
                          )}
                        </td>
                        {/* Displaying unique adIDs in separate <td> elements */}
                        <td className="px-auto py-3">
                          {Array.from(uniqueContactADIDs).map(
                            (contactString, index) => {
                              const contact = JSON.parse(contactString);
                              return <div key={index}>{contact.adid}</div>;
                            }
                          )}
                        </td>
                        <td className="px-auto py-3 space-x-4">
                          <button onClick={() => handleViewDetailsClick(d)}>
                            <VisibilityIcon />
                          </button>
                          <button onClick={() => handleEditDetailsClick(d)}>
                            <EditIcon />
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <tr className="bg-white border-b text-center ">
                  <td className="px-auto py-3 " colSpan={7}>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-2 table-pagination w-full flex items-center justify-end gap-2">
            <button
              className="py-1 px-2 rounded border disabled:text-slate-400"
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className="py-1 px-2 rounded border disabled:text-slate-400"
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* --------------------Add user Modal Start----------------------*/}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal content */}
          <div className="w-full max-w-3xl mx-auto my-12 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-800 px-4 py-2 flex items-center justify-between">
                <h3 className="text-xl text-white font-bold">
                  Add New Business
                </h3>
                <button
                  className="p-2 text-2xl text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="p-6">
                {/* Business Name Field */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2">
                    Business Name :
                  </label>
                  <input
                    name="businessName"
                    type="text"
                    placeholder="Type here"
                    value={userData.businessName}
                    className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                    onChange={handleUserDataChange}
                    required
                  />
                </div>

                {/* Owner Name and Email Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Owner Name :
                    </label>
                    <input
                      name="ownerName"
                      type="text"
                      placeholder="Type here"
                      value={userData.ownerName}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                      onChange={handleUserDataChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Owner Email :
                    </label>
                    <input
                      name="ownerEmail"
                      type="email"
                      placeholder="Type here"
                      value={userData.ownerEmail}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                      onChange={handleUserDataChange}
                      required
                    />
                  </div>
                </div>
                {/* Subscription Details */}
                {subscriptionDetail.map(
                  (subscription: any, subscriptionIndex: any) => (
                    <div key={subscriptionIndex}>
                      <label className="block text-lg font-semibold mb-2">
                        Subscription Details :
                      </label>

                      {/* Cloud and Account Name/ID Fields */}
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <select
                          name="cloud"
                          value={subscription.cloud}
                          onChange={(event) =>
                            handleSubscriptionChange(subscriptionIndex, event)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                          required
                        >
                          <option value="" disabled>
                            Select Cloud
                          </option>
                          <option value="Azure">Azure</option>
                          <option value="AWS">AWS</option>
                        </select>
                        <input
                          type="text"
                          name="subsAccName"
                          value={subscription.subsAccName}
                          onChange={(event) =>
                            handleSubscriptionChange(subscriptionIndex, event)
                          }
                          placeholder="Subscription Account Name"
                          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                          required
                        />
                        <input
                          type="text"
                          name="subsAccId"
                          value={subscription.subsAccId}
                          onChange={(event) =>
                            handleSubscriptionChange(subscriptionIndex, event)
                          }
                          placeholder="Subscription Account ID"
                          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                          required
                        />
                        {subscription.cloud &&
                          subscription.cloud == "Azure" && (
                            <input
                              type="text"
                              name="type"
                              value={subscription.type}
                              onChange={(event) =>
                                handleSubscriptionChange(
                                  subscriptionIndex,
                                  event
                                )
                              }
                              placeholder="Subscription Type"
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                              required
                            />
                          )}
                      </div>

                      {/* Contact Details for each Subscription */}
                      {subscription.contactDetails.map(
                        (contact: any, contactIndex: any) => (
                          <div
                            className="grid grid-cols-2 gap-4 mb-2 mt-4"
                            key={contactIndex}
                          >
                            {/* Contact Name */}
                            <input
                              type="text"
                              name="contactName"
                              value={contact.contactName}
                              onChange={(event) =>
                                handleContactChange(
                                  subscriptionIndex,
                                  contactIndex,
                                  event
                                )
                              }
                              placeholder="Contact Name"
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                              required
                            />

                            {/* Contact Email */}
                            <input
                              type="email"
                              name="contactEmail"
                              value={contact.contactEmail}
                              onChange={(event) =>
                                handleContactChange(
                                  subscriptionIndex,
                                  contactIndex,
                                  event
                                )
                              }
                              placeholder="Contact Email"
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                              required
                            />
                          </div>
                        )
                      )}

                      {/* Add and Remove Contact Buttons */}
                      <div className="mb-6 flex items-center justify-end">
                        {subscription.contactDetails.length > 1 && (
                          <button
                            onClick={() =>
                              handleRemoveContact(
                                subscriptionIndex,
                                subscription.contactDetails.length - 1
                              )
                            }
                            className="text-red-500 text-xl px-2  hover:text-red-700 ml-2"
                          >
                            -{/* <RemoveCircleOutlineIcon /> */}
                          </button>
                        )}
                        <button
                          onClick={() => handleAddContact(subscriptionIndex)}
                          className="text-blue-500 py-1 px-2 text-xl hover:text-blue-700"
                        >
                          +{/* <AddCircleOutlineIcon /> */}
                        </button>
                      </div>
                    </div>
                  )
                )}

                {/* Add and Remove Subscription Buttons */}
                <div className="mb-6 flex items-center justify-end">
                  {subscriptionDetail.length > 1 && (
                    <button
                      onClick={() =>
                        handleRemoveSubscription(subscriptionDetail.length - 1)
                      }
                      className="text-white px-2 py-1 bg-red-800 rounded hover:bg-red-900 mr-2"
                    >
                      Remove
                      {/* <RemoveCircleOutlineIcon /> */}
                    </button>
                  )}
                  <button
                    onClick={handleAddSubscription}
                    className="text-white px-2 py-1 bg-blue-700 rounded hover:bg-blue-800"
                  >
                    Add Subscription
                    {/* <AddCircleOutlineIcon /> */}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-gray-200 px-4 py-3 flex justify-end">
                <button
                  onClick={handleUpload}
                  className={`text-white px-6 py-2 rounded ${
                    isFormValid()
                      ? "bg-red-800 hover:bg-red-900"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal content */}
          <div className="w-full max-w-3xl mx-auto my-12 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-800 px-4 py-2 flex items-center justify-between">
                <h3 className="text-xl text-white font-bold">
                  Edit Business Details
                </h3>
                <button
                  className="p-2 text-2xl text-white"
                  onClick={() => setEditModalOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="p-6">
                {/* Business Name Field */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2">
                    Business Name :
                  </label>
                  <input
                    name="businessName"
                    type="text"
                    placeholder="Type here"
                    value={editedUserData.businessName}
                    className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                    onChange={handleEditUserDataChange}
                    required
                  />
                </div>

                {/* Owner Name and Email Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Owner Name :
                    </label>
                    <input
                      name="ownerName"
                      type="text"
                      placeholder="Type here"
                      value={editedUserData.ownerName}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                      onChange={handleEditUserDataChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Owner Email :
                    </label>
                    <input
                      name="ownerEmail"
                      type="email"
                      placeholder="Type here"
                      value={editedUserData.ownerEmail}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                      onChange={handleEditUserDataChange}
                      required
                    />
                  </div>
                </div>
                {/* Subscription Details */}
                {editedSubscriptionDetail &&
                  editedSubscriptionDetail.map(
                    (subscription: any, subscriptionIndex: any) => (
                      <div key={subscriptionIndex}>
                        {/* <span></span> */}
                        <label className="block text-lg font-semibold mb-2">
                          {subscriptionIndex + 1}
                          {")"} Subscription Details :
                        </label>

                        {/* Cloud and Account Name/ID Fields */}
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <select
                            name="cloud"
                            value={subscription.cloud}
                            onChange={(event) =>
                              handleEditSubscriptionChange(
                                subscriptionIndex,
                                event
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                            required
                          >
                            <option value="" disabled>
                              Select Cloud
                            </option>
                            <option value="Azure">Azure</option>
                            <option value="AWS">AWS</option>
                          </select>
                          <input
                            type="text"
                            name="subsAccName"
                            value={subscription.subsAccName}
                            onChange={(event) =>
                              handleEditSubscriptionChange(
                                subscriptionIndex,
                                event
                              )
                            }
                            placeholder="Subscription Account Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                            required
                          />
                          <input
                            type="text"
                            name="subsAccId"
                            value={subscription.subsAccId}
                            onChange={(event) =>
                              handleEditSubscriptionChange(
                                subscriptionIndex,
                                event
                              )
                            }
                            placeholder="Subscription Account ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                            required
                          />
                          {subscription.cloud &&
                            subscription.cloud == "Azure" && (
                              <input
                                type="text"
                                name="type"
                                value={subscription.type}
                                onChange={(event) =>
                                  handleEditSubscriptionChange(
                                    subscriptionIndex,
                                    event
                                  )
                                }
                                placeholder="Subscription Type"
                                className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                                required
                              />
                            )}
                        </div>

                        {/* Contact Details for each Subscription */}
                        {subscription.subsContactADIDs &&
                          subscription.subsContactADIDs &&
                          subscription.subsContactADIDs.map(
                            (contact: any, contactIndex: any) => (
                              <div
                                className="grid grid-cols-2 gap-4 mb-2 mt-4"
                                key={contactIndex}
                              >
                                {/* Contact Details: */}
                                <input
                                  type="text"
                                  name="name"
                                  value={contact.name}
                                  onChange={(event) =>
                                    handleEditContactChange(
                                      subscriptionIndex,
                                      contactIndex,
                                      event
                                    )
                                  }
                                  placeholder="Contact Name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                                  required
                                />

                                {/* Contact Email */}
                                <input
                                  type="email"
                                  name="adid"
                                  value={contact.adid}
                                  onChange={(event) =>
                                    handleEditContactChange(
                                      subscriptionIndex,
                                      contactIndex,
                                      event
                                    )
                                  }
                                  placeholder="Contact Email"
                                  className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                                  required
                                />
                              </div>
                            )
                          )}

                        {/* Add and Remove Contact Buttons */}
                        <div className="mb-6 flex items-center justify-end">
                          {subscription.subsContactADIDs &&
                            subscription.subsContactADIDs &&
                            subscription.subsContactADIDs.length > 1 && (
                              <button
                                onClick={() =>
                                  handleEditRemoveContact(
                                    subscriptionIndex,
                                    subscription.subsContactADIDs.length - 1
                                  )
                                }
                                className="text-red-500 text-xl px-2  hover:text-red-700 ml-2"
                              >
                                -{/* <RemoveCircleOutlineIcon /> */}
                              </button>
                            )}
                          <button
                            onClick={() =>
                              handleEditAddContact(subscriptionIndex)
                            }
                            className="text-blue-500 py-1 px-2 text-xl hover:text-blue-700"
                          >
                            +{/* <AddCircleOutlineIcon /> */}
                          </button>
                        </div>
                      </div>
                    )
                  )}

                {/* Add and Remove Subscription Buttons */}
                <div className="mb-6 flex items-center justify-end">
                  {editedSubscriptionDetail.length > 1 && (
                    <button
                      onClick={() =>
                        handleEditRemoveSubscription(
                          editedSubscriptionDetail.length - 1
                        )
                      }
                      className="text-white px-2 py-1 bg-red-800 rounded hover:bg-red-900 mr-2"
                    >
                      Remove
                      {/* <RemoveCircleOutlineIcon /> */}
                    </button>
                  )}
                  <button
                    onClick={handleEditAddSubscription}
                    className="text-white px-2 py-1 bg-blue-700 rounded hover:bg-blue-800"
                  >
                    Add Subscription
                    {/* <AddCircleOutlineIcon /> */}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-gray-200 px-4 py-3 flex justify-end">
                <button
                  onClick={handleEditUpload}
                  className={`text-white px-6 py-2 rounded ${
                    isEditFormValid()
                      ? "bg-red-800 hover:bg-red-900"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isEditFormValid()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl mx-auto my-12 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-800 px-4 py-2 flex items-center justify-between">
                <h3 className="text-xl text-white font-bold">
                  Subscription Details
                </h3>
                <button
                  className="p-2 text-xl text-white"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="p-6">
                {/* Display Subscription Details */}
                {selectedRowData && (
                  <div>
                    <h2 className="text-xl font-semibold border-b-2 mb-4">
                      {selectedRowData.businessName} Subscriptions
                    </h2>
                    {getFilteredSubscriptions("Azure").length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-2">
                          Azure Subscriptions:
                        </h3>
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="px-4 py-2">Sr.No.</th>
                              <th className="px-4 py-2">Subscription ID</th>
                              <th className="px-4 py-2">Subscription Name</th>
                              <th className="px-4 py-2">Contacts</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredSubscriptions("Azure").map(
                              (subscription: any, index: any) => (
                                <tr key={index}>
                                  <td className="border px-4 py-2 text-center">
                                    {index + 1}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsAccId}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsAccName}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsContactADIDs.map(
                                      (d: any, i: any) => (
                                        <span key={i}>
                                          {d.adid}
                                          <br />
                                        </span>
                                      )
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {getFilteredSubscriptions("AWS").length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          AWS Subscriptions:
                        </h3>
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="px-4 py-2">Sr.No.</th>
                              <th className="px-4 py-2">Subscription ID</th>
                              <th className="px-4 py-2">Subscription Name</th>
                              <th className="px-4 py-2">Contacts</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredSubscriptions("AWS").map(
                              (subscription: any, index: any) => (
                                <tr key={index}>
                                  <td className="border px-4 py-2 text-center">
                                    {index + 1}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsAccId}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsAccName}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsContactADIDs &&
                                      subscription.subsContactADIDs.map(
                                        (d: any, i: any) => (
                                          <span key={i}>
                                            {d.adid}
                                            <br />
                                          </span>
                                        )
                                      )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
