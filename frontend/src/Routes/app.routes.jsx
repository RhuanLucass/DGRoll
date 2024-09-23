import { Navigate, Route, Routes } from "react-router-dom";
import { Community } from "../pages/Community";
import { AppLayout } from "../layouts/AppLayout";
import { MyScripts } from "../pages/MyScripts";
import { AppProvider } from "../contexts/AppContext";

export const AppRoutes = () => {
  return (
    <AppProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/comunidade" />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="/comunidade" element={<Community />} />
            <Route path="/minhas-fichas" element={<MyScripts />} />
            <Route path="*" element={<Navigate to="/comunidade" />} />
          </Route>
        </Routes>
    </AppProvider>
  );
};
