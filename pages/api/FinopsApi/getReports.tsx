import axios from "axios";
import { finopsServerBaseUrl } from "@/const";
export async function getReportsDashboard() {
    let adid = sessionStorage.getItem("userEmail");
    let role = sessionStorage.getItem("userRole");
    try {
        return await axios.get(finopsServerBaseUrl + `/AWSAndAzureDashBordChartsAPI?adid=${adid}&role=${role}`)
    } catch (error) {
        console.error("Error in getting Finops Report data", error)
        return {status:"400"}
    }
}