import styled from "styled-components";

export const ContainerHeader = styled.div`
  width: 100%;
  height: 5rem;
  padding: .5rem 1.5rem;
  background: ${({theme}) => theme.colors['primary_normal']};

  display: flex;
  align-items: center; 
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const ContainerImage = styled.div`
  height: 100%;

  > img {
    height: 100%;
  }
`;

export const ContainerNav = styled.nav`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerPages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 2rem;
  
  a{
    transition: .2s ease-in-out;

    &:hover{
      color: ${({theme}) => theme.colors['primary_light']};
    }

    &.active{
      color: ${({theme}) => theme.colors['primary_light']};
      text-decoration: underline;
    }
  }
`;

export const ContainerOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

export const ContainerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;

  svg{
    color: ${({theme}) => theme.colors['red_normal']};
    transform: rotate(180deg);
    stroke-width: 4px;
  }
`;