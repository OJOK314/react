import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({Children})=>{
 const isAuthenticate = localStorage.getitem("isauthenticate") ==="true";

  return isAuthenticate ? Children : <Navigate to="/" />
}
export default PrivateRoute;