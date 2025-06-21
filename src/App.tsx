import { useSelector } from "react-redux";
import "./App.css";
import { LoginPage } from "./pages/login-page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { RootState } from "./store/slices";
import MainLayout from "./components/mainlayout";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isLogin);
  console.log(isAuth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!isAuth ?  <LoginPage /> : <Navigate to="/" /> }
        />
        {/* <Route path="/" element={isAuth ? <Dashboard/> : <Navigate to="/login"/>}/> */}
        <Route path="/*" element={isAuth ? <MainLayout/> : <Navigate to="/login"/>}/>
        {/* {isAuth && (
          <Route path="/dashboard" element={<Dashboard/>}/>
        )} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
