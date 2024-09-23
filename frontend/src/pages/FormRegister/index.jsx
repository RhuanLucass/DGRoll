import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  ContainerForm,
  ContainerRegister,
  ContainerText,
} from "./styles";
import { ButtonGoogleLogin } from "../../components/ButtonGoogleLogin";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Message } from "../../components/Message";
import { AuthContext } from "../../contexts/AuthContext";

export const FormRegister = () => {
  const clientID =
    "763920847480-jarid2bg93telt05gd1djt8jatc5susl.apps.googleusercontent.com";
  const { message, registerUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    nome_usuario: "",
    nome_completo: "",
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const success = await registerUser(userData);

    if(success){
      setTimeout(() => navigate("/"), 1500);
    }
  };

  return (
    <>
      <Message error={message.error} content={message.content} />

      <ContainerForm>
        <h2>CADASTRAR</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome_completo"
            id="name"
            placeholder="Nome Completo"
            onChange={handleInput}
            required
          />
          <input
            type="text"
            name="nome_usuario"
            id="user"
            placeholder="Nome de usuario"
            onChange={handleInput}
            required
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={handleInput}
            required
          />
          <input
            type="password"
            name="senha"
            id="password"
            placeholder="Senha"
            onChange={handleInput}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>

        <GoogleOAuthProvider clientId={clientID}>
          <ButtonGoogleLogin />
        </GoogleOAuthProvider>

        <ContainerText>
          <p>Já possui uma conta?</p>
          <ContainerRegister to="/entrar">Entre aqui</ContainerRegister>
        </ContainerText>
      </ContainerForm>
    </>
  );
};
