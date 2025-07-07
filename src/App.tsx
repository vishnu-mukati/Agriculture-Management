import { useSelector } from "react-redux";
import "./App.css";
import { LoginPage } from "./pages/login-page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { RootState } from "./store/slices";
import { MainLayout } from "./components/mainlayout";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Fields } from "./pages/fields-page/fields";
import { FieldForm } from "./pages/fields-page/fieldForm";
import { FieldStates } from "./components/fieldStats";
import ForgotPassword from "./pages/forgot-password/forgotPassword";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isLogin);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!isAuth ? <LoginPage /> : <Navigate to="/" />}
        />
        {isAuth && (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/fields" element={<Fields />} />
           <Route path="fieldForm/:id" element={<FieldForm />} />
           <Route path="statics" element={<FieldStates/>}/>
          </Route>
        )}
        {!isAuth && <Route path="*" element={<Navigate to="/login" />} />}
        {!isAuth && <Route path="forgotPassword" element={<ForgotPassword/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
