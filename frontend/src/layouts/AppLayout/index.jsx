import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header"
import { DefaultLayout } from "../DefaultLayout"
import { ModalRemove } from "../../components/ModalRemove"
import { ModalNewFile } from "../../components/ModalNewFile"
import { ModalView } from "../../components/ModalView"

export const AppLayout = () => {
  return (
    <DefaultLayout>
      <Header/>
      <Outlet/>
      <ModalRemove/>
      <ModalNewFile/>
      <ModalView/>
    </DefaultLayout>
  )
}