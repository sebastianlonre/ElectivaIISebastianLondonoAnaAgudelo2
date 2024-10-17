import { Routes, Route, useLocation } from "react-router-dom";
import { HomePageP } from "../pages/homePages/homePageP";
import { NavBar } from "../pages/UI/NavBar";
import { Register } from "../pages/register/Register";

export const AppRouter = () => {

  const location = useLocation();

  const hideNavBarRoutes = ["/register"];

  return (
    <>
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePageP />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<HomePageP />} />
      </Routes>
    </>
  );
};