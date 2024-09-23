import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CardsWrapper } from "../../components/CardsWrapper";

export const MyScripts = () => {
  const { listMySheets } = useContext(AuthContext);

  return (
    <CardsWrapper
      fetchSheetsFn={listMySheets}
      fetchRatingsFn={null}
      title="Minhas Fichas"
      showButtons={true}
    />
  );
};
