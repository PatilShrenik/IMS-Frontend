import axios from "axios";
import  {baseURL}  from "@/const";
// const baseURL = "http://localhost:8000/";

export async function fetchestimation(id: any) {
  return await axios.get(baseURL + "topology_table_data?topology_id=" + id);
}
