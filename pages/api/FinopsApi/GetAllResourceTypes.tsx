import axios from "axios";
import { finopsServerBaseUrl } from "@/const";
export async function GetAllResourceTypes(cloud:any) {
    let adid = sessionStorage.getItem("userEmail");
    // let role = sessionStorage.getItem("userRole");
    try {
        return await axios.get(finopsServerBaseUrl + `/getAllResourceTypes?cloud=${cloud}&adid=${adid}`)
    } catch (error) {
        console.error("Error in getting Finops Report data", error)
        return {status:"400"}
    }
}