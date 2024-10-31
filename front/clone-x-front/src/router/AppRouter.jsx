import { Routes, Route, useLocation } from "react-router-dom";
import { HomePageP } from "../pages/homePages/homePageP";
import { NavBar } from "../pages/UI/NavBar";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { Profile } from "../pages/profile/Profile";
import { ProtectRoutes } from "./ProtectRoutes";

export const AppRouter = () => {

  const location = useLocation();

  const hideNavBarRoutes = ["/register", "/login"];

  return (
    <>
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePageP />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login/>}/>

        <Route element={<ProtectRoutes/>}>
          <Route path="/profile/:usertag" element={<Profile/>}/>
        </Route>

        <Route path="*" element={<HomePageP />} />
      </Routes>
    </>
  );
};