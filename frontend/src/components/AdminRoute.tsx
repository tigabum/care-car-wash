import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Add this to your types file or declare it here
type AdminUser = {
  uid: string;
  email: string;
  isAdmin: boolean;
};

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // You'll need to implement this check based on your user data structure
  const isAdmin = currentUser?.email?.endsWith("@wowcarwash.com");

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
