import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: "Calistoga", serif;
    font-weight: 400;
    font-style: normal;
  }

  body, html{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  h1, h2, h3{
    color: ${({ theme }) => theme.colors["white_normal"]};
    text-align: center;
  }

  h1{
    font-size: 3.5rem;
  }

  h2{
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3{
    font-size: 1.5rem;
  }

  input{
    width: 100%;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors["black_normal"]};
    padding: .5rem 1rem;
    margin: .5rem 0;
    outline: none;
    border-radius: 4px;
    border: 0;

    &::placeholder{
      color: ${({ theme }) => theme.colors["gray_normal"]};
    }
  }

  button{
    padding: .5rem 1rem;
    margin: .5rem 0;
    outline: none;
    border-radius: 4px;
    border: 0;

    background: ${({ theme }) => theme.colors["secondary_normal"]};
    color: ${({ theme }) => theme.colors["white_normal"]};
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
    transition: .2s ease-in-out;

    &:hover{
      background: ${({ theme }) => theme.colors["secondary_light"]};
    }
  }

  button[type="submit"]{
    width: 100%;
    background: ${({ theme }) => theme.colors["primary_dark"]};
    font-size: 1.5rem;
    cursor: pointer;

    &:hover{
      background: ${({ theme }) => theme.colors["primary_dark"]};
    }
  }

  p, a{
    font-size: 1rem;
    color: ${({ theme }) => theme.colors["white_normal"]};
  }

  a{
    text-decoration: none;
  }

  label{
    font-size: .9rem;
    color: ${({ theme }) => theme.colors["black_normal"]};
  }

`;
