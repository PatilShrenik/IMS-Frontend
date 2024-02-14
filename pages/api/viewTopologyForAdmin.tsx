import axios from "axios";
import { baseURL } from "@/const";
// const baseURL = "http://localhost:8000/";

export async function viewTopologyForAdmin(id: any) {
  return await axios.get(baseURL + "topology?id=" + id);
}
