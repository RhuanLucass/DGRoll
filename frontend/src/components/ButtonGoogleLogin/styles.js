import styled from "styled-components";

export const ContainerButtonGoogle = styled.button`
  margin: 2rem 0 1rem;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors["white_normal"]};
  color: ${({ theme }) => theme.colors["black_normal"]};

  > svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors["white_dark"]};
  }
`;
