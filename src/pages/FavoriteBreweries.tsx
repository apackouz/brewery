import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setRenderComponent, clearFavorites } from "../redux/brewerySlice";
import usePagination from "../hooks/usePagination";
import BreweryList from "../components/BreweryList";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "./favoriteBreweries.css";
import { BREWERY_PATH } from "../types/constants";

const FavoriteBreweries: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { favorites, onPageNumber } = useSelector(
    (state: RootState) => state.breweries
  );

  useEffect(() => {
    dispatch(setRenderComponent("fav"));
  }, [dispatch]);

  const favoriteArray = useMemo(() => {
    return Object.values(favorites);
  }, [favorites]);

  const displayedFavorites = usePagination(favoriteArray, onPageNumber);

  const [showModal, setShowModal] = useState(false);
  const favoritesLength = useMemo(
    () => Object.keys(favorites).length,
    [favorites]
  );

  const handleRemoveAll = () => {
    setShowModal(true);
  };

  const handleConfirmRemoveAll = () => {
    dispatch(clearFavorites());
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="main-btn"
        onClick={handleRemoveAll}
        disabled={favoritesLength === 0}
      >
        Remove All
      </button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="confirm-remove-all">
            <h2>Confirm Removal</h2>
            <p>Are you sure you want to remove all favorites?</p>
            <button
              className="main-btn btn-remove"
              onClick={handleConfirmRemoveAll}
            >
              Confirm
            </button>
            <button className="main-btn btn-cancel" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <h1>Favorite Breweries</h1>
      {displayedFavorites.length > 0 ? (
        <BreweryList showBreweries={displayedFavorites} enableRanking={true} />
      ) : (
        <div className="no-favorites">
          No favorites to display.{" "}
          <Link className="no-favorites-link" to={BREWERY_PATH}>
            Click here to view breweries.
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoriteBreweries;
