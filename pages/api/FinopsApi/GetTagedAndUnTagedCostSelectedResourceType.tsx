import axios from "axios";
import { finopsServerBaseUrl } from "@/const";
export async function GetTagedAndUnTagedCostSelectedResourceType(cloud:any,resource:any) {
    let adid = sessionStorage.getItem("userEmail");
    // let role = sessionStorage.getItem("userRole");
    try {
        return await axios.get(finopsServerBaseUrl + `/getTagedAndUnTagedCostSelectedResourceType?cloud=${cloud}&adid=${adid}&resource=${resource}`)
    } catch (error) {
        console.error("Error in getting Finops Report data", error)
        return {status:"400"}
    }
}
