import { Navigate, Outlet } from "react-router-dom";
import { getStoredUser } from "../firebase/authService";
import backendAuthService from "../services/backendAuth";

const ProtectedRoute = ({ allowedRole }) => {
  const user = getStoredUser();
  const backendToken = backendAuthService.getToken();

  // Check Firebase user
  if (!user || !user.uid) {
    return <Navigate to="/" replace />;
  }

  // Check backend JWT token
  if (!backendToken) {
    return <Navigate to="/" replace />;
  }

  // Check role match
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
