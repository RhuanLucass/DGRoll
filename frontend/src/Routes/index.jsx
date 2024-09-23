import { useContext } from "react";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { AuthContext } from "../contexts/AuthContext";

export const Routes = () => {
  const {user} = useContext(AuthContext);


  return  user?.id ? <AppRoutes /> : <AuthRoutes />;
}