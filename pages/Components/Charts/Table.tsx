import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";

const Table = ({ data }: any) => {
  // console.log("datain tble", data);
  const rowPerPage = 6;
  const totalRows = data?.data?.length;
  const totalPages = Math.ceil(totalRows / rowPerPage);
  const [page, setPage] = useState<any>(1);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [tableView, settableView] = useState<any>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any>(data?.data);

  const currentData = filteredData?.slice(
    rowPerPage * page - rowPerPage,
    rowPerPage * page
  );
// data && console.log("table data length",data)
  useEffect(() => {
    setPage(1);

    // Filter data based on search input
    const filtered = data && data.data && data?.data.filter((rowData: any) => {
      return rowData.some((item: any) =>
        item[1]
          ? item[1].toString().toLowerCase().includes(searchInput.toLowerCase())
          : item[0].toString().toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }, [data?.data, searchInput]);

  return (
    <>
      <div className="items-center pb-4 px-4">
        <label className="text-xs font-semibold">
          {data?.title ? data?.title : ""}
        </label>

        {/* <div className="mt-4 mb-2"> */}
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-2 py-1 rounded-sm ml-2"
        />
        {/* </div> */}

        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-center text-gray-800">
            <thead className="text-xs text-white uppercase bg-red-800">
              <tr>
                {/* <th>SrNo</th> */}
                {data?.headers?.map((header: any, index: any) => (
                  <th className="px-auto py-3" key={index} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData?.map((rowData: any, rowIndex: any) => (
                <tr key={rowIndex}>
                  {/* <td>{rowIndex + 1}</td> */}
                  {rowData.map((item: any, index: any) => (
                    <td className="px-auto py-3" key={index}>
                      {item[0] === "actionButtonViewTable" ? (
                        <button
                          className="btn bg-blue-400 px-2 py-1 rounded-sm text-white font-medium"
                          onClick={() => setIsOpen(true)}
                        >
                          View
                        </button>
                      ) : (
                        item[1]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {currentData?.length === 0 || filteredData === undefined ? (
                <tr>
                  <td colSpan={100} className="py-2">
                    No data
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
          <div className="mt-2 table-pagination w-full flex items-center justify-end gap-2">
            <button
              onClick={() => setPage(page - 1)}
              className="py-1 px-2 rounded border disabled:text-slate-400"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="py-1 px-2 rounded border disabled:text-slate-400"
              disabled={page >= totalPages}
            >
              Next
            </button>
            <div>
              page: {page} / {isNaN(totalPages) ? 1 : totalPages}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
