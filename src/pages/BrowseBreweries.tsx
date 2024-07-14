import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setRenderComponent } from "../redux/brewerySlice";
import { getBreweries } from "../redux/breweryActions";
import BreweryList from "../components/BreweryList";
import SearchBar from "../components/SearchBar";
import { ITEMS_PER_PAGE } from "../types/constants";
import "./browseBreweries.css";

const BrowseBreweries: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { allBreweries, loading, error } = useSelector(
    (state: RootState) => state.breweries
  );

  const breweriesLengthRef = useRef(allBreweries.length);

  useEffect(() => {
    breweriesLengthRef.current = allBreweries.length;
  }, [allBreweries.length]);

  useEffect(() => {
    dispatch(setRenderComponent("all"));
    // fetch on load if no breweries
    if (breweriesLengthRef.current === 0) {
      dispatch(getBreweries({ page: 1, per_page: ITEMS_PER_PAGE }));
    }
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      {loading && <p>Loading...</p>}
      {error && (
        <p className="fetch-error">
          <span className="error">Error: </span>
          {error.message}
        </p>
      )}
      {allBreweries.length > 0 && <BreweryList showBreweries={allBreweries} />}
    </div>
  );
};

export default BrowseBreweries;
