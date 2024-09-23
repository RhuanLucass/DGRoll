import styled from "styled-components";

export const ContainerCommunity = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1rem;

  position: relative;
  z-index: 1;
  
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem;
  `;

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  width: 100%;

  @media screen and (max-width: 1366px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;