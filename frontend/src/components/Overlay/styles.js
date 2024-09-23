import styled from "styled-components";

export const ContainerOverlay = styled.div`
  opacity: 0;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  transition: .1  s;

  &.overlay-active{
    opacity: 1;
    pointer-events: auto;
  }
`;