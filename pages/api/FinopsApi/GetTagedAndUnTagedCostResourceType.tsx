import axios from "axios";
import { finopsServerBaseUrl } from "@/const";
export async function GetTagedAndUnTagedCostResourceType() {
    let adid = sessionStorage.getItem("userEmail");
    // let role = sessionStorage.getItem("userRole");
    try {
        return await axios.get(finopsServerBaseUrl + `/getTagedAndUnTagedCostResourceType?adid=${adid}`)
    } catch (error) {
        console.error("Error in getting Finops Report data", error)
        return {status:"400"}
    }
}