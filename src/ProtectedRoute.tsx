import { Outlet, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const ProtectedRoute = () => {
  const { accounts } = useMsal();
  const user = accounts.length > 0 ? accounts[0] : null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
