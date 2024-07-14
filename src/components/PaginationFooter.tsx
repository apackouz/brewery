import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { changePage } from "../redux/brewerySlice";
import { ITEMS_PER_PAGE } from "../types/constants";
import "./paginationFooter.css";

const PaginationFooter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { onPageNumber, viewItemsLength } = useSelector(
    (state: RootState) => state.breweries
  );

  const [inputPage, setInputPage] = useState(onPageNumber);

  const totalPages = Math.ceil(viewItemsLength / ITEMS_PER_PAGE);

  const handlePageChange = (direction: "forward" | "backwards") => {
    dispatch(changePage(direction));
  };

  const handleInputPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(Number(e.target.value));
  };

  const handleGoToPage = () => {
    if (inputPage > 0 && inputPage <= totalPages) {
      dispatch(changePage(inputPage));
    }
  };

  return (
    <div className="pagination-footer">
      <div>
        <button
          className="main-btn backwards-btn"
          onClick={() => handlePageChange("backwards")}
          disabled={onPageNumber === 1}
        >
          Previous
        </button>
        <span className="page-of">
          Page {onPageNumber} of {totalPages}
        </span>
        <button
          className="main-btn forward-btn"
          onClick={() => handlePageChange("forward")}
          disabled={onPageNumber >= totalPages}
        >
          Next
        </button>
      </div>
      <div>
        <input
          className="page-input"
          type="number"
          value={inputPage}
          onChange={handleInputPageChange}
          min={1}
          max={totalPages}
        />
        <button
          className="main-btn go-to-page"
          onClick={handleGoToPage}
          disabled={
            inputPage === onPageNumber ||
            inputPage < 1 ||
            inputPage > totalPages
          }
        >
          Go to Page
        </button>
      </div>
    </div>
  );
};

export default PaginationFooter;
