import { Outlet } from "react-router-dom";
import { NavBarView } from "./view/NavBarView";

export const NavBar = () => {
  return (
    <>
      <NavBarView/>
      <Outlet />
    </>
  )
}
