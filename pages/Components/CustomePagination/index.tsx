import React, { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
const CustomPagination = ({
  totalCount,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}: any) => {
  const [age, setAge] = React.useState("10");

  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalCount);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handlePageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleRowsPerPageChange = (event: any) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange(newRowsPerPage);
  };

  const goToFirstPage = () => {
    handlePageChange(1);
  };

  const goToLastPage = () => {
    handlePageChange(totalPages);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              i === currentPage
                ? "text-black dark:text-textColor  bg-textColor dark:bg-[#3C3C3C] w-[20px] rounded mr-2"
                : " mr-2"
            }
          >
            {i}
          </button>
        );
      }
    } else {
      // Show ellipsis if not on the first few pages
      if (currentPage > maxVisiblePages - 2) {
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }

      // Calculate the range of page numbers to display
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`m-2 ${i === currentPage ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }

      // Show ellipsis if not on the last few pages
      if (endPage < totalPages) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="w-full  flex justify-between items-center bg-white dark:bg-dark-container dark:text-textColor text-[12px] px-2">
      <div className="flex">
        <div className="flex items-center text-[13px]">
          <button onClick={goToFirstPage} disabled={currentPage === 1}>
            <FirstPageIcon fontSize="small" />
          </button>
          <button
            className="mx-[4px] cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon fontSize="small" />
          </button>

          <span className="mx-2">
            {/* {startIndex}-{endIndex} of {totalCount} */}
            {renderPageNumbers()}
          </span>
          <button
            className="mx-[4px] cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRightIcon fontSize="small" />
          </button>
          <button onClick={goToLastPage} disabled={currentPage === totalPages}>
            <LastPageIcon fontSize="small" />
          </button>
        </div>
        <span className="flex items-center mx-2 p-2">
          <p className="text-[12px] mx-2">Items per page :</p>
          <select
            style={{ borderRadius: 0 }}
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="bg-white dark:bg-dark-container rounded-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          {/* <Select
            className="border-0"
            style={{ border: 0 }}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            // label="Age"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select> */}
        </span>
      </div>
      {/* <div className="ml-8">
        <span className="mx-2">{renderPageNumbers()}</span>
      </div> */}
    </div>
  );
};

export default CustomPagination;
