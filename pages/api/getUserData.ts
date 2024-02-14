import axios from "axios";
import { baseURL } from "@/const";
// const baseURL = "http://localhost:8000/";
export async function getUserData(id: any) {
  return await axios.get(baseURL + "users?id=" + id);
}
