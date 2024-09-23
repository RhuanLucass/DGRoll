
import styled from "styled-components";


export const ContainerMessage = styled.div`
  width: 80%;
  background-color: ${({theme, $error}) => $error ? theme.colors["red_light"] : theme.colors["green_light"]};
  padding: .5rem;
  border-radius: 4px;
  margin-top: 1rem;
  position: absolute;
  top: 0;
  right: -10%;
  transform: translate(50%);
  transition: .2s;
  opacity: 0;
  pointer-events: none;

  &.message-active{
    opacity: 1;
    pointer-events: visible;
    right: 50%;
  }

  > p{
    color: ${({theme}) => theme.colors["black_normal"]};
    text-align: center;
    font-size: 1.2rem;
  }
`;