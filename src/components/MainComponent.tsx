import React from "react";
import { Outlet } from "react-router-dom";
import PaginationFooter from "./PaginationFooter";
import Navigation from "./Navigation";
import "./mainComponent.css";

const MainComponent: React.FC = () => {
  return (
    <div className="mainLayout">
      <Navigation />
      <div className="outletContainer">
        <Outlet />
      </div>
      <div className="paginationFooter">
        <PaginationFooter />
      </div>
    </div>
  );
};

export default MainComponent;
