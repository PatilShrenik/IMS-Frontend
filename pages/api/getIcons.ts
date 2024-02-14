import axios from "axios";
import  {baseURL}  from "@/const";
// const baseURL = "http://localhost:8000/";
export async function getIcons() {
  // console.log("-------------",id)
  return await axios.get(baseURL+"network_icons")
}
