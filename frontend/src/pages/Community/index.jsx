import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CardsWrapper } from "../../components/CardsWrapper";

export const Community = () => {
  const { listAllSheets, getUserRating } = useContext(AuthContext);
  
  return (
    <CardsWrapper
      fetchSheetsFn={listAllSheets}
      fetchRatingsFn={getUserRating}
      title="Comunidade"
      showButtons={false}
    />
  );
};
