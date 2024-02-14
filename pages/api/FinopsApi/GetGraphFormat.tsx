import axios from "axios";
import  {baseURL}  from "@/const";

export async function getCurrentUserData() {
    let email = sessionStorage.getItem("userEmail");
    return await axios.get(baseURL + `users?email=${email}`)
}

export async function unpinGraphAPI(id:any, data:any) {
    return await axios.put(baseURL + `users/${id}`,data)
}