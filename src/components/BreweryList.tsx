import React, { useState } from "react";
import { Brewery } from "../types/types";
import BreweryCard from "./BreweryCard";
import BreweryModal from "./BreweryModal";
import "./breweryList.css";
import { addFavorite, removeFavorite } from "../redux/brewerySlice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

interface BreweryListProps {
  showBreweries: Brewery[];
  enableRanking?: boolean;
}

const BreweryList: React.FC<BreweryListProps> = ({
  showBreweries,
  enableRanking,
}) => {
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const { favorites } = useSelector((state: RootState) => state.breweries);

  const toggleFavorite = (brewery: Brewery) => {
    if (favorites[brewery.id]) {
      dispatch(removeFavorite(brewery));
    } else {
      dispatch(addFavorite(brewery));
    }
  };
  const removeSelectedBrewery = () => {
    setSelectedBrewery(null);
  };

  const onRankChange = (breweryId: string, rank: string) => {
    const brewery: Brewery = { ...favorites[breweryId] };
    if (!brewery) return;
    brewery.rank = rank;
    dispatch(addFavorite(brewery));
  };

  return (
    <div className="brewery-grid">
      {showBreweries.map((brewery) => (
        <BreweryCard
          key={brewery.id}
          brewery={brewery}
          onFavoriteToggle={() => toggleFavorite(brewery)}
          isFavorite={favorites[brewery.id] !== undefined}
          onClick={() => setSelectedBrewery(brewery)}
          onRankChange={onRankChange}
          enableRanking={enableRanking}
        />
      ))}
      {selectedBrewery && (
        <BreweryModal
          brewery={selectedBrewery}
          onFavoriteToggle={() => toggleFavorite(selectedBrewery)}
          isFavorite={favorites[selectedBrewery.id] !== undefined}
          onRankChange={onRankChange}
          enableRanking={favorites[selectedBrewery.id] !== undefined}
          removeSelectedBrewery={removeSelectedBrewery}
        />
      )}
    </div>
  );
};

export default BreweryList;
