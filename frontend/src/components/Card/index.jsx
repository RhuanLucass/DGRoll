import {
  ContainerButtonEdit,
  ContainerButtonRemove,
  ContainerButtons,
  ContainerCard,
  ContainerDescription,
  ContainerImage,
  ContainerRating,
  ContainerStar,
} from "./styles";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthContext } from "../../contexts/AuthContext";

export const Card = ({ sheet, rating, showButtons, pdfThumbnail }) => {
  const { handleOpenModalRemove, handleOpenModalViewFile } = useContext(AppContext);
  const { setCurrentRating, user } = useContext(AuthContext);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (newRating) => {
    await setCurrentRating(user?.id, sheet?.id_ficha, newRating);
    setHoverRating(newRating);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <ContainerStar
        key={star}
        onClick={() => handleRating(star)}
        onMouseEnter={() => rating === 0 && setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        $isActive={star <= (hoverRating || rating)}
        $rating={rating === 0}
      />
    ));
  };

  return (
    <ContainerCard>
      <ContainerImage onClick={() => handleOpenModalViewFile(sheet)}>
        <img src={pdfThumbnail} alt="Capa da ficha" />
        <ContainerDescription>
          <h3>{sheet?.titulo_ficha}</h3>
          <p>{sheet?.nome_completo}</p>
        </ContainerDescription>
      </ContainerImage>

      {showButtons ? (
        <ContainerButtons>
          <ContainerButtonEdit>Editar</ContainerButtonEdit>
          <ContainerButtonRemove onClick={() => handleOpenModalRemove(sheet?.id_ficha)}>
            Excluir
          </ContainerButtonRemove>
        </ContainerButtons>
      ) : (
        <ContainerRating>{renderStars()}</ContainerRating>
      )}
    </ContainerCard>
  );
};
