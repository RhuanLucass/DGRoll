import { FiStar } from "react-icons/fi";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const ContainerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;

  width: 100%;
  min-width: 6rem;
  max-width: 18rem;
  margin: .5rem 0;
  aspect-ratio: 1 / 1.4;
  border-radius: 4px;

  @media screen and (max-width: 1366px) {
    max-width: 14rem;
  }
`;

export const ContainerImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors["primary_light"]};
  border-radius: 4px;
  cursor: pointer;

  > img {
    border-radius: 4px;
    height: 100%;
    width: 100%;
  }
`;

export const ContainerDescription = styled.div`
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.7567401960784313) 37%,
    rgba(0, 0, 0, 0.40940126050420167) 75%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 7rem;
  border-radius: 0 0 4px 4px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;

  padding: 0.5rem 1rem 1rem;

  h3, p{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  > p {
    color: ${({ theme }) => theme.colors["gray_light"]};
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

export const ContainerButtonEdit = styled.button``;

export const ContainerButtonRemove = styled.button`
  background-color: ${({ theme }) => theme.colors["red_normal"]};

  &:hover{
  background-color: ${({ theme }) => theme.colors["red_light"]};
  }
`;

export const ContainerRating = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* gap: .5rem; */
  padding: 1rem 0;
`;

export const ContainerStar = styled(FiStar)`
  cursor:  ${({$rating}) => $rating ? 'pointer' : 'default'};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors['yellow_normal'] : theme.colors['white_normal'])};
  fill: ${({ theme, $isActive }) => ($isActive ? theme.colors['yellow_normal'] : 'transparent')};
  transition: all .3s;
  font-size: 2.3rem;
  padding: 0 .5rem;
  pointer-events:  ${({$rating}) => $rating ? 'visible' : 'none'};

  &:hover {
    color: ${({ theme, $rating }) => $rating && theme.colors['yellow_normal']};
    fill: ${({ theme, $rating }) => $rating && theme.colors['yellow_normal']};
  }
`;