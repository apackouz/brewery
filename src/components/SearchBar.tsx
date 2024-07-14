import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getBreweries } from "../redux/breweryActions";
import { BrewerySearchParams } from "../types/types";
import { ITEMS_PER_PAGE } from "../types/constants";
import "./searchBar.css";

const SearchBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchBreweries = (searchTerm: string, removeText = false) => {
    const searchParams: BrewerySearchParams = {
      page: 1,
      per_page: ITEMS_PER_PAGE,
    };
    const search = searchTerm.trim();
    if (!removeText && search.length > 0) {
      searchParams.by_name = search;
    }
    dispatch(getBreweries(searchParams));
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    fetchBreweries(searchTerm);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    fetchBreweries("", true);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSearch}>
      <fieldset>
        <input
          id="search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder=""
        />
        {/* cool label css trick here */}
        <label htmlFor="search">Search by name</label>
      </fieldset>
      <button className="main-btn" type="submit">
        Search
      </button>
      <button className="main-btn" type="button" onClick={handleClearFilter}>
        Clear Filter
      </button>
    </form>
  );
};

export default SearchBar;
