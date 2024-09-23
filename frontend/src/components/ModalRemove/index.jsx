import { ButtonCancel, ContainerButtons, ContainerTitle } from "./styles";
import { useContext } from "react";
import { AppContext, modalTypes } from "../../contexts/AppContext";
import { ModalGeneric } from "../ModalGeneric";
import { AuthContext } from "../../contexts/AuthContext";
import { Message } from "../Message";

export const ModalRemove = () => {
  const { handleRemoveFile, handleCloseModal, isOpenModal } =
    useContext(AppContext);
    const { message } = useContext(AuthContext);

  const isRemove = isOpenModal.type === modalTypes.REMOVE;
  return (
    <ModalGeneric isOpen={isRemove}>
      <Message error={message?.error} content={message?.content} />
      <ContainerTitle>
        <h3>Confirmar Remoção</h3>
        <p>
          Tem certeza que deseja remover este item? Essa ação não pode ser
          desfeita.
        </p>
      </ContainerTitle>

      <ContainerButtons>
        <button onClick={handleRemoveFile}>Confirmar</button>
        <ButtonCancel onClick={handleCloseModal}>Cancelar</ButtonCancel>
      </ContainerButtons>
    </ModalGeneric>
  );
};
