import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainComponent from "./components/MainComponent";
import BrowseBreweries from "./pages/BrowseBreweries";
import FavoriteBreweries from "./pages/FavoriteBreweries";
import { BREWERY_PATH, FAVORITES_PATH } from "./types/constants";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />}>
          <Route index element={<Navigate to={BREWERY_PATH} replace />} />
          <Route path={BREWERY_PATH} element={<BrowseBreweries />} />
          <Route path={FAVORITES_PATH} element={<FavoriteBreweries />} />
          <Route path="*" element={<Navigate to={BREWERY_PATH} replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
