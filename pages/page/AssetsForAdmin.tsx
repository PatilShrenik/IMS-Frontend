import React, { useEffect, useState } from "react";
import { tableData } from "../api/tableData";
import Link from "next/link";
import { getAllTopo } from "../api/getAllTopo";

const AssetsForAdmin = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    dataFetch();
  }, []);
  async function dataFetch() {
    const res: any = await getAllTopo();
    setData(res.data.sort());
  }
  // console.log("All Topo Data", data);
  return (
    <div className="">
      <div className="text-xl px-4 border-b-2 border-slate-400 pb-2 flex justify-between items-center">
        <span>Service Request</span>
      </div>

      <div className="items-center pb-4 px-4 ">
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-center text-gray-800 ">
            <thead className="text-xs text-white uppercase bg-red-800 ">
              <tr>
                <th scope="col" className="px-auto py-3">
                  Sr.No.
                </th>
                <th scope="col" className="px-auto py-3">
                  Business User
                </th>
                <th scope="col" className="px-auto py-3">
                  Topology Name
                </th>
                <th scope="col" className="px-auto py-3">
                  Status
                </th>
                <th scope="col" className="px-auto py-3">
                  Cloud
                </th>
                <th scope="col" className="px-auto py-3">
                  Date of Creation
                </th>
                <th scope="col" className="px-auto py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length != 0 ? (
                data.map((d: any, i: any) => {
                  return (
                    <tr key={i} className="bg-white border-b text-center">
                      <td className="px-auto py-3">{i + 1}</td>
                      <td className="px-auto py-3">{d.bu}</td>
                      <td className="px-auto py-3">{d.title}</td>
                      <td className="px-auto py-3">{d.status}</td>
                      {d.cloud_server && d.cloud_server.length > 1 ? (
                        <td className="px-auto py-3">
                          {d.cloud_server[0]} {d.cloud_server[1]}
                        </td>
                      ) : (
                        <td className="px-auto py-3">{d.cloud_server}</td>
                      )}
                      <td className="px-auto py-3">{d.created_date}</td>
                      <td className="px-auto py-3 space-x-2">
                        <Link
                          href={
                            "../page/ViewTopology/ViewTopology?id=" +
                            d.topology_id
                          }
                        >
                          <button className="btn bg-blue-400 px-2 py-1 rounded-sm text-white font-medium">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="bg-white border-b text-center ">
                  <td className="px-auto py-3 " colSpan={6}>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetsForAdmin;
