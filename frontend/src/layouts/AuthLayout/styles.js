import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const ContainerLayout = styled.div`
  width: 70%;
  height: 100%;

  > h1{
    margin: 3rem 0 0;
  }
`;

export const ContainerDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 2rem 0 3rem;

  > p{
    font-size: 1.3rem;
    padding: 0 4rem;
    margin-bottom: .25rem;
  }
`;