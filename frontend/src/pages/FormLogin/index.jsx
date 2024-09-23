import { ContainerForm, ContainerRegister, ContainerText } from "./styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ButtonGoogleLogin } from "../../components/ButtonGoogleLogin/index.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Message } from "../../components/Message/index.jsx";
import { AuthContext } from "../../contexts/AuthContext";

export const FormLogin = () => {
  const {message, loginUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const clientID =
    "763920847480-jarid2bg93telt05gd1djt8jatc5susl.apps.googleusercontent.com";

  const [userData, setUserData] = useState({
    email: "",
    senha: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const success = await loginUser(userData);

    if(success){
      navigate('/comunidade');
    }
  };

  return (
    <>
      <Message error={message?.error} content={message?.content} />
      <ContainerForm>
        <h2>ENTRAR</h2>

        <form onSubmit={handleSubmit}>
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
          <button type="submit">Entrar</button>
        </form>

        <GoogleOAuthProvider clientId={clientID}>
          <ButtonGoogleLogin />
        </GoogleOAuthProvider>

        <ContainerText>
          <p>Ainda não possui uma conta?</p>
          <ContainerRegister to="/cadastrar">
            Cadastre-se aqui
          </ContainerRegister>
        </ContainerText>
      </ContainerForm>
    </>
  );
};
