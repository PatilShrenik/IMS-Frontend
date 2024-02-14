import axios from "axios";
import { baseURL } from "@/const";
// const baseURL = "http://localhost:8000/";
export async function updateCloud(id: any, data: any) {
  await axios.put(baseURL + "topology/" + id, data);
}

export async function getOldDataOfTOPO(id: any) {
  return await axios.get(baseURL + "topology?id=" + id);
}
