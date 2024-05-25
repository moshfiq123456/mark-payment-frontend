import React, { useState } from 'react'
import ReactPaginate from "react-paginate";
import "./pagination.scss"
const Pagination = ({ itemsPerPage, total, action }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pageCount = Math.ceil(total / itemsPerPage);
  
    // Handle previous page click
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        action(currentPage - 2); // Pass the zero-based index of the previous page
      }
    };
  
    // Handle next page click
    const handleNextPage = () => {
      if (currentPage < pageCount) {
        setCurrentPage(currentPage + 1);
        action(currentPage); // Pass the zero-based index of the next page
      }
    };
    
  return (
    <div className="flex justify-between flex-wrap items-center w-full">
      <div className=" text-blue-300">
      Page {currentPage} of {pageCount===0 ? 1:pageCount}. Total - {total}
      </div>
 
      <div>
        <button className='font-extrabold ps-3 pe-2 border-2 border-e-[1px] border-gray-400 rounded-s-lg hover:bg-gray-300' onClick={handlePreviousPage}>{"<"}</button>
        <button className='font-extrabold pe-3 ps-2 border-2 border-s-[1px] border-gray-400 rounded-e-lg hover:bg-gray-300' onClick={handleNextPage}>{">"}</button>
      </div>
    </div>
  )
}

export default Pagination