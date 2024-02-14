import axios from "axios";
import { finopsServerBaseUrl } from "@/const";

export async function getCurrencyData() {
    try {
        return await axios.get(finopsServerBaseUrl + "/get_values")
    } catch (error) {
        console.error("Error in getting Currency data", error)
        return {}
    }
}

export async function updateCurrencyData(data:any) {
    return await axios.post(finopsServerBaseUrl + "/update_config",data)
}
