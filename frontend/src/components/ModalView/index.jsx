import { useContext } from "react";
import { AppContext, modalTypes } from "../../contexts/AppContext";
import { ModalGeneric } from "../ModalGeneric";
import { ContainerIframe } from "./styles";

export const ModalView = () => {
  const { isOpenModal } = useContext(AppContext);

  const isViewFile = isOpenModal.type === modalTypes.VIEWFILE;
  return (
    <ModalGeneric isOpen={isViewFile}>
      <ContainerIframe src={isOpenModal.url_file} />

    </ModalGeneric>
  );
};
