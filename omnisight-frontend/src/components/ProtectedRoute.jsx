import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  //  No token → go to auth
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  //  Role mismatch
  if (role && role !== userRole) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;