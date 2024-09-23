import styled from "styled-components";

export const ContainerTitle = styled.div`
  text-align: center;
  padding: 0 1.5rem;

  > h3 {
    color: ${({ theme }) => theme.colors["black_normal"]};
  }

  > p {
    padding: 1rem;
    color: ${({ theme }) => theme.colors["gray_normal"]};
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const ButtonCancel = styled.button`
  background-color: ${({ theme }) => theme.colors["white_normal"]};
  border: 1px solid ${({ theme }) => theme.colors["secondary_normal"]};
  color: ${({ theme }) => theme.colors["black_normal"]};

  &:hover {
    background-color: ${({ theme }) => theme.colors["white_dark"]};
  }
`;
