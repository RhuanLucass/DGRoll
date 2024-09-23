import styled from "styled-components";
import Background from "../../assets/background.png";

export const ContainerDefault = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 43.75rem;
  position: relative;
  z-index: 0;
  overflow-y: auto;

  background-image: url(${Background});
  background-repeat: none;
  background-position: center;
  background-size: cover;
`;
