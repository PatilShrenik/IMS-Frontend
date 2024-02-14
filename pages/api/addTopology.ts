import axios from "axios";
import  {baseURL}  from "@/const";
// const baseURL = "http://localhost:8000/";

export async function addTopologyData(data: any) {
    await axios.post(baseURL + "topology", data);
    return getLastTopologyData();
}

export async function getLastTopologyData() {
    return await axios.get(baseURL + "topology?_sort=id&_order=desc", {
        params: {
            _page: 1,
            _limit: 1
        }
    })
}

export async function addTableData(data: any) {
    return await axios.post(baseURL + "topology_table_data", data)
}

export async function addResourseData(data: any) {
    return await axios.post(baseURL + "resourse_data", data)
}