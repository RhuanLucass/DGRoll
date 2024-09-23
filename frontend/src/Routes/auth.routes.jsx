import { Navigate, Route, Routes } from "react-router-dom";
import { FormLogin } from "../pages/FormLogin";
import { FormRegister } from "../pages/FormRegister";
import { AuthLayout } from "../layouts/AuthLayout";
import { AuthProvider } from "../contexts/AuthContext";

export const AuthRoutes = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<FormLogin />} />
            <Route path="/entrar" element={<FormLogin />} />
            <Route path="/cadastrar" element={<FormRegister />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
};
