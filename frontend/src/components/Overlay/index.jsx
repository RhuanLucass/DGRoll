import { useContext } from "react";
import { ContainerOverlay } from "./styles";
import { AppContext } from "../../contexts/AppContext";

export function Overlay({ isOpen }){
  const { handleCloseModal } = useContext(AppContext);

  return(
    <ContainerOverlay onClick={handleCloseModal} className={isOpen ? 'overlay-active' : ''} />
  )
}