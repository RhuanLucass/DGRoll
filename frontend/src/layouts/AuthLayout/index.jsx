import { useContext } from "react";
import { CardsWrapper } from "../../components/CardsWrapper";
import { Sidebar } from "../../components/Sidebar";
import { DefaultLayout } from "../DefaultLayout";
import { Container, ContainerDescription, ContainerLayout } from "./styles";
import { AuthContext } from "../../contexts/AuthContext";

export const AuthLayout = () => {
  const { listTopSheets } = useContext(AuthContext);

  return (
    <DefaultLayout>
      <Container>
        <ContainerLayout>
          <h1>Bem-vindo ao DGRoll!</h1>

          <ContainerDescription>
            <p>DGRoll é um gerenciador de fichas!</p>
            <p>
              Explore mundos mágicos, lute contra criaturas lendárias, e
              torne-se o herói de sua própria jornada épica!
            </p>
            <p>
              Você mestre terá em um só lugar as fichas de seus jogadores e NPCs
              disponíveis a qualquer momento.
            </p>
            <p>
              E vocês jogadores não precisarão se preocupar em guardá-las em
              seus computadores!
            </p>
          </ContainerDescription>
          <CardsWrapper
            fetchSheetsFn={listTopSheets}
            title="Preferidas da comunidade"
            showButtons={false}
          />
        </ContainerLayout>
        <Sidebar />
      </Container>
    </DefaultLayout>
  );
};
