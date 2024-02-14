import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";

const NTable = (cloudGatewayData: any) => {
//   console.log("-----------------", cloudGatewayData.data);
    // const cloudGatewayData = {
    //   title: "Cloud Gateway",
    //   headers: [
    //     "S No",
    //     "Business User",
    //     "Number of Services",
    //     "Total gateway charges",
    //   ],
    //   data: [
    //     [
    //       ["S no", "1"],
    //       ["Business User", "Birla Carbon"],
    //       ["Number of Services", 2],
    //       ["Total gateway charges", 5000],
    //       [
    //         "NestedTableData",
    //         {
    //           title: "Gateway Charges",
    //           headers: [
    //             "Service Name",
    //             "Unit Price",
    //             "Type of Service",
    //             "Total Cost",
    //           ],
    //           data: [
    //             [
    //               ["Service Name", "Cat1"],
    //               ["Unit Price", "1"],
    //               ["Type of Service", "internal"],
    //               ["Total Cost", "2500"],
    //             ],
    //             [
    //               ["Service Name", "Cat2"],
    //               ["Unit Price", "1"],
    //               ["Type of Service", "internal"],
    //               ["Total Cost", "2500"],
    //             ],
    //           ],
    //         },
    //       ],
    //     ],
    //     [
    //       ["S no", "2"],
    //       ["Business User", "Birla Carbon"],
    //       ["Number of Services", 2],
    //       ["Total gateway charges", 5000],
    //       [
    //         "NestedTableData",
    //         {
    //           title: "Gateway Charges",
    //           headers: [
    //             "Service Name",
    //             "Unit Price",
    //             "Type of Service",
    //             "Total Cost",
    //           ],
    //           data: [
    //             [
    //               ["Service Name", "Cat1"],
    //               ["Unit Price", "1"],
    //               ["Type of Service", "internal"],
    //               ["Total Cost", "2500"],
    //             ],
    //             [
    //               ["Service Name", "Cat2"],
    //               ["Unit Price", "1"],
    //               ["Type of Service", "internal"],
    //               ["Total Cost", "2500"],
    //             ],
    //           ],
    //         },
    //       ],
    //     ],
    //     [
    //       ["S no", "3"],
    //       ["Business User", "UTCL"],
    //       ["Number of Services", 1],
    //       ["Total gateway charges", 2500],
    //       [
    //         "NestedTableData",
    //         {
    //           title: "Gateway Charges",
    //           headers: [
    //             "Service Name",
    //             "Unit Price",
    //             "Type of Service",
    //             "Total Cost",
    //           ],
    //           data: [
    //             [
    //               ["Service Name", "Cat1"],
    //               ["Unit Price", "1"],
    //               ["Type of Service", "internal"],
    //               ["Total Cost", "2500"],
    //             ],
    //           ],
    //         },
    //         ,
    //       ],
    //     ],
    //   ],
    // };
  //   const serviceTypeCostData = {
  //     title: "Service Type Cost",
  //     headers: ["category", "aligned services", "unit measure", "status"],
  //     data: [
  //       [
  //         ["category ", "PaaS"],
  //         ["aligned services", 117580],
  //         ["unit measure", 1],
  //         ["status", "Enabled"],
  //       ],
  //       [
  //         ["category ", "VM"],
  //         ["aligned services", 4694],
  //         ["unit measure", 1],
  //         ["status", "Enabled"],
  //       ],
  //       [
  //         ["category ", "Disk"],
  //         ["aligned services", 574],
  //         ["unit measure", 0],
  //         ["status", "Enabled"],
  //       ],
  //       [
  //         ["category ", "Others"],
  //         ["aligned services", 7917],
  //         ["unit measure", 0],
  //         ["status", "Enabled"],
  //       ],
  //     ],
  //   };
  //   const zoneMappingData = {
  //     title: "Zone Mapping",
  //     headers: ["Zones", "Cost", "Type", "Status"],
  //     data: [
  //       [
  //         ["Zones ", "Cloud G/W Service DC"],
  //         ["Cost", 2500],
  //         ["Type", "Internal"],
  //         ["Status", "Enabled"],
  //       ],
  //       [
  //         ["Zones ", "Cloud G/W Service DB"],
  //         ["Cost", 2500],
  //         ["Type", "Internal"],
  //         ["Status", "Enabled"],
  //       ],
  //       [
  //         ["Zones ", "Cloud G/W Service App"],
  //         ["Cost", 2500],
  //         ["Type", "Internal"],
  //         ["Status", "Enabled"],
  //       ],
  //       [
  //         ["Zones ", "Cloud G/W Service User"],
  //         ["Cost", 2500],
  //         ["Type", "Internal"],
  //         ["Status", "Enabled"],
  //       ],
  //       [
  //         ["Zones ", "Cloud G/W Service DMZ"],
  //         ["Cost", 6000],
  //         ["Type", "External"],
  //         ["Status", "Enabled"],
  //       ],
  //     ],
  //   };

  const rowPerPage = 7;
  const totalRows =cloudGatewayData && cloudGatewayData.data && cloudGatewayData.data.data && cloudGatewayData?.data?.data?.length;
  const totalPages = Math.ceil(totalRows / rowPerPage);
  const [page, setPage] = useState<any>(1);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [tableView, settableView] = useState<any>(true);
  const [searchInput, setSearchInput] = useState<any>("");
  //   const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any>(
    cloudGatewayData?.data?.data
  );
  const [gatewayChargesNestedRowOpen, setGatewayChargesNestedRowOpen] =
    useState<any>(-1);
  const currentData =
    filteredData &&
    filteredData?.slice(rowPerPage * page - rowPerPage, rowPerPage * page);
  //   useEffect(() => {
  //     setGatewayChargesNestedRowOpen(-1);
  //   }, []);
  //   useEffect(() => {
  //     setPage(1);
  //     // Filter data based on search input
  //     const filtered = cloudGatewayData?.data.filter((rowData: any) => {
  //       return rowData.some((item: any) =>
  //         item[1]
  //           ? item[1].toString().toLowerCase().includes(searchInput.toLowerCase())
  //           : item[0].toString().toLowerCase().includes(searchInput.toLowerCase())
  //       );
  //     });

  //     setFilteredData(filtered);
  //   }, [cloudGatewayData.data, searchInput]);
  useEffect(() => {
    setPage(1);
    // Filter data based on search input
    const filtered =cloudGatewayData && cloudGatewayData.data && cloudGatewayData.data.data && cloudGatewayData?.data?.data.filter((rowData: any) => {
      return rowData.some((item: any) =>
        item[1]
          ? item[1].toString().toLowerCase().includes(searchInput.toLowerCase())
          : item[0].toString().toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }, [searchInput]);
  const handleSearchInputchange = (e: any) => {
    // console.log("-1-1-1")
    setSearchInput(e.target.value);
  };
  return (
    <>
      {cloudGatewayData && (
        <div className="card !h-fit !w-full">
          <label className="text-sm font-semibold">
            {cloudGatewayData.data  && cloudGatewayData.data.title ? cloudGatewayData?.data?.title : ""}
          </label>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputchange}
            className="border px-2 py-1 rounded-sm ml-2"
          />
          <div className="relative overflow-x-auto mt-6">
            <table className="w-full text-sm text-center text-gray-800">
              <thead className="text-[9px] text-white uppercase bg-red-800">
                {/* <th>SrNo</th> */}
                {cloudGatewayData && cloudGatewayData.data && cloudGatewayData.data.headers && cloudGatewayData?.data?.headers?.map(
                  (header: any, index: any) => (
                    <th className="px-auto py-2" key={index} scope="col">
                      {header}
                    </th>
                  )
                )}
              </thead>
              <tbody>
                {currentData && currentData?.map((rowData: any, rowIndex: any) => (
                  <>
                    {/* Existing row mapping logic */}
                    <tr
                      key={rowIndex}
                      className={
                        gatewayChargesNestedRowOpen == rowIndex
                          ? "bg-slate-100 "
                          : ""
                      }
                      onClick={() =>
                        setGatewayChargesNestedRowOpen(
                          gatewayChargesNestedRowOpen == rowIndex
                            ? "-1"
                            : rowIndex
                        )
                      }
                    >
                      {/* <td>{rowIndex + 1}</td> */}
                      {rowData && rowData.map((item: any, index: any) =>
                        item[0] !== "NestedTableData" ? (
                          <td className="px-auto py-2" key={index}>
                            {item[1]}
                          </td>
                        ) : (
                          ""
                        )
                      )}
                    </tr>

                    {/* Nested table logic */}
                    <tr key={rowIndex + 1000}>
                      {rowData && rowData.map((item: any, trindex: any) =>
                        item[0] === "NestedTableData" ? (
                          <td
                            key={trindex + 1000}
                            colSpan={100}
                            className={
                              gatewayChargesNestedRowOpen !== rowIndex
                                ? "hidden"
                                : ""
                            }
                          >
                            <table className="w-full">
                              <thead className="bg-slate-300">
                                <tr>
                                  {item[1]?.headers?.map(
                                    (data: any, thindex: any) => (
                                      <th key={thindex}>{data}</th>
                                    )
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {item[1]?.data?.map(
                                  (data: any, thindex: any) => (
                                    <tr key={thindex}>
                                      {data?.map((row: any, index: any) => (
                                        <td key={index}>{row[1]}</td>
                                      ))}
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </td>
                        ) : (
                          ""
                        )
                      )}
                    </tr>
                  </>
                ))}
                {currentData && currentData?.length === 0 || filteredData == undefined ? (
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
      )}
    </>
  );
};

export default NTable;
