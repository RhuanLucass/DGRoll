import { FiX } from "react-icons/fi";
import { ContainerButton, ContainerModal } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Overlay } from "../Overlay"

export const ModalGeneric = ({ children, isOpen }) => {
  const { handleCloseModal, isOpenModal } = useContext(AppContext);

  return (
    <>
      <Overlay isOpen={isOpen} />
      <ContainerModal $modalType={isOpenModal.type} className={isOpen ? "active-modal" : ""}>
        <ContainerButton>
          <FiX onClick={handleCloseModal} />
        </ContainerButton>
        {children}
      </ContainerModal>
    </>
  );
};
