import axios from "axios";
import  {baseURL}  from "@/const";
// const baseURL = "http://localhost:8000/";
export async function getAllTopo() {
  // console.log("-------------",id)
  return await axios.get(baseURL + "topology_table_data")
}
