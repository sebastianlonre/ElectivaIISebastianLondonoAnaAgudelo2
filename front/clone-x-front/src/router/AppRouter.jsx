import { Routes, Route } from "react-router-dom";
import { HomePageP } from "../pages/homePages/homePageP";
import { NavBar } from "../pages/UI/NavBar";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePageP />} />

          <Route path="*" element={<HomePageP />} />
        </Route>
      </Routes>
    </>
  );
};
