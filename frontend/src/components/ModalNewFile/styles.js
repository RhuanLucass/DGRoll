import styled from "styled-components";

export const ContainerTitle = styled.div`
  text-align: center;
  padding: 0 1.5rem;
  margin-top: 1rem;

  > h3 {
    color: ${({ theme }) => theme.colors["black_normal"]};
  }

  > p {
    padding: 1rem;
    color: ${({ theme }) => theme.colors["gray_normal"]};
  }
`;

export const ContainerForm = styled.form`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

export const ContainerInputs = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ContainerInputTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const ContainerFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  width: 100%;

  > p {
    color: ${({ theme }) => theme.colors["black_normal"]};

    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ContainerButtons = styled.div`
  align-self: flex-end;
  padding: 0 0.5rem;
`;

export const ButtonCancel = styled.button`
  background-color: ${({ theme }) => theme.colors["white_normal"]};
  border: 1px solid ${({ theme }) => theme.colors["secondary_normal"]};
  color: ${({ theme }) => theme.colors["black_normal"]};

  &:hover {
    background-color: ${({ theme }) => theme.colors["white_dark"]};
  }
`;

export const ContainerInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors["primary_normal"]};
  width: 100%;
  margin-top: 0;
`;

export const ContainerLabel = styled.label`
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  outline: none;
  border-radius: 4px;

  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors["white_normal"]};
  border: 1px solid ${({ theme }) => theme.colors["secondary_normal"]};
  color: ${({ theme }) => theme.colors["primary_normal"]};
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors["white_dark"]};
  }
`;

export const ContainerInputFile = styled.input`
  display: none;
`;
