import React, { useState } from "react";
import { BreweryModalProps } from "../types/types";
import BreweryCard from "./BreweryCard";
import Modal from "../components/Modal";
import "./breweryModal.css";

const BreweryModal: React.FC<BreweryModalProps> = ({
  brewery,
  removeSelectedBrewery,
  isFavorite,
  onFavoriteToggle,
  enableRanking,
  onRankChange,
}) => {
  const onClose = () => {
    removeSelectedBrewery();
  };

  const [copyEnableRanking, setEnableRanking] = useState(enableRanking);
  const [copyBrewery, setCopyBrewery] = useState({ ...brewery });
  const [modalIsFavorite, setModalIsFavorite] = useState(isFavorite);

  // change localy, happy path
  const handleOnFavoriteToggle = () => {
    if (parseInt(copyBrewery.rank ?? "0", 10) > 1 && modalIsFavorite) {
      setCopyBrewery((previousBrewery) => {
        previousBrewery.rank = "1";
        return previousBrewery;
      });
    }
    setModalIsFavorite(!modalIsFavorite);
    setEnableRanking(!modalIsFavorite);

    onFavoriteToggle();
  };

  const handleOnRangeChange = (id: string, rank: string) => {
    if (onRankChange) {
      setCopyBrewery((previousBrewery) => {
        previousBrewery.rank = rank;
        return previousBrewery;
      });
      onRankChange(id, rank);
    }
  };

  return (
    <Modal onClose={onClose} closeOnOutsideClick={true}>
      <BreweryCard
        className="card-modal"
        brewery={copyBrewery}
        onFavoriteToggle={handleOnFavoriteToggle}
        isFavorite={modalIsFavorite}
        onClick={() => {}}
        onRankChange={handleOnRangeChange}
        enableRanking={copyEnableRanking}
      >
        <p>{copyBrewery.country}</p>
        <p>
          {copyBrewery.city}, {copyBrewery.state_province}{" "}
          {copyBrewery.postal_code}
        </p>
      </BreweryCard>
    </Modal>
  );
};

export default BreweryModal;
