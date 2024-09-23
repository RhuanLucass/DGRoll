import styled from "styled-components";
import { modalTypes } from "../../contexts/AppContext";

const modal = ($modalType) => {
  switch ($modalType) {
    case modalTypes.REMOVE:
      return {
        width: "30rem",
        height: "15rem",
      };
    case modalTypes.NEWFILE:
      return {
        width: "40rem",
        height: "21rem",
      };
    case modalTypes.VIEWFILE:
      return {
        width: "80vw",
        height: "90vh",
      };
  }
};

export const ContainerModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  max-width: ${({ $modalType }) => modal($modalType)?.width};
  height: 100%;
  max-height: ${({ $modalType }) => modal($modalType)?.height};
  border-radius: 4px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors["white_normal"]};
  opacity: 0;
  pointer-events: none;
  /* transition: .1s; */
  padding: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  &.active-modal {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem;
  align-self: flex-end;

  > svg {
    cursor: pointer;
    stroke: ${({ theme }) => theme.colors["red_normal"]};
    width: 1.8rem;
    height: 1.8rem;
  }
`;
