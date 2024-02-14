import axios from "axios";
import { finopsServerBaseUrl } from "@/const";
export async function GetTagedAndUnTagedCostSelectedTagName(cloud:any,business:any) {
    let adid = sessionStorage.getItem("userEmail");
    // let role = sessionStorage.getItem("userRole");

    try {
        return await axios.get(finopsServerBaseUrl + `/getTagedAndUnTagedCostSelectedTagName?cloud=${cloud}&adid=${adid}&tag=${business}`)
    } catch (error) {
        console.error("Error in getting Finops Report data", error)
        return {status:"400"}
    }
}
