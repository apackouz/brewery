import { Middleware } from "@reduxjs/toolkit";
import { changePage } from "./brewerySlice";
import { getBreweries } from "./breweryActions";
import { AppDispatch, RootState } from "./store";
import { BrewerySearchParams } from "../types/types";

const paginationMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  let previousPageNumber = 1;

  if (changePage.match(action)) {
    // save previous value
    const stateBefore = storeAPI.getState() as RootState;
    previousPageNumber = stateBefore.breweries.onPageNumber;
  }

  const result = next(action);

  if (changePage.match(action)) {
    // state after reducer
    const stateAfter = storeAPI.getState() as RootState;
    const currentView = stateAfter.breweries.currentView;
    if (currentView === "all") {
      const newPageNumber = stateAfter.breweries.onPageNumber;
      if (newPageNumber !== previousPageNumber) {
        const searchParams: BrewerySearchParams = {
          ...stateAfter.breweries.searchParams,
          page: newPageNumber,
        };
        (storeAPI.dispatch as AppDispatch)(getBreweries(searchParams));
      }
    }
  }
  return result;
};

export default paginationMiddleware;
