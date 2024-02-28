import React, { useEffect, useState } from "react";
import { tableData } from "../api/tableData";
import Link from "next/link";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Assets = () => {
  let role;
  let bu_id: string | null;
  const [data, setData] = useState<any>(null);
  // if (typeof window !== "undefined") {
  useEffect(() => {
    role = sessionStorage.getItem("userRole");
    bu_id = sessionStorage.getItem("bu_id");
    dataFetch();
  }, []);
  // }
  async function dataFetch() {
    const res: any = await tableData(bu_id);
    setData(res.data);
  }
  // console.log("--------------", data);
  const noDelete = () => {
    toast.error("This action is not Permitted!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="text-xl px-4 border-b-2 border-slate-400 pb-2 flex justify-between items-center">
        <span>Assets</span>
      </div>
      <div className="flex justify-between px-4">
        <div></div>
        <Link href={"../page/AddTopology/addTopology"}>
          <button className="btn bg-red-700 rounded-sm  px-4 py-1 mt-6 text-white font-semibold hover:bg-red-800">
            Add New
          </button>
        </Link>
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
                        <button
                          className="btn bg-red-400 px-2 py-1 rounded-sm text-white font-medium"
                          onClick={noDelete}
                        >
                          Delete
                        </button>
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

export default Assets;
