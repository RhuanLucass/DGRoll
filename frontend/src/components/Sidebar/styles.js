import styled from "styled-components";

export const ContainerSidebar = styled.div`
  width: 30%;
  height: 100%;
  background: ${({theme}) =>  theme.colors['gradient']};
  border-radius: 10px 0 0 10px;   

  position: fixed;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;

export const ContainerImage = styled.div`
  > img {
    width: 100%;
    height: 100%;
    max-height: 11.25rem;
    max-width: 11.25rem;
  }
`;