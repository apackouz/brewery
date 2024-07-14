import React from "react";
import { Link } from "react-router-dom";
import { BREWERY_PATH, FAVORITES_PATH } from "../types/constants";
import "./navigation.css";

const Navigation: React.FC = () => {
  return (
    <nav className="nav-component">
      <ul>
        <li>
          <Link className="main-btn nav-btn" to={BREWERY_PATH}>
            Browse Breweries
          </Link>
        </li>
        <li>
          <Link className="main-btn nav-btn" to={FAVORITES_PATH}>
            Favorite Breweries
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
