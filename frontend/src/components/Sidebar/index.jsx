import { Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";
import {
  ContainerImage,
  ContainerSidebar,
} from "./styles";

export const Sidebar = () => {
  return (
    <ContainerSidebar>
      <ContainerImage>
        <img src={Logo} alt=""/>
      </ContainerImage>
      <Outlet/>
    </ContainerSidebar>
  );
};
