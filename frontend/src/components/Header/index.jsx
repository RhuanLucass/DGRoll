import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { ContainerButton, ContainerHeader, ContainerImage, ContainerNav, ContainerOptions, ContainerPages } from "./styles";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const {
    handleOpenModalNewFile,
  } = useContext(AppContext);
  const {
    logoutUser
  } = useContext(AuthContext);

  const location = useLocation();
  const activeVarLink = (route) => {
    return location.pathname.includes(route) ? 'active' : '';
  }
  
  return (
    <ContainerHeader>
      <ContainerImage>
        <img src={Logo} alt="" />
      </ContainerImage>

      <ContainerNav>
        <ContainerPages>
          <Link to="/comunidade" className={activeVarLink('/comunidade')}>Comunidade</Link>
          <Link to="/minhas-fichas" className={activeVarLink('/minhas-fichas')}>Minhas fichas</Link>
        </ContainerPages>
        
        <ContainerOptions>
          <button onClick={handleOpenModalNewFile}>Adicionar ficha</button>
          <ContainerButton onClick={logoutUser}><FiLogOut/>Sair</ContainerButton>
        </ContainerOptions>
      </ContainerNav>
    </ContainerHeader>
  );
};
