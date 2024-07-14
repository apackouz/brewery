import React from "react";
import "./breweryCard.css";
import BeerMugSvg from "./icons/BeerMugSvg";
import { BreweryCardProps } from "../types/types";
import BreweryImage from "./icons/BreweryImage";

const BreweryCard: React.FC<BreweryCardProps> = ({
  brewery,
  isFavorite,
  onFavoriteToggle,
  onClick,
  enableRanking,
  onRankChange,
  children,
  className,
}) => {
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle();
  };

  const firstLetterUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const classes = `${className}  brewery-card`;
  const arrowClass = `arrow ${isFavorite ? "isFavorite" : ""}`;
  return (
    <div className={classes} onClick={onClick}>
      <div className="card-info">
        <BeerMugSvg
          favorite={isFavorite}
          onClick={(e: React.MouseEvent) => toggleFavorite(e)}
        />
        <div className={arrowClass}>←</div>
        <h3 className="brewery-name">{brewery.name}</h3>
        {children}
        {enableRanking && (
          <div className="rank" onClick={(e) => e.stopPropagation()}>
            <label>
              Rank the brewery{" "}
              <select
                value={brewery.rank ?? 1}
                onSelect={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  onRankChange && onRankChange(brewery.id, e.target.value);
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
          </div>
        )}
        <p>
          <span className={`brewery-type ${brewery.brewery_type}`}>
            {firstLetterUpperCase(brewery.brewery_type)} brewery
          </span>
        </p>
      </div>
      <BreweryImage imageType={brewery.brewery_type} />
    </div>
  );
};

export default BreweryCard;
