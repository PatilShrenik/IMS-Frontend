import axios from "axios";
import  {baseURL}  from "@/const";
// const baseURL = "http://localhost:8000/";
export async function getAwsVMData() {
  // console.log("-------------",id)
  return await axios.get(baseURL+"awsVMData")
}
