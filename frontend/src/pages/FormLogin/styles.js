import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerForm = styled.div`
  width: 100%;
  padding: 0 3rem;
`;

export const ContainerText = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

export const ContainerRegister = styled(Link)`
  color: ${({theme}) =>  theme.colors['primary_light']};
  text-decoration: underline;
`;