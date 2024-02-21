import React, { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const CustomPagination = ({
  totalCount,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}: any) => {
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleRowsPerPageChange = (event: any) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange(newRowsPerPage);
  };

  return (
    <div className="flex justify-around bg-white dark:bg-dark-container dark:text-textColor text-[12px] pr-4">
      <span className="flex items-center mx-2 p-2">
        <p className="text-[12px] mx-2">Items per page :</p>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="bg-light-container dark:bg-dark-container rounded-none"
        >
          <option className = "rounded-none"  value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          {/* Add more options as needed */}
        </select>
      </span>
      <div className="flex items-center text-[13px]">
        <span className="mx-2">
          {currentPage} - {totalPages} of {totalPages}
        </span>

        <button
          className="mx-[4px] cursor-pointer"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon fontSize="small" />
        </button>

        <button
          className="mx-[4px] cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
