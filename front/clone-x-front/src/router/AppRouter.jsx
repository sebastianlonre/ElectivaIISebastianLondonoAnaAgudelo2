import { Routes, Route } from "react-router-dom";
import { HomePageP } from "../pages/homePages/homePageP";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageP />}>
          <Route index element={<HomePageP />} />
        </Route>
      </Routes>
    </>
  );
};
