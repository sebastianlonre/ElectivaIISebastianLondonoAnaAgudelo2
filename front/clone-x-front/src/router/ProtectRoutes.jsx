import { useContext } from "react"
import { AuthContext } from "../context/auth/AuthContext"
import { Outlet, Navigate } from "react-router-dom";


export const ProtectRoutes = () => {
  const {user} = useContext(AuthContext);
  return user ? <Outlet/> : <Navigate to ="/login"/>
}
