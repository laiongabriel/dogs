import { UserContextData } from "../../Types/globalTypes";
import React from "react";
import { userContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
   const { login }: UserContextData = React.useContext(userContext);

   return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
