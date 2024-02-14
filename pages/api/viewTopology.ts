import axios from "axios";
import { baseURL } from "@/const";
// const baseURL = "http://localhost:8000/";

export async function getTopologyData(buId: any, id: any) {
  return await axios.get(baseURL + "topology?bu_id=" + buId + "&id=" + id);
}
